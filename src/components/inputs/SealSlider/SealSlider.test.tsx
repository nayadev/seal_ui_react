import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealSlider } from './SealSlider'

describe('SealSlider', () => {
  describe('rendering', () => {
    it('renders without error', () => {
      renderWithTheme(<SealSlider aria-label="Volume" />)
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('renders with defaultValue reflected in aria-valuenow', () => {
      renderWithTheme(<SealSlider defaultValue={40} aria-label="Brightness" />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40')
    })

    it('renders controlled value reflected in aria-valuenow', () => {
      renderWithTheme(<SealSlider value={75} aria-label="Gain" />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75')
    })

    it('reflects custom min and max in aria attributes', () => {
      renderWithTheme(<SealSlider defaultValue={5} min={0} max={10} aria-label="Rating" />)
      const thumb = screen.getByRole('slider')
      expect(thumb).toHaveAttribute('aria-valuemin', '0')
      expect(thumb).toHaveAttribute('aria-valuemax', '10')
    })
  })

  describe('accessibility', () => {
    it('applies aria-label to the thumb', () => {
      renderWithTheme(<SealSlider aria-label="Speed" />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Speed')
    })

    it('applies aria-valuetext to the thumb', () => {
      renderWithTheme(<SealSlider defaultValue={50} aria-label="Volume" aria-valuetext="50%" />)
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '50%')
    })
  })

  describe('disabled state', () => {
    it('renders in disabled state', () => {
      renderWithTheme(<SealSlider disabled aria-label="Volume" />)
      // Radix Slider marks disabled via data-disabled on the thumb element
      expect(screen.getByRole('slider')).toHaveAttribute('data-disabled')
    })

    it('does not call onValueChange when disabled', () => {
      const handleChange = vi.fn()
      renderWithTheme(
        <SealSlider defaultValue={50} disabled onValueChange={handleChange} aria-label="Volume" />,
      )
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' })
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('interaction', () => {
    it('calls onValueChange when arrow key is pressed', () => {
      const handleChange = vi.fn()
      renderWithTheme(
        <SealSlider
          defaultValue={50}
          min={0}
          max={100}
          step={1}
          onValueChange={handleChange}
          aria-label="Volume"
        />,
      )
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' })
      expect(handleChange).toHaveBeenCalledWith(51)
    })

    it('calls onValueChange with decremented value on ArrowLeft', () => {
      const handleChange = vi.fn()
      renderWithTheme(
        <SealSlider
          defaultValue={50}
          min={0}
          max={100}
          step={1}
          onValueChange={handleChange}
          aria-label="Volume"
        />,
      )
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' })
      expect(handleChange).toHaveBeenCalledWith(49)
    })

    it('calls onValueCommit when value is committed via keyboard', () => {
      const handleCommit = vi.fn()
      renderWithTheme(
        <SealSlider
          defaultValue={50}
          min={0}
          max={100}
          step={1}
          onValueCommit={handleCommit}
          aria-label="Volume"
        />,
      )
      const thumb = screen.getByRole('slider')
      fireEvent.keyDown(thumb, { key: 'ArrowRight' })
      fireEvent.keyUp(thumb, { key: 'ArrowRight' })
      expect(handleCommit).toHaveBeenCalledWith(51)
    })

    it('does not throw when no callbacks are provided', () => {
      renderWithTheme(<SealSlider defaultValue={50} aria-label="Volume" />)
      expect(() =>
        fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' }),
      ).not.toThrow()
    })

    it('clamps to max on End key', () => {
      const handleChange = vi.fn()
      renderWithTheme(
        <SealSlider
          defaultValue={50}
          min={0}
          max={100}
          onValueChange={handleChange}
          aria-label="Volume"
        />,
      )
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'End' })
      expect(handleChange).toHaveBeenCalledWith(100)
    })

    it('clamps to min on Home key', () => {
      const handleChange = vi.fn()
      renderWithTheme(
        <SealSlider
          defaultValue={50}
          min={0}
          max={100}
          onValueChange={handleChange}
          aria-label="Volume"
        />,
      )
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'Home' })
      expect(handleChange).toHaveBeenCalledWith(0)
    })
  })
})
