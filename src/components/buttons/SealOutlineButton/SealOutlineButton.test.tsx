import { fireEvent, screen } from '@testing-library/react'
import { Star } from 'lucide-react'

import { renderWithTheme } from '../../../../test/utils'

import { SealOutlineButton } from './SealOutlineButton'

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
      expect(btn).toHaveStyle({ background: 'linear-gradient(to right, #f00, #00f)' })
    })

    it('applies primary gradient background token', () => {
      renderWithTheme(<SealOutlineButton variant="gradient">Explore</SealOutlineButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        background: 'var(--seal-gradient-primary)',
      })
    })

    it('applies accent gradient background token', () => {
      renderWithTheme(<SealOutlineButton variant="accent-gradient">Boost</SealOutlineButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        background: 'var(--seal-gradient-accent)',
      })
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
})
