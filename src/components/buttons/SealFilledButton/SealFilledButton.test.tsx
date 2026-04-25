import { fireEvent, screen } from '@testing-library/react'
import { Star } from 'lucide-react'

import { renderWithTheme } from '../../../../test/utils'

import { SealFilledButton } from './SealFilledButton'

describe('SealFilledButton', () => {
  describe('rendering', () => {
    it('renders without errors', () => {
      renderWithTheme(<SealFilledButton>Submit</SealFilledButton>)
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    })

    it('renders children as the button label', () => {
      renderWithTheme(<SealFilledButton>Get Started</SealFilledButton>)
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('renders the leading icon when provided', () => {
      renderWithTheme(
        <SealFilledButton icon={<Star data-testid="icon" size={16} />}>Favorite</SealFilledButton>,
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByText('Favorite')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      renderWithTheme(<SealFilledButton className="my-custom-class">Go</SealFilledButton>)
      expect(screen.getByRole('button')).toHaveClass('my-custom-class')
    })
  })

  describe('variants', () => {
    it.each(['primary', 'accent', 'accent-secondary', 'gradient', 'accent-gradient'] as const)(
      'renders %s variant without errors',
      (variant) => {
        renderWithTheme(<SealFilledButton variant={variant}>Label</SealFilledButton>)
        expect(screen.getByRole('button')).toBeInTheDocument()
      },
    )

    it('renders custom variant with a solid color', () => {
      renderWithTheme(
        <SealFilledButton variant="custom" color="#e53935">
          Delete
        </SealFilledButton>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveStyle({ background: '#e53935' })
    })

    it('renders custom variant with a gradient', () => {
      renderWithTheme(
        <SealFilledButton variant="custom" gradient="linear-gradient(to right, #f00, #00f)">
          Custom
        </SealFilledButton>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle({ background: 'linear-gradient(to right, #f00, #00f)' })
    })

    it('applies primary gradient background token', () => {
      renderWithTheme(<SealFilledButton variant="gradient">Launch</SealFilledButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        background: 'var(--seal-gradient-primary)',
      })
    })

    it('applies accent gradient background token', () => {
      renderWithTheme(<SealFilledButton variant="accent-gradient">Boost</SealFilledButton>)
      expect(screen.getByRole('button')).toHaveStyle({
        background: 'var(--seal-gradient-accent)',
      })
    })
  })

  describe('interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithTheme(<SealFilledButton onClick={handleClick}>Click me</SealFilledButton>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealFilledButton disabled onClick={handleClick}>
          Disabled
        </SealFilledButton>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealFilledButton loading onClick={handleClick}>
          Loading
        </SealFilledButton>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('sets aria-busy when loading', () => {
      renderWithTheme(<SealFilledButton loading>Wait</SealFilledButton>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('shows a spinner and hides the icon when loading', () => {
      renderWithTheme(
        <SealFilledButton loading icon={<Star data-testid="icon" size={16} />}>
          Wait
        </SealFilledButton>,
      )
      const icon = screen.getByTestId('icon')
      expect(icon.closest('.invisible')).not.toBeNull()
    })

    it('disables the button when loading', () => {
      renderWithTheme(<SealFilledButton loading>Processing</SealFilledButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('disabled state', () => {
    it('marks the button as disabled', () => {
      renderWithTheme(<SealFilledButton disabled>Off</SealFilledButton>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has an accessible name from its text content', () => {
      renderWithTheme(<SealFilledButton>Confirm action</SealFilledButton>)
      expect(screen.getByRole('button', { name: 'Confirm action' })).toBeInTheDocument()
    })

    it('accepts an aria-label override', () => {
      renderWithTheme(<SealFilledButton aria-label="Submit the form">Submit</SealFilledButton>)
      expect(screen.getByRole('button', { name: 'Submit the form' })).toBeInTheDocument()
    })
  })
})
