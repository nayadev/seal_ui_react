import { render, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealProgress } from './SealProgress'

const PROGRESSBAR_ROLE = 'progressbar' as const
const ARIA_VALUE_NOW = 'aria-valuenow' as const

describe('SealProgress', () => {
  describe('rendering', () => {
    it('renders without error with minimum props', () => {
      renderWithTheme(<SealProgress.Primary />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toBeInTheDocument()
    })

    it('renders a determinate bar when value is provided', () => {
      renderWithTheme(<SealProgress.Primary value={60} />)
      const bar = screen.getByRole(PROGRESSBAR_ROLE)
      expect(bar).toHaveAttribute(ARIA_VALUE_NOW, '60')
    })

    it('renders an indeterminate bar when value is null', () => {
      renderWithTheme(<SealProgress.Primary value={null} />)
      const bar = screen.getByRole(PROGRESSBAR_ROLE)
      expect(bar).not.toHaveAttribute(ARIA_VALUE_NOW)
      expect(bar).toHaveAttribute('data-state', 'indeterminate')
    })

    it('renders an indeterminate bar when value is omitted', () => {
      renderWithTheme(<SealProgress.Primary />)
      const bar = screen.getByRole(PROGRESSBAR_ROLE)
      expect(bar).not.toHaveAttribute(ARIA_VALUE_NOW)
      expect(bar).toHaveAttribute('data-state', 'indeterminate')
    })

    it('renders at value=0', () => {
      renderWithTheme(<SealProgress.Primary value={0} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toHaveAttribute(ARIA_VALUE_NOW, '0')
    })

    it('renders at value=100', () => {
      renderWithTheme(<SealProgress.Primary value={100} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toHaveAttribute(ARIA_VALUE_NOW, '100')
    })
  })

  describe('variants', () => {
    it('renders Primary sub-component without error', () => {
      renderWithTheme(<SealProgress.Primary value={50} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toBeInTheDocument()
    })

    it('renders Accent sub-component without error', () => {
      renderWithTheme(<SealProgress.Accent value={50} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toBeInTheDocument()
    })

    it('renders root with variant="primary" without error', () => {
      renderWithTheme(<SealProgress variant="primary" value={50} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toBeInTheDocument()
    })

    it('renders root with variant="accent" without error', () => {
      renderWithTheme(<SealProgress variant="accent" value={50} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toBeInTheDocument()
    })
  })

  describe('CSS tokens', () => {
    it('applies border-default background to the track', () => {
      renderWithTheme(<SealProgress.Primary value={40} />)
      const bar = screen.getByRole(PROGRESSBAR_ROLE)
      expect(bar.className).toContain('bg-[var(--seal-border-default)]')
    })

    it('applies rounded-full token to the track', () => {
      renderWithTheme(<SealProgress.Primary value={40} />)
      const bar = screen.getByRole(PROGRESSBAR_ROLE)
      expect(bar.className).toContain('rounded-[var(--seal-radius-full)]')
    })

    it('accepts additional className', () => {
      renderWithTheme(<SealProgress.Primary value={30} className="custom-class" />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toHaveClass('custom-class')
    })
  })

  describe('accessibility', () => {
    it('has role="progressbar"', () => {
      renderWithTheme(<SealProgress.Primary value={50} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toBeInTheDocument()
    })

    it('has aria-label defaulting to "Progress"', () => {
      renderWithTheme(<SealProgress.Primary value={50} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toHaveAttribute('aria-label', 'Progress')
    })

    it('accepts a custom aria-label', () => {
      renderWithTheme(<SealProgress.Primary value={50} aria-label="Uploading file" />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toHaveAttribute('aria-label', 'Uploading file')
    })

    it('has aria-valuemin=0 and aria-valuemax=100', () => {
      renderWithTheme(<SealProgress.Primary value={50} />)
      const bar = screen.getByRole(PROGRESSBAR_ROLE)
      expect(bar).toHaveAttribute('aria-valuemin', '0')
      expect(bar).toHaveAttribute('aria-valuemax', '100')
    })
  })

  describe('render outside ThemeProvider', () => {
    it('renders without crashing when no ThemeProvider is present', () => {
      render(<SealProgress.Primary value={50} />)
      expect(screen.getByRole(PROGRESSBAR_ROLE)).toBeInTheDocument()
    })
  })
})
