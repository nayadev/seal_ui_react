import { render, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealAlert } from './SealAlert'

describe('SealAlert', () => {
  describe('rendering', () => {
    it('renders without error with minimum required props', () => {
      renderWithTheme(<SealAlert variant="info" description="Something to know." />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('renders the description text', () => {
      renderWithTheme(<SealAlert variant="info" description="Upload complete." />)
      expect(screen.getByText('Upload complete.')).toBeInTheDocument()
    })

    it('renders the title when provided', () => {
      renderWithTheme(<SealAlert variant="success" title="Done" description="All changes saved." />)
      expect(screen.getByText('Done')).toBeInTheDocument()
      expect(screen.getByText('All changes saved.')).toBeInTheDocument()
    })

    it('does not render a title element when title is omitted', () => {
      renderWithTheme(<SealAlert variant="info" description="No title here." />)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('variants', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const

    variants.forEach((variant) => {
      it(`renders "${variant}" variant without error`, () => {
        renderWithTheme(<SealAlert variant={variant} description={`${variant} message`} />)
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
    })
  })

  describe('accessibility', () => {
    it('has role="alert"', () => {
      renderWithTheme(<SealAlert variant="warning" description="Low disk space." />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('uses aria-live="assertive" for the error variant', () => {
      renderWithTheme(<SealAlert variant="error" description="Critical failure." />)
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive')
    })

    it('uses aria-live="polite" for non-error variants', () => {
      renderWithTheme(<SealAlert variant="info" description="Informational." />)
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('CSS tokens', () => {
    it('applies color-mix background derived from semantic token', () => {
      renderWithTheme(<SealAlert variant="success" description="Saved." />)
      const el = screen.getByRole('alert')
      expect(el).toHaveStyle({
        background: 'color-mix(in srgb, var(--seal-semantic-success) 8%, transparent)',
      })
    })

    it('accepts additional className', () => {
      renderWithTheme(
        <SealAlert variant="info" description="Extra class test." className="test-extra" />,
      )
      expect(screen.getByRole('alert')).toHaveClass('test-extra')
    })
  })

  describe('render outside ThemeProvider', () => {
    it('renders without crashing when no ThemeProvider is present', () => {
      render(<SealAlert variant="warning" description="No theme." />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})
