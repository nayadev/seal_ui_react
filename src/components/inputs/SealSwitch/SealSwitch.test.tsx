import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealSwitch } from './SealSwitch'

describe('SealSwitch', () => {
  describe('rendering', () => {
    it('renders without error', () => {
      renderWithTheme(<SealSwitch />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('renders with label', () => {
      renderWithTheme(<SealSwitch label="Enable notifications" />)
      expect(screen.getByText('Enable notifications')).toBeInTheDocument()
    })

    it('renders with label and sublabel', () => {
      renderWithTheme(
        <SealSwitch label="Dark mode" sublabel="Switch between dark and light themes" />,
      )
      expect(screen.getByText('Dark mode')).toBeInTheDocument()
      expect(screen.getByText('Switch between dark and light themes')).toBeInTheDocument()
    })

    it('does not render label elements when omitted', () => {
      renderWithTheme(<SealSwitch />)
      expect(screen.queryByRole('group')).not.toBeInTheDocument()
    })

    it('renders in checked state', () => {
      renderWithTheme(<SealSwitch checked />)
      expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
    })

    it('renders in unchecked state', () => {
      renderWithTheme(<SealSwitch checked={false} />)
      expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked')
    })
  })

  describe('interaction', () => {
    it('calls onCheckedChange when clicked', () => {
      const handleChange = vi.fn()
      renderWithTheme(<SealSwitch checked={false} onCheckedChange={handleChange} />)
      fireEvent.click(screen.getByRole('switch'))
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('does not throw when no onCheckedChange handler is provided', () => {
      renderWithTheme(<SealSwitch />)
      expect(() => fireEvent.click(screen.getByRole('switch'))).not.toThrow()
    })

    it('toggles from checked to unchecked', () => {
      const handleChange = vi.fn()
      renderWithTheme(<SealSwitch checked onCheckedChange={handleChange} />)
      fireEvent.click(screen.getByRole('switch'))
      expect(handleChange).toHaveBeenCalledWith(false)
    })
  })

  describe('disabled state', () => {
    it('renders in disabled state', () => {
      renderWithTheme(<SealSwitch disabled />)
      expect(screen.getByRole('switch')).toBeDisabled()
    })

    it('does not call onCheckedChange when disabled', () => {
      const handleChange = vi.fn()
      renderWithTheme(<SealSwitch disabled checked={false} onCheckedChange={handleChange} />)
      fireEvent.click(screen.getByRole('switch'))
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('associates label with switch via htmlFor', () => {
      renderWithTheme(<SealSwitch label="Toggle feature" />)
      const label = screen.getByText('Toggle feature')
      const switchEl = screen.getByRole('switch')
      expect(label).toHaveAttribute('for', switchEl.id)
    })

    it('uses provided id on the switch', () => {
      renderWithTheme(<SealSwitch id="my-switch" label="Option" />)
      expect(screen.getByRole('switch')).toHaveAttribute('id', 'my-switch')
    })

    it('forwards ref to the underlying switch element', () => {
      const ref = { current: null as HTMLButtonElement | null }
      renderWithTheme(<SealSwitch ref={ref} />)
      expect(ref.current).not.toBeNull()
    })
  })

  describe('CSS tokens', () => {
    it('applies checked track token class', () => {
      renderWithTheme(<SealSwitch />)
      const switchEl = screen.getByRole('switch')
      expect(switchEl.className).toMatch(/seal-brand-primary/)
    })

    it('accepts additional className', () => {
      renderWithTheme(<SealSwitch className="extra-class" />)
      expect(screen.getByRole('switch')).toHaveClass('extra-class')
    })
  })
})
