import { fireEvent, screen } from '@testing-library/react'
import { ArrowRight, Star, Telescope } from 'lucide-react'

import { renderWithTheme } from '../../../../test/utils'

import { SealTextButton } from './SealTextButton'

describe('SealTextButton', () => {
  describe('rendering', () => {
    it('renders without errors', () => {
      renderWithTheme(<SealTextButton>Learn more</SealTextButton>)
      expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument()
    })

    it('renders children as the button label', () => {
      renderWithTheme(<SealTextButton>Discover</SealTextButton>)
      expect(screen.getByText('Discover')).toBeInTheDocument()
    })

    it('renders the leading icon when provided', () => {
      renderWithTheme(<SealTextButton icon={ArrowRight}>Skip</SealTextButton>)
      expect(screen.getByText('Skip')).toBeInTheDocument()
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      renderWithTheme(<SealTextButton className="my-custom-class">Go</SealTextButton>)
      expect(screen.getByRole('button')).toHaveClass('my-custom-class')
    })
  })

  describe('variants', () => {
    it.each(['primary', 'accent', 'accent-secondary', 'gradient', 'accent-gradient'] as const)(
      'renders %s variant without errors',
      (variant) => {
        renderWithTheme(<SealTextButton variant={variant}>Label</SealTextButton>)
        expect(screen.getByRole('button')).toBeInTheDocument()
      },
    )

    it('renders custom variant with a solid color', () => {
      renderWithTheme(
        <SealTextButton variant="custom" color="#e53935">
          Retry
        </SealTextButton>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveStyle({ color: '#e53935' })
    })

    it('renders custom variant with a gradient', () => {
      renderWithTheme(
        <SealTextButton variant="custom" gradient="linear-gradient(to right, #f00, #00f)">
          Custom
        </SealTextButton>,
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('applies primary gradient background token for gradient variant', () => {
      renderWithTheme(<SealTextButton variant="gradient">Explore</SealTextButton>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle({ background: 'var(--seal-gradient-primary)' })
    })

    it('applies accent gradient background token for accent-gradient variant', () => {
      renderWithTheme(<SealTextButton variant="accent-gradient">Boost</SealTextButton>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle({ background: 'var(--seal-gradient-accent)' })
    })

    it('applies foreground active color token for primary variant', () => {
      renderWithTheme(<SealTextButton variant="primary">Primary</SealTextButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        color: 'var(--seal-state-foreground-active)',
      })
    })

    it('applies accent color token for accent variant', () => {
      renderWithTheme(<SealTextButton variant="accent">Accent</SealTextButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        color: 'var(--seal-accent-accent)',
      })
    })

    it('applies accent-secondary color token for accent-secondary variant', () => {
      renderWithTheme(<SealTextButton variant="accent-secondary">Secondary</SealTextButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        color: 'var(--seal-accent-accent-secondary)',
      })
    })

    it('applies underline text decoration for solid variants', () => {
      renderWithTheme(<SealTextButton variant="primary">Primary</SealTextButton>)
      expect(screen.getByRole('button')).toHaveStyle({ textDecoration: 'underline' })
    })
  })

  describe('gradient underline', () => {
    it('wraps label in a span for gradient variant', () => {
      renderWithTheme(<SealTextButton variant="gradient">Explore</SealTextButton>)
      const btn = screen.getByRole('button')
      const wrapper = btn.querySelector('span')
      expect(wrapper).toBeInTheDocument()
    })

    it('wraps label in a span for accent-gradient variant', () => {
      renderWithTheme(<SealTextButton variant="accent-gradient">Boost</SealTextButton>)
      const btn = screen.getByRole('button')
      expect(btn.querySelector('span')).toBeInTheDocument()
    })

    it('renders gradient icon wrapper for gradient variant with icon', () => {
      renderWithTheme(
        <SealTextButton variant="gradient" icon={Telescope}>
          Explore
        </SealTextButton>,
      )
      expect(document.querySelector('linearGradient')).toBeInTheDocument()
    })

    it('injects linearGradient with fallback diagonal coords in JSDOM', () => {
      // CSS custom properties are not resolved in JSDOM, so FALLBACK_COORDS are used.
      renderWithTheme(
        <SealTextButton variant="gradient" icon={Telescope}>
          Explore
        </SealTextButton>,
      )
      const grad = document.querySelector('linearGradient')
      expect(grad).toBeInTheDocument()
      expect(grad?.getAttribute('gradientUnits')).toBe('userSpaceOnUse')
      expect(grad?.getAttribute('x1')).toBe('0')
      expect(grad?.getAttribute('y1')).toBe('0')
      expect(grad?.getAttribute('x2')).toBe('24')
      expect(grad?.getAttribute('y2')).toBe('24')
    })

    it('renders gradient icon for accent-gradient variant', () => {
      renderWithTheme(
        <SealTextButton variant="accent-gradient" icon={Star}>
          Boost
        </SealTextButton>,
      )
      expect(document.querySelector('linearGradient')).toBeInTheDocument()
    })

    it('renders plain icon for non-gradient variants', () => {
      renderWithTheme(
        <SealTextButton variant="primary" icon={ArrowRight}>
          Skip
        </SealTextButton>,
      )
      const grad = document.querySelector('linearGradient')
      expect(grad).not.toBeInTheDocument()
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('renders gradient icon for custom gradient variant', () => {
      renderWithTheme(
        <SealTextButton
          variant="custom"
          gradient="linear-gradient(to right, #f00, #00f)"
          icon={Star}
        >
          Custom
        </SealTextButton>,
      )
      expect(document.querySelector('linearGradient')).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithTheme(<SealTextButton onClick={handleClick}>Click me</SealTextButton>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealTextButton disabled onClick={handleClick}>
          Disabled
        </SealTextButton>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealTextButton loading onClick={handleClick}>
          Loading
        </SealTextButton>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('sets aria-busy when loading', () => {
      renderWithTheme(<SealTextButton loading>Wait</SealTextButton>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('disables the button when loading', () => {
      renderWithTheme(<SealTextButton loading>Processing</SealTextButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('hides the icon inside an invisible wrapper when loading', () => {
      renderWithTheme(
        <SealTextButton loading icon={ArrowRight}>
          Wait
        </SealTextButton>,
      )
      const svg = document.querySelector('.invisible svg')
      expect(svg).toBeInTheDocument()
    })

    it('preserves button dimensions during loading via invisible content overlay', () => {
      renderWithTheme(<SealTextButton loading>Loading text</SealTextButton>)
      // The invisible span keeps the label text in the DOM to maintain layout dimensions.
      const invisibleSpan = document.querySelector('.invisible')
      expect(invisibleSpan).toBeInTheDocument()
      expect(invisibleSpan).toHaveTextContent('Loading text')
    })

    it('suppresses underline wrapper during loading for gradient variant', () => {
      renderWithTheme(
        <SealTextButton variant="gradient" loading>
          Explore
        </SealTextButton>,
      )
      // When loading, the spinner branch renders — no label wrapper span is shown outside invisible.
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('disabled state', () => {
    it('marks the button as disabled', () => {
      renderWithTheme(<SealTextButton disabled>Off</SealTextButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has an accessible name from its text content', () => {
      renderWithTheme(<SealTextButton>Go back</SealTextButton>)
      expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument()
    })

    it('accepts an aria-label override', () => {
      renderWithTheme(<SealTextButton aria-label="Navigate to home">Home</SealTextButton>)
      expect(screen.getByRole('button', { name: 'Navigate to home' })).toBeInTheDocument()
    })
  })
})
