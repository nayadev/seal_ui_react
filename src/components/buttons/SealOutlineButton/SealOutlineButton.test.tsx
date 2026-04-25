import { fireEvent, screen } from '@testing-library/react'
import { Star, Telescope } from 'lucide-react'

import { renderWithTheme } from '../../../../test/utils'

import { SealOutlineButton } from './SealOutlineButton'

const GRADIENT_BORDER_CLASS = 'seal-gradient-border'
const GRADIENT_CSS_VAR = '--seal-gb-gradient'

describe('SealOutlineButton', () => {
  describe('rendering', () => {
    it('renders without errors', () => {
      renderWithTheme(<SealOutlineButton>Cancel</SealOutlineButton>)
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })

    it('renders children as the button label', () => {
      renderWithTheme(<SealOutlineButton>Learn More</SealOutlineButton>)
      expect(screen.getByText('Learn More')).toBeInTheDocument()
    })

    it('renders the leading icon when provided', () => {
      renderWithTheme(<SealOutlineButton icon={Star}>Favorite</SealOutlineButton>)
      expect(screen.getByText('Favorite')).toBeInTheDocument()
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('renders a plain icon for non-gradient variants', () => {
      renderWithTheme(
        <SealOutlineButton variant="primary" icon={Star}>
          Primary
        </SealOutlineButton>,
      )
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      renderWithTheme(<SealOutlineButton className="my-custom-class">Go</SealOutlineButton>)
      expect(screen.getByRole('button')).toHaveClass('my-custom-class')
    })
  })

  describe('variants', () => {
    it.each(['primary', 'accent', 'accent-secondary', 'gradient', 'accent-gradient'] as const)(
      'renders %s variant without errors',
      (variant) => {
        renderWithTheme(<SealOutlineButton variant={variant}>Label</SealOutlineButton>)
        expect(screen.getByRole('button')).toBeInTheDocument()
      },
    )

    it('renders custom variant with a solid color', () => {
      renderWithTheme(
        <SealOutlineButton variant="custom" color="#e53935">
          Retry
        </SealOutlineButton>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveStyle({ color: '#e53935' })
    })

    it('renders custom variant with a gradient', () => {
      renderWithTheme(
        <SealOutlineButton variant="custom" gradient="linear-gradient(to right, #f00, #00f)">
          Custom
        </SealOutlineButton>,
      )
      const btn = screen.getByRole('button')
      // Gradient border is rendered via ::before with mask-composite — the button itself is transparent
      expect(btn).toHaveClass(GRADIENT_BORDER_CLASS)
      expect(btn.style.getPropertyValue(GRADIENT_CSS_VAR)).toBe(
        'linear-gradient(to right, #f00, #00f)',
      )
    })

    it('applies primary gradient background token', () => {
      renderWithTheme(<SealOutlineButton variant="gradient">Explore</SealOutlineButton>)
      const btn = screen.getByRole('button')
      // Gradient border is rendered via ::before; CSS variable targets the primary gradient
      expect(btn).toHaveClass(GRADIENT_BORDER_CLASS)
      expect(btn.style.getPropertyValue(GRADIENT_CSS_VAR)).toBe('var(--seal-gradient-primary)')
    })

    it('applies accent gradient background token', () => {
      renderWithTheme(<SealOutlineButton variant="accent-gradient">Boost</SealOutlineButton>)
      const btn = screen.getByRole('button')
      // Gradient border is rendered via ::before; CSS variable targets the accent gradient
      expect(btn).toHaveClass(GRADIENT_BORDER_CLASS)
      expect(btn.style.getPropertyValue(GRADIENT_CSS_VAR)).toBe('var(--seal-gradient-accent)')
    })

    it('applies gradient clip-text style to label for gradient variant', () => {
      renderWithTheme(<SealOutlineButton variant="gradient">Explore</SealOutlineButton>)
      // The label is wrapped in a <span> with gradient text fill
      const label = screen.getByText('Explore')
      expect(label.tagName).toBe('SPAN')
      expect(label).toHaveStyle({ background: 'var(--seal-gradient-primary)' })
    })

    it('applies gradient clip-text style to label for accent-gradient variant', () => {
      renderWithTheme(<SealOutlineButton variant="accent-gradient">Boost</SealOutlineButton>)
      const label = screen.getByText('Boost')
      expect(label.tagName).toBe('SPAN')
      expect(label).toHaveStyle({ background: 'var(--seal-gradient-accent)' })
    })

    it('applies primary foreground token for primary variant', () => {
      renderWithTheme(<SealOutlineButton variant="primary">Primary</SealOutlineButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        color: 'var(--seal-state-foreground-active)',
      })
    })

    it('applies accent color token for accent variant', () => {
      renderWithTheme(<SealOutlineButton variant="accent">Accent</SealOutlineButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        color: 'var(--seal-accent-accent)',
      })
    })
  })

  describe('interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithTheme(<SealOutlineButton onClick={handleClick}>Click me</SealOutlineButton>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealOutlineButton disabled onClick={handleClick}>
          Disabled
        </SealOutlineButton>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealOutlineButton loading onClick={handleClick}>
          Loading
        </SealOutlineButton>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('sets aria-busy when loading', () => {
      renderWithTheme(<SealOutlineButton loading>Wait</SealOutlineButton>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('hides the icon inside an invisible wrapper when loading', () => {
      renderWithTheme(
        <SealOutlineButton loading icon={Star}>
          Wait
        </SealOutlineButton>,
      )
      const svg = document.querySelector('.invisible svg')
      expect(svg).toBeInTheDocument()
    })

    it('disables the button when loading', () => {
      renderWithTheme(<SealOutlineButton loading>Processing</SealOutlineButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('disabled state', () => {
    it('marks the button as disabled', () => {
      renderWithTheme(<SealOutlineButton disabled>Off</SealOutlineButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has an accessible name from its text content', () => {
      renderWithTheme(<SealOutlineButton>Cancel action</SealOutlineButton>)
      expect(screen.getByRole('button', { name: 'Cancel action' })).toBeInTheDocument()
    })

    it('accepts an aria-label override', () => {
      renderWithTheme(<SealOutlineButton aria-label="Close the dialog">Cancel</SealOutlineButton>)
      expect(screen.getByRole('button', { name: 'Close the dialog' })).toBeInTheDocument()
    })
  })

  describe('gradient icon', () => {
    it('renders gradient icon wrapper for gradient variant with icon', () => {
      renderWithTheme(
        <SealOutlineButton variant="gradient" icon={Telescope}>
          Explore
        </SealOutlineButton>,
      )
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('injects linearGradient with fallback diagonal coords in JSDOM environment', () => {
      // In JSDOM, CSS custom properties from stylesheets are not resolved, so
      // getComputedStyle returns '' for --seal-gradient-*. The component falls
      // back to FALLBACK_COORDS (top-left→bottom-right diagonal) which is correct
      // for the current token direction. In a real browser, MutationObserver
      // picks up the theme class and recomputes the real angle from the CSS var.
      renderWithTheme(
        <SealOutlineButton variant="gradient" icon={Telescope}>
          Explore
        </SealOutlineButton>,
      )
      const grad = document.querySelector('linearGradient')
      expect(grad).toBeInTheDocument()
      expect(grad?.getAttribute('gradientUnits')).toBe('userSpaceOnUse')
      expect(grad?.getAttribute('x1')).toBe('0')
      expect(grad?.getAttribute('y1')).toBe('0')
      expect(grad?.getAttribute('x2')).toBe('24')
      expect(grad?.getAttribute('y2')).toBe('24')
    })

    it('resolves gradient direction from raw CSS string for custom variant icon', () => {
      // For custom gradient, the direction is parsed from the raw string synchronously
      // in the lazy useState initialiser — no CSS variable resolution needed.
      renderWithTheme(
        <SealOutlineButton
          variant="custom"
          gradient="linear-gradient(to right, #f00, #00f)"
          icon={Star}
        >
          Custom
        </SealOutlineButton>,
      )
      const grad = document.querySelector('linearGradient')
      // "to right" = 90°: sin(90)=1, cos(90)=0 → x1=0, y1=12, x2=24, y2=12
      expect(grad?.getAttribute('gradientUnits')).toBe('userSpaceOnUse')
      expect(grad?.getAttribute('x1')).toBe('0')
      expect(grad?.getAttribute('y1')).toBe('12')
      expect(grad?.getAttribute('x2')).toBe('24')
      expect(grad?.getAttribute('y2')).toBe('12')
    })

    it('parses diagonal "to bottom right" direction correctly', () => {
      renderWithTheme(
        <SealOutlineButton
          variant="custom"
          gradient="linear-gradient(to bottom right, #800, #008)"
          icon={Star}
        >
          Custom
        </SealOutlineButton>,
      )
      const grad = document.querySelector('linearGradient')
      // "to bottom right" = 135°: non-zero x and y deltas
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
        <SealOutlineButton
          variant="custom"
          gradient="linear-gradient(90deg, #800, #008)"
          icon={Star}
        >
          Custom
        </SealOutlineButton>,
      )
      const grad = document.querySelector('linearGradient')
      // 90deg = "to right": sin(90)=1 and cos(90) is near-zero (rounds to exactly 12 in float64)
      // so all four coords are exact integers.
      expect(grad?.getAttribute('x1')).toBe('0')
      expect(grad?.getAttribute('y1')).toBe('12')
      expect(grad?.getAttribute('x2')).toBe('24')
      expect(grad?.getAttribute('y2')).toBe('12')
    })

    it('sets stroke to gradient url on the SVG element', () => {
      renderWithTheme(
        <SealOutlineButton variant="gradient" icon={Telescope}>
          Explore
        </SealOutlineButton>,
      )
      const svg = document.querySelector('svg')
      // React renders stroke="url(#...)" as a prop override of Lucide's default,
      // so the attribute is set declaratively — no reconciliation concerns.
      expect(svg?.getAttribute('stroke')).toMatch(/^url\(#seal-ob-grad-/)
    })

    it('injects linearGradient into SVG for accent-gradient variant', () => {
      renderWithTheme(
        <SealOutlineButton variant="accent-gradient" icon={Star}>
          Boost
        </SealOutlineButton>,
      )
      const linearGradient = document.querySelector('linearGradient')
      expect(linearGradient).toBeInTheDocument()
    })

    it('injects linearGradient for custom gradient variant with icon', () => {
      renderWithTheme(
        <SealOutlineButton
          variant="custom"
          gradient="linear-gradient(to right, #f00, #00f)"
          icon={Star}
        >
          Custom
        </SealOutlineButton>,
      )
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('does not render gradient icon wrapper when no icon provided', () => {
      renderWithTheme(<SealOutlineButton variant="gradient">Explore</SealOutlineButton>)
      expect(document.querySelector('linearGradient')).not.toBeInTheDocument()
    })
  })
})
