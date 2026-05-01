import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealCheckbox } from './SealCheckbox'

describe('SealCheckbox', () => {
  describe('rendering', () => {
    it('renders without error', () => {
      renderWithTheme(<SealCheckbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders with label', () => {
      renderWithTheme(<SealCheckbox label="Accept terms" />)
      expect(screen.getByText('Accept terms')).toBeInTheDocument()
    })

    it('renders with label and sublabel', () => {
      renderWithTheme(<SealCheckbox label="Marketing emails" sublabel="Receive news and updates" />)
      expect(screen.getByText('Marketing emails')).toBeInTheDocument()
      expect(screen.getByText('Receive news and updates')).toBeInTheDocument()
    })

    it('does not render label or sublabel when omitted', () => {
      renderWithTheme(<SealCheckbox />)
      // No label element — only the checkbox role
      expect(screen.queryByRole('group')).not.toBeInTheDocument()
    })

    it('renders in checked state', () => {
      renderWithTheme(<SealCheckbox checked />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('renders in unchecked state', () => {
      renderWithTheme(<SealCheckbox checked={false} />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })
  })

  describe('interaction', () => {
    it('calls onCheckedChange when clicked', () => {
      const handleChange = vi.fn()
      renderWithTheme(<SealCheckbox checked={false} onCheckedChange={handleChange} />)
      fireEvent.click(screen.getByRole('checkbox'))
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('does not throw when no onCheckedChange handler is provided', () => {
      renderWithTheme(<SealCheckbox />)
      expect(() => fireEvent.click(screen.getByRole('checkbox'))).not.toThrow()
    })
  })

  describe('disabled state', () => {
    it('renders in disabled state', () => {
      renderWithTheme(<SealCheckbox disabled />)
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('does not call onCheckedChange when disabled', () => {
      const handleChange = vi.fn()
      renderWithTheme(<SealCheckbox disabled checked={false} onCheckedChange={handleChange} />)
      fireEvent.click(screen.getByRole('checkbox'))
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('associates label with checkbox via htmlFor', () => {
      renderWithTheme(<SealCheckbox label="Subscribe" />)
      const label = screen.getByText('Subscribe')
      const checkbox = screen.getByRole('checkbox')
      expect(label).toHaveAttribute('for', checkbox.id)
    })

    it('uses provided id on the checkbox', () => {
      renderWithTheme(<SealCheckbox id="my-checkbox" label="Option" />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'my-checkbox')
    })

    it('forwards ref to the underlying checkbox element', () => {
      const ref = { current: null as HTMLButtonElement | null }
      renderWithTheme(<SealCheckbox ref={ref} />)
      expect(ref.current).not.toBeNull()
    })
  })

  describe('CSS tokens', () => {
    it('applies Seal token classes to the checkbox', () => {
      renderWithTheme(<SealCheckbox />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox.className).toMatch(/data-\[state=checked\]/)
    })

    it('accepts additional className', () => {
      renderWithTheme(<SealCheckbox className="extra-class" />)
      expect(screen.getByRole('checkbox')).toHaveClass('extra-class')
    })
  })
})
