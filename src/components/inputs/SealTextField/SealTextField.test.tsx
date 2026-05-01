import { fireEvent, screen } from '@testing-library/react'
import { Mail, Lock } from 'lucide-react'

import { renderWithTheme } from '../../../../test/utils'

import { SealTextField } from './SealTextField'

describe('SealTextField', () => {
  describe('rendering', () => {
    it('renders an input without error', () => {
      renderWithTheme(<SealTextField />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders the label when provided', () => {
      renderWithTheme(<SealTextField label="Email" />)
      expect(screen.getByText('Email')).toBeInTheDocument()
    })

    it('renders the placeholder when provided', () => {
      renderWithTheme(<SealTextField placeholder="you@example.com" />)
      expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
    })

    it('renders without label when omitted', () => {
      renderWithTheme(<SealTextField placeholder="no label" />)
      expect(screen.queryByRole('label')).not.toBeInTheDocument()
    })
  })

  describe('icon slots', () => {
    it('renders leading icon when provided', () => {
      renderWithTheme(<SealTextField leadingIcon={Mail} aria-label="email" />)
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('renders trailing icon when provided', () => {
      renderWithTheme(<SealTextField trailingIcon={Lock} aria-label="field" />)
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('does not render trailing icon when obscureText is true', () => {
      renderWithTheme(<SealTextField trailingIcon={Lock} obscureText aria-label="password" />)
      // The toggle button should be present instead of the static trailing icon
      expect(
        screen.getByRole('button', { name: /show password|hide password/i }),
      ).toBeInTheDocument()
    })
  })

  describe('obscureText', () => {
    it('renders input as type="password" when obscureText is true', () => {
      renderWithTheme(<SealTextField obscureText aria-label="password" />)
      // type="password" inputs are not exposed as role="textbox" by ARIA — query by label instead
      expect(screen.getByLabelText('password')).toHaveAttribute('type', 'password')
    })

    it('renders a visibility-toggle button when obscureText is true', () => {
      renderWithTheme(<SealTextField obscureText aria-label="password" />)
      // Initial state: text is hidden → button action is to "Show" it
      expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument()
    })

    it('toggles input to type="text" when visibility button is clicked', () => {
      renderWithTheme(<SealTextField obscureText aria-label="password" />)
      const toggle = screen.getByRole('button', { name: /show password/i })
      fireEvent.click(toggle)
      expect(screen.getByLabelText('password')).toHaveAttribute('type', 'text')
    })

    it('updates toggle aria-label after toggling visibility', () => {
      renderWithTheme(<SealTextField obscureText aria-label="password" />)
      const toggle = screen.getByRole('button', { name: /show password/i })
      fireEvent.click(toggle)
      expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('calls onChange with the string value on input', () => {
      const handleChange = vi.fn()
      renderWithTheme(<SealTextField onChange={handleChange} />)
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
      expect(handleChange).toHaveBeenCalledWith('hello')
    })

    it('does not call onChange when no handler is provided', () => {
      renderWithTheme(<SealTextField />)
      expect(() =>
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } }),
      ).not.toThrow()
    })
  })

  describe('disabled state', () => {
    it('renders in disabled state', () => {
      renderWithTheme(<SealTextField disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('associates label with input via htmlFor', () => {
      renderWithTheme(<SealTextField label="Username" />)
      const label = screen.getByText('Username')
      const input = screen.getByRole('textbox')
      expect(label).toHaveAttribute('for', input.id)
    })

    it('forwards ref to the underlying input element', () => {
      const ref = { current: null as HTMLInputElement | null }
      renderWithTheme(<SealTextField ref={ref} />)
      expect(ref.current).not.toBeNull()
      expect(ref.current?.tagName).toBe('INPUT')
    })

    it('uses provided id on the input', () => {
      renderWithTheme(<SealTextField id="custom-id" label="Field" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id')
    })
  })

  describe('CSS tokens', () => {
    it('applies Seal token classes to the input', () => {
      renderWithTheme(<SealTextField />)
      const input = screen.getByRole('textbox')
      expect(input.className).toMatch(/bg-\[var\(--seal-surface-surface-alt\)\]/)
    })

    it('accepts additional className', () => {
      renderWithTheme(<SealTextField className="extra-class" />)
      expect(screen.getByRole('textbox')).toHaveClass('extra-class')
    })
  })
})
