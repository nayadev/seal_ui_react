import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealRadioGroup } from './SealRadioGroup'

const items = [
  { value: 'light', label: 'Light mode' },
  { value: 'dark', label: 'Dark mode', sublabel: 'Easier on the eyes at night' },
  { value: 'system', label: 'System default' },
]

describe('SealRadioGroup', () => {
  describe('rendering', () => {
    it('renders without error with minimal props', () => {
      renderWithTheme(<SealRadioGroup items={[{ value: 'a' }]} />)
      expect(screen.getByRole('radio')).toBeInTheDocument()
    })

    it('renders all items', () => {
      renderWithTheme(<SealRadioGroup items={items} />)
      expect(screen.getAllByRole('radio')).toHaveLength(3)
    })

    it('renders labels', () => {
      renderWithTheme(<SealRadioGroup items={items} />)
      expect(screen.getByText('Light mode')).toBeInTheDocument()
      expect(screen.getByText('Dark mode')).toBeInTheDocument()
      expect(screen.getByText('System default')).toBeInTheDocument()
    })

    it('renders sublabel when provided', () => {
      renderWithTheme(<SealRadioGroup items={items} />)
      expect(screen.getByText('Easier on the eyes at night')).toBeInTheDocument()
    })

    it('renders without label or sublabel when omitted', () => {
      renderWithTheme(<SealRadioGroup items={[{ value: 'bare' }]} />)
      expect(screen.queryByRole('group')).not.toBeInTheDocument()
    })
  })

  describe('controlled value', () => {
    it('marks the correct item as checked when value is provided', () => {
      renderWithTheme(<SealRadioGroup items={items} value="dark" />)
      const radios = screen.getAllByRole('radio')
      // light=0, dark=1, system=2
      expect(radios[1]).toBeChecked()
      expect(radios[0]).not.toBeChecked()
    })

    it('renders no item checked when value is undefined', () => {
      renderWithTheme(<SealRadioGroup items={items} />)
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).not.toBeChecked()
      })
    })
  })

  describe('interaction', () => {
    it('calls onValueChange with the selected value', () => {
      const handleChange = vi.fn()
      renderWithTheme(<SealRadioGroup items={items} value="light" onValueChange={handleChange} />)
      const radio = screen.getAllByRole('radio')[2]
      if (radio) fireEvent.click(radio)
      expect(handleChange).toHaveBeenCalledWith('system')
    })

    it('does not throw when no onValueChange handler is provided', () => {
      renderWithTheme(<SealRadioGroup items={items} />)
      const radio = screen.getAllByRole('radio')[0]
      expect(() => radio && fireEvent.click(radio)).not.toThrow()
    })
  })

  describe('disabled state', () => {
    it('disables all radios when group disabled prop is true', () => {
      renderWithTheme(<SealRadioGroup items={items} disabled />)
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toBeDisabled()
      })
    })

    it('disables only the item with disabled:true', () => {
      const mixedItems = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
        { value: 'c', label: 'C' },
      ]
      renderWithTheme(<SealRadioGroup items={mixedItems} />)
      const radios = screen.getAllByRole('radio')
      expect(radios[0]).not.toBeDisabled()
      expect(radios[1]).toBeDisabled()
      expect(radios[2]).not.toBeDisabled()
    })

    it('does not call onValueChange when the group is disabled', () => {
      const handleChange = vi.fn()
      renderWithTheme(
        <SealRadioGroup items={items} disabled value="light" onValueChange={handleChange} />,
      )
      const radio = screen.getAllByRole('radio')[1]
      if (radio) fireEvent.click(radio)
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('orientation', () => {
    it('renders with vertical orientation by default', () => {
      renderWithTheme(<SealRadioGroup items={items} />)
      const group = screen.getByRole('radiogroup')
      expect(group.className).toMatch(/flex-col/)
    })

    it('renders with horizontal orientation', () => {
      renderWithTheme(<SealRadioGroup items={items} orientation="horizontal" />)
      const group = screen.getByRole('radiogroup')
      expect(group.className).toMatch(/flex-row/)
    })
  })

  describe('accessibility', () => {
    it('associates each label with its radio via htmlFor', () => {
      renderWithTheme(<SealRadioGroup items={items} />)
      const radios = screen.getAllByRole('radio')
      items.forEach((item, index) => {
        const label = screen.getByText(item.label)
        expect(label).toHaveAttribute('for', radios[index]?.id)
      })
    })

    it('applies aria-label to the group root', () => {
      renderWithTheme(<SealRadioGroup items={items} aria-label="Theme selection" />)
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Theme selection')
    })

    it('forwards ref to the group root element', () => {
      const ref = { current: null as HTMLDivElement | null }
      renderWithTheme(<SealRadioGroup ref={ref} items={items} />)
      expect(ref.current).not.toBeNull()
    })
  })

  describe('CSS tokens', () => {
    it('applies token-based classes to each radio item', () => {
      renderWithTheme(<SealRadioGroup items={items} />)
      const radio = screen.getAllByRole('radio')[0]
      expect(radio?.className).toMatch(/rounded/)
    })

    it('accepts additional className on the group root', () => {
      renderWithTheme(<SealRadioGroup items={items} className="extra-class" />)
      expect(screen.getByRole('radiogroup')).toHaveClass('extra-class')
    })
  })
})
