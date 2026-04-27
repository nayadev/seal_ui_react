import { fireEvent, screen } from '@testing-library/react'
import { Star } from 'lucide-react'

import { renderWithTheme } from '../../../../test/utils'

import { SealFilledButton } from './SealFilledButton'

describe('SealFilledButton', () => {
  describe('rendering', () => {
    it('renders without errors', () => {
      renderWithTheme(<SealFilledButton.Primary>Submit</SealFilledButton.Primary>)
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    })

    it('renders children as the button label', () => {
      renderWithTheme(<SealFilledButton.Primary>Get Started</SealFilledButton.Primary>)
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })

    it('renders the leading icon when provided', () => {
      renderWithTheme(<SealFilledButton.Primary icon={Star}>Favorite</SealFilledButton.Primary>)
      expect(screen.getByText('Favorite')).toBeInTheDocument()
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      renderWithTheme(
        <SealFilledButton.Primary className="my-custom-class">Go</SealFilledButton.Primary>,
      )
      expect(screen.getByRole('button')).toHaveClass('my-custom-class')
    })
  })

  describe('compound sub-components', () => {
    it('renders Primary without errors', () => {
      renderWithTheme(<SealFilledButton.Primary>Label</SealFilledButton.Primary>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders Accent without errors', () => {
      renderWithTheme(<SealFilledButton.Accent>Label</SealFilledButton.Accent>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders AccentSecondary without errors', () => {
      renderWithTheme(<SealFilledButton.AccentSecondary>Label</SealFilledButton.AccentSecondary>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders Gradient with primary gradient background token', () => {
      renderWithTheme(<SealFilledButton.Gradient>Launch</SealFilledButton.Gradient>)
      expect(screen.getByRole('button')).toHaveStyle({ background: 'var(--seal-gradient-primary)' })
    })

    it('renders AccentGradient with accent gradient background token', () => {
      renderWithTheme(<SealFilledButton.AccentGradient>Boost</SealFilledButton.AccentGradient>)
      expect(screen.getByRole('button')).toHaveStyle({ background: 'var(--seal-gradient-accent)' })
    })

    it('renders Custom with a solid color', () => {
      renderWithTheme(<SealFilledButton.Custom color="#e53935">Delete</SealFilledButton.Custom>)
      const btn = screen.getByRole('button')
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveStyle({ background: '#e53935' })
    })

    it('renders Custom with a gradient', () => {
      renderWithTheme(
        <SealFilledButton.Custom gradient="linear-gradient(to right, #f00, #00f)">
          Custom
        </SealFilledButton.Custom>,
      )
      expect(screen.getByRole('button')).toHaveStyle({
        background: 'linear-gradient(to right, #f00, #00f)',
      })
    })
  })

  describe('interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealFilledButton.Primary onClick={handleClick}>Click me</SealFilledButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealFilledButton.Primary disabled onClick={handleClick}>
          Disabled
        </SealFilledButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealFilledButton.Primary loading onClick={handleClick}>
          Loading
        </SealFilledButton.Primary>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('sets aria-busy when loading', () => {
      renderWithTheme(<SealFilledButton.Primary loading>Wait</SealFilledButton.Primary>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('hides the icon inside an invisible wrapper when loading', () => {
      renderWithTheme(
        <SealFilledButton.Primary loading icon={Star}>
          Wait
        </SealFilledButton.Primary>,
      )
      const svg = document.querySelector('.invisible svg')
      expect(svg).toBeInTheDocument()
    })

    it('disables the button when loading', () => {
      renderWithTheme(<SealFilledButton.Primary loading>Processing</SealFilledButton.Primary>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('disabled state', () => {
    it('marks the button as disabled', () => {
      renderWithTheme(<SealFilledButton.Primary disabled>Off</SealFilledButton.Primary>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has an accessible name from its text content', () => {
      renderWithTheme(<SealFilledButton.Primary>Confirm action</SealFilledButton.Primary>)
      expect(screen.getByRole('button', { name: 'Confirm action' })).toBeInTheDocument()
    })

    it('accepts an aria-label override', () => {
      renderWithTheme(
        <SealFilledButton.Primary aria-label="Submit the form">Submit</SealFilledButton.Primary>,
      )
      expect(screen.getByRole('button', { name: 'Submit the form' })).toBeInTheDocument()
    })
  })
})
