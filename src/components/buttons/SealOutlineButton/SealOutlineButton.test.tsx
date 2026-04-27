import { fireEvent, screen } from '@testing-library/react'
import { Star, Telescope } from 'lucide-react'

import { renderWithTheme } from '../../../../test/utils'

import { SealOutlineButton } from './SealOutlineButton'

const GRADIENT_BORDER_CLASS = 'seal-gradient-border'
const GRADIENT_CSS_VAR = '--seal-gb-gradient'
const OB_HOVER_VAR = '--seal-ob-hover'

describe('SealOutlineButton', () => {
  describe('rendering', () => {
    it('renders without errors', () => {
      renderWithTheme(<SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>)
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })

    it('renders children as the button label', () => {
      renderWithTheme(<SealOutlineButton.Primary>Learn More</SealOutlineButton.Primary>)
      expect(screen.getByText('Learn More')).toBeInTheDocument()
    })

    it('renders the leading icon when provided', () => {
      renderWithTheme(<SealOutlineButton.Primary icon={Star}>Favorite</SealOutlineButton.Primary>)
      expect(screen.getByText('Favorite')).toBeInTheDocument()
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('renders a plain icon for non-gradient sub-components', () => {
      renderWithTheme(<SealOutlineButton.Primary icon={Star}>Primary</SealOutlineButton.Primary>)
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      renderWithTheme(
        <SealOutlineButton.Primary className="my-custom-class">Go</SealOutlineButton.Primary>,
      )
      expect(screen.getByRole('button')).toHaveClass('my-custom-class')
    })
  })

  describe('compound sub-components', () => {
    it('renders Primary without errors', () => {
      renderWithTheme(<SealOutlineButton.Primary>Label</SealOutlineButton.Primary>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders Accent without errors', () => {
      renderWithTheme(<SealOutlineButton.Accent>Label</SealOutlineButton.Accent>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders AccentSecondary without errors', () => {
      renderWithTheme(<SealOutlineButton.AccentSecondary>Label</SealOutlineButton.AccentSecondary>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders Gradient with gradient border token', () => {
      renderWithTheme(<SealOutlineButton.Gradient>Explore</SealOutlineButton.Gradient>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass(GRADIENT_BORDER_CLASS)
      expect(btn.style.getPropertyValue(GRADIENT_CSS_VAR)).toBe('var(--seal-gradient-primary)')
      expect(btn.style.getPropertyValue(OB_HOVER_VAR)).toBe(
        'color-mix(in srgb, var(--seal-brand-primary) 8%, transparent)',
      )
    })

    it('renders AccentGradient with accent gradient border token', () => {
      renderWithTheme(<SealOutlineButton.AccentGradient>Boost</SealOutlineButton.AccentGradient>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass(GRADIENT_BORDER_CLASS)
      expect(btn.style.getPropertyValue(GRADIENT_CSS_VAR)).toBe('var(--seal-gradient-accent)')
      expect(btn.style.getPropertyValue(OB_HOVER_VAR)).toBe(
        'color-mix(in srgb, var(--seal-brand-primary-shade) 8%, transparent)',
      )
    })

    it('renders Custom with a solid color', () => {
      renderWithTheme(<SealOutlineButton.Custom color="#e53935">Retry</SealOutlineButton.Custom>)
      const btn = screen.getByRole('button')
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveStyle({ color: '#e53935' })
    })

    it('renders Custom with a gradient border', () => {
      renderWithTheme(
        <SealOutlineButton.Custom gradient="linear-gradient(to right, #f00, #00f)">
          Custom
        </SealOutlineButton.Custom>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass(GRADIENT_BORDER_CLASS)
      expect(btn.style.getPropertyValue(GRADIENT_CSS_VAR)).toBe(
        'linear-gradient(to right, #f00, #00f)',
      )
      expect(btn.style.getPropertyValue(OB_HOVER_VAR)).toBe(
        'color-mix(in srgb, #f00 8%, transparent)',
      )
    })

    it('applies gradient clip-text style to label for Gradient', () => {
      renderWithTheme(<SealOutlineButton.Gradient>Explore</SealOutlineButton.Gradient>)
      const label = screen.getByText('Explore')
      expect(label.tagName).toBe('SPAN')
      expect(label).toHaveStyle({ background: 'var(--seal-gradient-primary)' })
    })

    it('applies gradient clip-text style to label for AccentGradient', () => {
      renderWithTheme(<SealOutlineButton.AccentGradient>Boost</SealOutlineButton.AccentGradient>)
      const label = screen.getByText('Boost')
      expect(label.tagName).toBe('SPAN')
      expect(label).toHaveStyle({ background: 'var(--seal-gradient-accent)' })
    })

    it('applies primary foreground token for Primary', () => {
      renderWithTheme(<SealOutlineButton.Primary>Primary</SealOutlineButton.Primary>)
      expect(screen.getByRole('button')).toHaveStyle({
        color: 'var(--seal-state-foreground-active)',
      })
    })

    it('applies accent color token for Accent', () => {
      renderWithTheme(<SealOutlineButton.Accent>Accent</SealOutlineButton.Accent>)
      expect(screen.getByRole('button')).toHaveStyle({ color: 'var(--seal-accent-accent)' })
    })
  })

  describe('interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealOutlineButton.Primary onClick={handleClick}>Click me</SealOutlineButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealOutlineButton.Primary disabled onClick={handleClick}>
          Disabled
        </SealOutlineButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealOutlineButton.Primary loading onClick={handleClick}>
          Loading
        </SealOutlineButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('sets aria-busy when loading', () => {
      renderWithTheme(<SealOutlineButton.Primary loading>Wait</SealOutlineButton.Primary>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('hides the icon inside an invisible wrapper when loading', () => {
      renderWithTheme(
        <SealOutlineButton.Primary loading icon={Star}>
          Wait
        </SealOutlineButton.Primary>,
      )
      const svg = document.querySelector('.invisible svg')
      expect(svg).toBeInTheDocument()
    })

    it('disables the button when loading', () => {
      renderWithTheme(<SealOutlineButton.Primary loading>Processing</SealOutlineButton.Primary>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('disabled state', () => {
    it('marks the button as disabled', () => {
      renderWithTheme(<SealOutlineButton.Primary disabled>Off</SealOutlineButton.Primary>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has an accessible name from its text content', () => {
      renderWithTheme(<SealOutlineButton.Primary>Cancel action</SealOutlineButton.Primary>)
      expect(screen.getByRole('button', { name: 'Cancel action' })).toBeInTheDocument()
    })

    it('accepts an aria-label override', () => {
      renderWithTheme(
        <SealOutlineButton.Primary aria-label="Close the dialog">Cancel</SealOutlineButton.Primary>,
      )
      expect(screen.getByRole('button', { name: 'Close the dialog' })).toBeInTheDocument()
    })
  })

  describe('gradient icon', () => {
    it('renders gradient icon wrapper for Gradient with icon', () => {
      renderWithTheme(
        <SealOutlineButton.Gradient icon={Telescope}>Explore</SealOutlineButton.Gradient>,
      )
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('injects linearGradient with fallback diagonal coords in JSDOM environment', () => {
      renderWithTheme(
        <SealOutlineButton.Gradient icon={Telescope}>Explore</SealOutlineButton.Gradient>,
      )
      const grad = document.querySelector('linearGradient')
      expect(grad).toBeInTheDocument()
      expect(grad?.getAttribute('gradientUnits')).toBe('userSpaceOnUse')
      expect(grad?.getAttribute('x1')).toBe('0')
      expect(grad?.getAttribute('y1')).toBe('0')
      expect(grad?.getAttribute('x2')).toBe('24')
      expect(grad?.getAttribute('y2')).toBe('24')
    })

    it('resolves gradient direction from raw CSS string for Custom icon', () => {
      renderWithTheme(
        <SealOutlineButton.Custom gradient="linear-gradient(to right, #f00, #00f)" icon={Star}>
          Custom
        </SealOutlineButton.Custom>,
      )
      const grad = document.querySelector('linearGradient')
      expect(grad?.getAttribute('gradientUnits')).toBe('userSpaceOnUse')
      expect(grad?.getAttribute('x1')).toBe('0')
      expect(grad?.getAttribute('y1')).toBe('12')
      expect(grad?.getAttribute('x2')).toBe('24')
      expect(grad?.getAttribute('y2')).toBe('12')
    })

    it('parses diagonal "to bottom right" direction correctly', () => {
      renderWithTheme(
        <SealOutlineButton.Custom
          gradient="linear-gradient(to bottom right, #800, #008)"
          icon={Star}
        >
          Custom
        </SealOutlineButton.Custom>,
      )
      const grad = document.querySelector('linearGradient')
      const x1 = Number.parseFloat(grad?.getAttribute('x1') ?? '0')
      const y1 = Number.parseFloat(grad?.getAttribute('y1') ?? '0')
      const x2 = Number.parseFloat(grad?.getAttribute('x2') ?? '24')
      const y2 = Number.parseFloat(grad?.getAttribute('y2') ?? '24')
      expect(x1).toBeCloseTo(3.515, 1)
      expect(y1).toBeCloseTo(3.515, 1)
      expect(x2).toBeCloseTo(20.485, 1)
      expect(y2).toBeCloseTo(20.485, 1)
    })

    it('parses deg-based gradient direction', () => {
      renderWithTheme(
        <SealOutlineButton.Custom gradient="linear-gradient(90deg, #800, #008)" icon={Star}>
          Custom
        </SealOutlineButton.Custom>,
      )
      const grad = document.querySelector('linearGradient')
      expect(grad?.getAttribute('x1')).toBe('0')
      expect(grad?.getAttribute('y1')).toBe('12')
      expect(grad?.getAttribute('x2')).toBe('24')
      expect(grad?.getAttribute('y2')).toBe('12')
    })

    it('sets stroke to gradient url on the SVG element', () => {
      renderWithTheme(
        <SealOutlineButton.Gradient icon={Telescope}>Explore</SealOutlineButton.Gradient>,
      )
      const svg = document.querySelector('svg')
      expect(svg?.getAttribute('stroke')).toMatch(/^url\(#seal-ob-grad-/)
    })

    it('injects linearGradient into SVG for AccentGradient', () => {
      renderWithTheme(
        <SealOutlineButton.AccentGradient icon={Star}>Boost</SealOutlineButton.AccentGradient>,
      )
      const linearGradient = document.querySelector('linearGradient')
      expect(linearGradient).toBeInTheDocument()
    })

    it('injects linearGradient for Custom gradient with icon', () => {
      renderWithTheme(
        <SealOutlineButton.Custom gradient="linear-gradient(to right, #f00, #00f)" icon={Star}>
          Custom
        </SealOutlineButton.Custom>,
      )
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('does not render gradient icon wrapper when no icon provided', () => {
      renderWithTheme(<SealOutlineButton.Gradient>Explore</SealOutlineButton.Gradient>)
      expect(document.querySelector('linearGradient')).not.toBeInTheDocument()
    })
  })
})
