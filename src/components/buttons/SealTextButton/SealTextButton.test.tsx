import { fireEvent, screen } from '@testing-library/react'
import { ArrowRight, Star, Telescope } from 'lucide-react'

import { renderWithTheme } from '../../../../test/utils'

import { SealTextButton } from './SealTextButton'

describe('SealTextButton', () => {
  describe('rendering', () => {
    it('renders without errors', () => {
      renderWithTheme(<SealTextButton.Primary>Learn more</SealTextButton.Primary>)
      expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument()
    })

    it('renders children as the button label', () => {
      renderWithTheme(<SealTextButton.Primary>Discover</SealTextButton.Primary>)
      expect(screen.getByText('Discover')).toBeInTheDocument()
    })

    it('renders the leading icon when provided', () => {
      renderWithTheme(<SealTextButton.Primary icon={ArrowRight}>Skip</SealTextButton.Primary>)
      expect(screen.getByText('Skip')).toBeInTheDocument()
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      renderWithTheme(
        <SealTextButton.Primary className="my-custom-class">Go</SealTextButton.Primary>,
      )
      expect(screen.getByRole('button')).toHaveClass('my-custom-class')
    })
  })

  describe('compound sub-components', () => {
    it('renders Primary without errors', () => {
      renderWithTheme(<SealTextButton.Primary>Label</SealTextButton.Primary>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders Accent without errors', () => {
      renderWithTheme(<SealTextButton.Accent>Label</SealTextButton.Accent>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders AccentSecondary without errors', () => {
      renderWithTheme(<SealTextButton.AccentSecondary>Label</SealTextButton.AccentSecondary>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders Custom with a solid color', () => {
      renderWithTheme(<SealTextButton.Custom color="#e53935">Retry</SealTextButton.Custom>)
      const btn = screen.getByRole('button')
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveStyle({ color: '#e53935' })
    })

    it('renders Custom with a gradient', () => {
      renderWithTheme(
        <SealTextButton.Custom gradient="linear-gradient(to right, #f00, #00f)">
          Custom
        </SealTextButton.Custom>,
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('applies primary gradient to the label wrapper span for Gradient', () => {
      renderWithTheme(<SealTextButton.Gradient>Explore</SealTextButton.Gradient>)
      const btn = screen.getByRole('button')
      const wrapper = btn.querySelector('span:not(.invisible):not(.absolute):not(.relative)')
      expect(wrapper).toBeInTheDocument()
    })

    it('applies accent gradient to the label wrapper span for AccentGradient', () => {
      renderWithTheme(<SealTextButton.AccentGradient>Boost</SealTextButton.AccentGradient>)
      const btn = screen.getByRole('button')
      const wrapper = btn.querySelector('span:not(.invisible):not(.absolute):not(.relative)')
      expect(wrapper).toBeInTheDocument()
    })

    it('applies foreground active color token for Primary', () => {
      renderWithTheme(<SealTextButton.Primary>Primary</SealTextButton.Primary>)
      expect(screen.getByRole('button')).toHaveStyle({
        color: 'var(--seal-state-foreground-active)',
      })
    })

    it('applies accent color token for Accent', () => {
      renderWithTheme(<SealTextButton.Accent>Accent</SealTextButton.Accent>)
      expect(screen.getByRole('button')).toHaveStyle({ color: 'var(--seal-accent-accent)' })
    })

    it('applies accent-secondary color token for AccentSecondary', () => {
      renderWithTheme(<SealTextButton.AccentSecondary>Secondary</SealTextButton.AccentSecondary>)
      expect(screen.getByRole('button')).toHaveStyle({
        color: 'var(--seal-accent-accent-secondary)',
      })
    })

    it('applies underline text decoration for solid sub-components', () => {
      renderWithTheme(<SealTextButton.Primary>Primary</SealTextButton.Primary>)
      expect(screen.getByRole('button')).toHaveStyle({ textDecoration: 'underline' })
    })
  })

  describe('gradient underline', () => {
    it('wraps label in a span for Gradient', () => {
      renderWithTheme(<SealTextButton.Gradient>Explore</SealTextButton.Gradient>)
      const btn = screen.getByRole('button')
      expect(btn.querySelector('span')).toBeInTheDocument()
    })

    it('wraps label in a span for AccentGradient', () => {
      renderWithTheme(<SealTextButton.AccentGradient>Boost</SealTextButton.AccentGradient>)
      const btn = screen.getByRole('button')
      expect(btn.querySelector('span')).toBeInTheDocument()
    })

    it('renders gradient icon wrapper for Gradient with icon', () => {
      renderWithTheme(<SealTextButton.Gradient icon={Telescope}>Explore</SealTextButton.Gradient>)
      expect(document.querySelector('linearGradient')).toBeInTheDocument()
    })

    it('injects linearGradient with fallback diagonal coords in JSDOM', () => {
      renderWithTheme(<SealTextButton.Gradient icon={Telescope}>Explore</SealTextButton.Gradient>)
      const grad = document.querySelector('linearGradient')
      expect(grad).toBeInTheDocument()
      expect(grad?.getAttribute('gradientUnits')).toBe('userSpaceOnUse')
      expect(grad?.getAttribute('x1')).toBe('0')
      expect(grad?.getAttribute('y1')).toBe('0')
      expect(grad?.getAttribute('x2')).toBe('24')
      expect(grad?.getAttribute('y2')).toBe('24')
    })

    it('renders gradient icon for AccentGradient', () => {
      renderWithTheme(
        <SealTextButton.AccentGradient icon={Star}>Boost</SealTextButton.AccentGradient>,
      )
      expect(document.querySelector('linearGradient')).toBeInTheDocument()
    })

    it('renders plain icon for non-gradient sub-components', () => {
      renderWithTheme(<SealTextButton.Primary icon={ArrowRight}>Skip</SealTextButton.Primary>)
      expect(document.querySelector('linearGradient')).not.toBeInTheDocument()
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('renders gradient icon for Custom gradient with icon', () => {
      renderWithTheme(
        <SealTextButton.Custom gradient="linear-gradient(to right, #f00, #00f)" icon={Star}>
          Custom
        </SealTextButton.Custom>,
      )
      expect(document.querySelector('linearGradient')).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealTextButton.Primary onClick={handleClick}>Click me</SealTextButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealTextButton.Primary disabled onClick={handleClick}>
          Disabled
        </SealTextButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealTextButton.Primary loading onClick={handleClick}>
          Loading
        </SealTextButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('sets aria-busy when loading', () => {
      renderWithTheme(<SealTextButton.Primary loading>Wait</SealTextButton.Primary>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('disables the button when loading', () => {
      renderWithTheme(<SealTextButton.Primary loading>Processing</SealTextButton.Primary>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('hides the icon inside an invisible wrapper when loading', () => {
      renderWithTheme(
        <SealTextButton.Primary loading icon={ArrowRight}>
          Wait
        </SealTextButton.Primary>,
      )
      const svg = document.querySelector('.invisible svg')
      expect(svg).toBeInTheDocument()
    })

    it('preserves button dimensions during loading via invisible content overlay', () => {
      renderWithTheme(<SealTextButton.Primary loading>Loading text</SealTextButton.Primary>)
      const invisibleSpan = document.querySelector('.invisible')
      expect(invisibleSpan).toBeInTheDocument()
      expect(invisibleSpan).toHaveTextContent('Loading text')
    })

    it('suppresses underline wrapper during loading for Gradient', () => {
      renderWithTheme(<SealTextButton.Gradient loading>Explore</SealTextButton.Gradient>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('disabled state', () => {
    it('marks the button as disabled', () => {
      renderWithTheme(<SealTextButton.Primary disabled>Off</SealTextButton.Primary>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has an accessible name from its text content', () => {
      renderWithTheme(<SealTextButton.Primary>Go back</SealTextButton.Primary>)
      expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument()
    })

    it('accepts an aria-label override', () => {
      renderWithTheme(
        <SealTextButton.Primary aria-label="Navigate to home">Home</SealTextButton.Primary>,
      )
      expect(screen.getByRole('button', { name: 'Navigate to home' })).toBeInTheDocument()
    })
  })
})
