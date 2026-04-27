import { render, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealAlert } from './SealAlert'

describe('SealAlert', () => {
  describe('rendering', () => {
    it('renders without error with minimum required props', () => {
      renderWithTheme(<SealAlert.Info description="Something to know." />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('renders the description text', () => {
      renderWithTheme(<SealAlert.Info description="Upload complete." />)
      expect(screen.getByText('Upload complete.')).toBeInTheDocument()
    })

    it('renders the title when provided', () => {
      renderWithTheme(<SealAlert.Success title="Done" description="All changes saved." />)
      expect(screen.getByText('Done')).toBeInTheDocument()
      expect(screen.getByText('All changes saved.')).toBeInTheDocument()
    })

    it('does not render a title element when title is omitted', () => {
      renderWithTheme(<SealAlert.Info description="No title here." />)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('compound sub-components', () => {
    it('renders Info without error', () => {
      renderWithTheme(<SealAlert.Info description="info message" />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('renders Success without error', () => {
      renderWithTheme(<SealAlert.Success description="success message" />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('renders Warning without error', () => {
      renderWithTheme(<SealAlert.Warning description="warning message" />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('renders Error without error', () => {
      renderWithTheme(<SealAlert.Error description="error message" />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has role="alert"', () => {
      renderWithTheme(<SealAlert.Warning description="Low disk space." />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('uses aria-live="assertive" for the Error sub-component', () => {
      renderWithTheme(<SealAlert.Error description="Critical failure." />)
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive')
    })

    it('uses aria-live="polite" for non-error sub-components', () => {
      renderWithTheme(<SealAlert.Info description="Informational." />)
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('CSS tokens', () => {
    it('applies color-mix background derived from semantic token', () => {
      renderWithTheme(<SealAlert.Success description="Saved." />)
      const el = screen.getByRole('alert')
      expect(el).toHaveStyle({
        background: 'color-mix(in srgb, var(--seal-semantic-success) 8%, transparent)',
      })
    })

    it('accepts additional className', () => {
      renderWithTheme(<SealAlert.Info description="Extra class test." className="test-extra" />)
      expect(screen.getByRole('alert')).toHaveClass('test-extra')
    })
  })

  describe('render outside ThemeProvider', () => {
    it('renders without crashing when no ThemeProvider is present', () => {
      render(<SealAlert.Warning description="No theme." />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})
