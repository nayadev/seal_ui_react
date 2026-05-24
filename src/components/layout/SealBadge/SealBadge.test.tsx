import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealBadge } from './SealBadge'

describe('SealBadge', () => {
  describe('rendering', () => {
    it('renders with minimal props', () => {
      renderWithTheme(<SealBadge>New</SealBadge>)
      expect(screen.getByText('New')).toBeInTheDocument()
    })
  })

  describe('variants', () => {
    it.each(['primary', 'accent', 'secondary', 'outline', 'success', 'warning', 'error'] as const)(
      'renders %s variant without crashing',
      (variant) => {
        renderWithTheme(<SealBadge variant={variant}>{variant}</SealBadge>)
        expect(screen.getByText(variant)).toBeInTheDocument()
      },
    )

    it('renders SealBadge.Primary sub-component', () => {
      renderWithTheme(<SealBadge.Primary>New</SealBadge.Primary>)
      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('renders SealBadge.Accent sub-component', () => {
      renderWithTheme(<SealBadge.Accent>Beta</SealBadge.Accent>)
      expect(screen.getByText('Beta')).toBeInTheDocument()
    })

    it('renders SealBadge.Secondary sub-component', () => {
      renderWithTheme(<SealBadge.Secondary>Draft</SealBadge.Secondary>)
      expect(screen.getByText('Draft')).toBeInTheDocument()
    })

    it('renders SealBadge.Outline sub-component', () => {
      renderWithTheme(<SealBadge.Outline>v1.0</SealBadge.Outline>)
      expect(screen.getByText('v1.0')).toBeInTheDocument()
    })

    it('renders SealBadge.Success sub-component', () => {
      renderWithTheme(<SealBadge.Success>Active</SealBadge.Success>)
      expect(screen.getByText('Active')).toBeInTheDocument()
    })

    it('renders SealBadge.Warning sub-component', () => {
      renderWithTheme(<SealBadge.Warning>Pending</SealBadge.Warning>)
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })

    it('renders SealBadge.Error sub-component', () => {
      renderWithTheme(<SealBadge.Error>Expired</SealBadge.Error>)
      expect(screen.getByText('Expired')).toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithTheme(<SealBadge.Primary onClick={handleClick}>Click</SealBadge.Primary>)
      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('renders as <button> when onClick is provided', () => {
      renderWithTheme(<SealBadge onClick={() => undefined}>Clickable</SealBadge>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('does not render as <button> when onClick is absent', () => {
      renderWithTheme(<SealBadge>Static</SealBadge>)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('interactive badge has type="button"', () => {
      renderWithTheme(<SealBadge onClick={() => undefined}>Clickable</SealBadge>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })
  })

  describe('displayNames', () => {
    it('exports correct displayNames on sub-components', () => {
      expect(SealBadge.Primary.displayName).toBe('SealBadge.Primary')
      expect(SealBadge.Accent.displayName).toBe('SealBadge.Accent')
      expect(SealBadge.Secondary.displayName).toBe('SealBadge.Secondary')
      expect(SealBadge.Outline.displayName).toBe('SealBadge.Outline')
      expect(SealBadge.Success.displayName).toBe('SealBadge.Success')
      expect(SealBadge.Warning.displayName).toBe('SealBadge.Warning')
      expect(SealBadge.Error.displayName).toBe('SealBadge.Error')
    })
  })
})
