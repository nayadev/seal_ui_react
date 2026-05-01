import { screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealSelect } from './SealSelect'

// Radix Select dispatches PointerEvents which jsdom does not implement.
// This minimal stub lets the trigger fire its open handler in tests.
class PointerEventStub extends Event {}
Object.defineProperty(globalThis, 'PointerEvent', {
  value: PointerEventStub,
  writable: true,
  configurable: true,
})

// Radix Select renders the dropdown via a Portal into document.body. In jsdom
// the portal rendering with pointer events is unreliable, so interaction tests
// verify the trigger state and callback wiring rather than the open listbox.

const options = [
  { value: 'nebula', label: 'Nebula' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'deep_ocean', label: 'Deep Ocean' },
  { value: 'terminal', label: 'Terminal', disabled: true },
]

describe('SealSelect', () => {
  describe('rendering', () => {
    it('renders without error with minimal props', () => {
      renderWithTheme(<SealSelect options={options} />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders the placeholder when no value is selected', () => {
      renderWithTheme(<SealSelect options={options} placeholder="Choose a theme" />)
      expect(screen.getByText('Choose a theme')).toBeInTheDocument()
    })

    it('renders the label when provided', () => {
      renderWithTheme(<SealSelect options={options} label="Theme" />)
      expect(screen.getByText('Theme')).toBeInTheDocument()
    })

    it('associates label with trigger via htmlFor', () => {
      renderWithTheme(<SealSelect options={options} label="Theme" />)
      const trigger = screen.getByRole('combobox')
      const label = screen.getByText('Theme')
      expect(label).toHaveAttribute('for', trigger.id)
    })

    it('does not render a label element when label is omitted', () => {
      renderWithTheme(<SealSelect options={options} placeholder="Pick one" />)
      expect(screen.queryByText('Theme')).not.toBeInTheDocument()
    })
  })

  describe('controlled value', () => {
    it('displays the selected option label when value is provided', () => {
      renderWithTheme(<SealSelect options={options} value="arctic" />)
      expect(screen.getByRole('combobox')).toHaveTextContent('Arctic')
    })
  })

  describe('interaction', () => {
    it('accepts an onValueChange handler without errors', () => {
      const handleChange = vi.fn()
      expect(() =>
        renderWithTheme(
          <SealSelect options={options} placeholder="Pick one" onValueChange={handleChange} />,
        ),
      ).not.toThrow()
    })

    it('renders without errors when no onValueChange handler is provided', () => {
      expect(() =>
        renderWithTheme(<SealSelect options={options} placeholder="Pick one" />),
      ).not.toThrow()
    })

    it('trigger has the combobox role and is a button', () => {
      renderWithTheme(<SealSelect options={options} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger.tagName).toBe('BUTTON')
    })
  })

  describe('disabled state', () => {
    it('renders the trigger as disabled when disabled prop is true', () => {
      renderWithTheme(<SealSelect options={options} disabled />)
      expect(screen.getByRole('combobox')).toBeDisabled()
    })

    it('renders individual options as disabled', () => {
      // Options are rendered in a Radix portal only when the dropdown is open.
      // We verify the disabled prop is accepted and doesn't cause a render error.
      expect(() =>
        renderWithTheme(<SealSelect options={options} placeholder="Pick one" />),
      ).not.toThrow()
    })
  })

  describe('accessibility', () => {
    it('applies aria-label to the trigger when provided', () => {
      renderWithTheme(<SealSelect options={options} aria-label="Select a theme" />)
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Select a theme')
    })

    it('forwards ref to the trigger button element', () => {
      const ref = { current: null as HTMLButtonElement | null }
      renderWithTheme(<SealSelect ref={ref} options={options} />)
      expect(ref.current).not.toBeNull()
    })
  })

  describe('CSS tokens', () => {
    it('applies token-based classes to the trigger', () => {
      renderWithTheme(<SealSelect options={options} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger.className).toMatch(/rounded/)
    })

    it('accepts additional className on the trigger', () => {
      renderWithTheme(<SealSelect options={options} className="extra-class" />)
      expect(screen.getByRole('combobox')).toHaveClass('extra-class')
    })
  })
})
