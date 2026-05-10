import { render, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealTooltip } from './SealTooltip'

// Radix Tooltip renders a styled container (data-side) and a visually-hidden
// aria span (role="tooltip"). CSS class assertions must target the styled div.
const getStyledContainer = () => document.body.querySelector('[data-side]')

describe('SealTooltip', () => {
  describe('rendering', () => {
    it('renders the trigger child', () => {
      renderWithTheme(
        <SealTooltip content="Delete item">
          <button>Trigger</button>
        </SealTooltip>,
      )
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
    })

    it('does not show content before interaction', () => {
      renderWithTheme(
        <SealTooltip content="Hidden tip">
          <button>Trigger</button>
        </SealTooltip>,
      )
      expect(screen.queryByText('Hidden tip')).not.toBeInTheDocument()
    })

    it('renders with minimum required props', () => {
      expect(() =>
        renderWithTheme(
          <SealTooltip content="tip">
            <button>x</button>
          </SealTooltip>,
        ),
      ).not.toThrow()
    })

    it('renders outside ThemeProvider without crashing', () => {
      expect(() =>
        render(
          <SealTooltip content="tip">
            <button>x</button>
          </SealTooltip>,
        ),
      ).not.toThrow()
    })
  })

  describe('controlled mode', () => {
    it('shows content when open=true', () => {
      renderWithTheme(
        <SealTooltip content="Visible tip" open>
          <button>Trigger</button>
        </SealTooltip>,
      )
      expect(document.body).toHaveTextContent('Visible tip')
    })

    it('hides content when open=false', () => {
      renderWithTheme(
        <SealTooltip content="Hidden tip" open={false}>
          <button>Trigger</button>
        </SealTooltip>,
      )
      expect(screen.queryByText('Hidden tip')).not.toBeInTheDocument()
    })

    it('calls onOpenChange when state changes', () => {
      const onOpenChange = vi.fn()
      renderWithTheme(
        <SealTooltip content="tip" open={false} onOpenChange={onOpenChange}>
          <button>Trigger</button>
        </SealTooltip>,
      )
      expect(onOpenChange).not.toHaveBeenCalled()
    })
  })

  describe('content', () => {
    it('renders plain text content when open', () => {
      renderWithTheme(
        <SealTooltip content="Plain text tip" open>
          <button>Trigger</button>
        </SealTooltip>,
      )
      expect(document.body).toHaveTextContent('Plain text tip')
    })

    it('renders rich ReactNode content when open', () => {
      renderWithTheme(
        <SealTooltip
          content={
            <span>
              Shortcut: <kbd>⌘K</kbd>
            </span>
          }
          open
        >
          <button>Trigger</button>
        </SealTooltip>,
      )
      // Content is duplicated in Radix (visible + hidden aria span) — getAllByText avoids "multiple found" error
      const matches = screen.getAllByText('⌘K')
      expect(matches.length).toBeGreaterThan(0)
    })
  })

  describe('CSS tokens', () => {
    it('applies Seal surface background token to tooltip container', () => {
      renderWithTheme(
        <SealTooltip content="tip" open>
          <button>Trigger</button>
        </SealTooltip>,
      )
      const container = getStyledContainer()
      expect(container?.getAttribute('class')).toContain('bg-[var(--seal-surface-surface)]')
    })

    it('applies Seal border token to tooltip container', () => {
      renderWithTheme(
        <SealTooltip content="tip" open>
          <button>Trigger</button>
        </SealTooltip>,
      )
      const container = getStyledContainer()
      expect(container?.getAttribute('class')).toContain('border-[var(--seal-border-default)]')
    })

    it('applies Seal radius-sm token to tooltip container', () => {
      renderWithTheme(
        <SealTooltip content="tip" open>
          <button>Trigger</button>
        </SealTooltip>,
      )
      const container = getStyledContainer()
      expect(container?.getAttribute('class')).toContain('rounded-[var(--seal-radius-sm)]')
    })

    it('forwards additional className to tooltip container', () => {
      renderWithTheme(
        <SealTooltip content="tip" open className="custom-class">
          <button>Trigger</button>
        </SealTooltip>,
      )
      const container = getStyledContainer()
      expect(container).toHaveClass('custom-class')
    })
  })

  describe('accessibility', () => {
    it('renders a hidden aria tooltip element when open', () => {
      renderWithTheme(
        <SealTooltip content="Accessible tip" open>
          <button>Trigger</button>
        </SealTooltip>,
      )
      expect(document.body.querySelector('[role="tooltip"]')).toBeInTheDocument()
    })

    it('trigger has aria-describedby pointing to tooltip when open', () => {
      renderWithTheme(
        <SealTooltip content="Accessible tip" open>
          <button>Trigger</button>
        </SealTooltip>,
      )
      const trigger = screen.getByRole('button', { name: 'Trigger' })
      expect(trigger).toHaveAttribute('aria-describedby')
    })
  })
})
