import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealTextarea } from './SealTextarea'

describe('SealTextarea', () => {
  describe('rendering', () => {
    it('renders a textarea without error', () => {
      renderWithTheme(<SealTextarea />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders the label when provided', () => {
      renderWithTheme(<SealTextarea label="Description" />)
      expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('renders the placeholder when provided', () => {
      renderWithTheme(<SealTextarea placeholder="Enter a description…" />)
      expect(screen.getByPlaceholderText('Enter a description…')).toBeInTheDocument()
    })

    it('does not render a label element when label is omitted', () => {
      renderWithTheme(<SealTextarea placeholder="no label" />)
      expect(screen.queryByText('no label')).not.toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('calls onChange with the string value on input', () => {
      const handleChange = vi.fn()
      renderWithTheme(<SealTextarea onChange={handleChange} />)
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello world' } })
      expect(handleChange).toHaveBeenCalledWith('hello world')
    })

    it('does not throw when no onChange handler is provided', () => {
      renderWithTheme(<SealTextarea />)
      expect(() =>
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } }),
      ).not.toThrow()
    })
  })

  describe('disabled state', () => {
    it('renders in disabled state', () => {
      renderWithTheme(<SealTextarea disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('resizable', () => {
    it('applies resize:vertical when resizable is true (default)', () => {
      renderWithTheme(<SealTextarea />)
      expect(screen.getByRole('textbox')).toHaveStyle({ resize: 'vertical' })
    })

    it('applies resize:none when resizable is false', () => {
      renderWithTheme(<SealTextarea resizable={false} />)
      expect(screen.getByRole('textbox')).toHaveStyle({ resize: 'none' })
    })
  })

  describe('accessibility', () => {
    it('associates label with textarea via htmlFor', () => {
      renderWithTheme(<SealTextarea label="Feedback" />)
      const label = screen.getByText('Feedback')
      const textarea = screen.getByRole('textbox')
      expect(label).toHaveAttribute('for', textarea.id)
    })

    it('forwards ref to the underlying textarea element', () => {
      const ref = { current: null as HTMLTextAreaElement | null }
      renderWithTheme(<SealTextarea ref={ref} />)
      expect(ref.current).not.toBeNull()
      expect(ref.current?.tagName).toBe('TEXTAREA')
    })

    it('uses provided id on the textarea', () => {
      renderWithTheme(<SealTextarea id="custom-id" label="Field" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id')
    })
  })

  describe('CSS tokens', () => {
    it('applies Seal token classes to the textarea', () => {
      renderWithTheme(<SealTextarea />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.className).toMatch(/bg-\[var\(--seal-surface-surface-alt\)\]/)
    })

    it('accepts additional className', () => {
      renderWithTheme(<SealTextarea className="extra-class" />)
      expect(screen.getByRole('textbox')).toHaveClass('extra-class')
    })
  })
})
