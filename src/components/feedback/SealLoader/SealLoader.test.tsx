import { render, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealLoader } from './SealLoader'

describe('SealLoader', () => {
  describe('rendering', () => {
    it('renders without error with default props', () => {
      renderWithTheme(<SealLoader />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders an SVG arc element', () => {
      const { container } = renderWithTheme(<SealLoader />)
      expect(container.querySelector('svg')).toBeInTheDocument()
      expect(container.querySelector('circle')).toBeInTheDocument()
    })

    it('renders a label when provided', () => {
      renderWithTheme(<SealLoader label="Syncing…" />)
      expect(screen.getByText('Syncing…')).toBeInTheDocument()
    })

    it('does not render a label element when label is omitted', () => {
      renderWithTheme(<SealLoader />)
      // Only the SVG child should be present inside the status container
      const status = screen.getByRole('status')
      expect(status.querySelectorAll('span')).toHaveLength(0)
    })
  })

  describe('sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const

    sizes.forEach((size) => {
      it(`renders "${size}" size without error`, () => {
        renderWithTheme(<SealLoader size={size} />)
        expect(screen.getByRole('status')).toBeInTheDocument()
      })
    })

    it('renders a 16×16 SVG for the small size', () => {
      const { container } = renderWithTheme(<SealLoader size="small" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '16')
      expect(svg).toHaveAttribute('height', '16')
    })

    it('renders a 24×24 SVG for the medium size', () => {
      const { container } = renderWithTheme(<SealLoader size="medium" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '24')
      expect(svg).toHaveAttribute('height', '24')
    })

    it('renders a 40×40 SVG for the large size', () => {
      const { container } = renderWithTheme(<SealLoader size="large" />)
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('width', '40')
      expect(svg).toHaveAttribute('height', '40')
    })
  })

  describe('color', () => {
    it('applies the brand primary token as default color', () => {
      const { container } = renderWithTheme(<SealLoader />)
      const circle = container.querySelector('circle')
      expect(circle).toHaveAttribute('stroke', 'var(--seal-brand-primary)')
    })

    it('applies a custom color when provided', () => {
      const { container } = renderWithTheme(<SealLoader color="var(--seal-semantic-success)" />)
      const circle = container.querySelector('circle')
      expect(circle).toHaveAttribute('stroke', 'var(--seal-semantic-success)')
    })
  })

  describe('accessibility', () => {
    it('has role="status"', () => {
      renderWithTheme(<SealLoader />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('has aria-label="Loading" by default', () => {
      renderWithTheme(<SealLoader />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
    })

    it('accepts a custom aria-label', () => {
      renderWithTheme(<SealLoader aria-label="Uploading file" />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Uploading file')
    })

    it('marks the inner SVG as aria-hidden', () => {
      const { container } = renderWithTheme(<SealLoader />)
      expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('animation', () => {
    it('applies the seal-loader-spin animation to the SVG', () => {
      const { container } = renderWithTheme(<SealLoader />)
      const svg = container.querySelector('svg')
      expect(svg?.style.animation).toContain('seal-loader-spin')
    })
  })

  describe('forwarded props', () => {
    it('accepts additional className', () => {
      renderWithTheme(<SealLoader className="test-extra" />)
      expect(screen.getByRole('status')).toHaveClass('test-extra')
    })

    it('accepts additional HTML span attributes', () => {
      renderWithTheme(<SealLoader data-testid="my-loader" />)
      expect(screen.getByTestId('my-loader')).toBeInTheDocument()
    })
  })

  describe('render outside ThemeProvider', () => {
    it('renders without crashing when no ThemeProvider is present', () => {
      render(<SealLoader />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })
})
