import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '../../../../test/utils'

import { SealPopover, SealPopoverClose } from './SealPopover'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function openPopover(label = 'Open') {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: label }))
}

// ---------------------------------------------------------------------------
// SealPopover
// ---------------------------------------------------------------------------

describe('SealPopover', () => {
  it('renders the trigger without showing the panel', () => {
    renderWithTheme(
      <SealPopover trigger={<button>Open</button>}>
        <p>Content</p>
      </SealPopover>,
    )
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('shows panel content after trigger click', async () => {
    renderWithTheme(
      <SealPopover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </SealPopover>,
    )
    await openPopover()
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('closes when SealPopoverClose is activated', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <SealPopover trigger={<button>Open</button>}>
        <SealPopoverClose asChild>
          <button>Close</button>
        </SealPopoverClose>
      </SealPopover>,
    )
    await openPopover()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })

  it('works in controlled mode (open=true)', () => {
    const onOpenChange = vi.fn()
    renderWithTheme(
      <SealPopover open={true} onOpenChange={onOpenChange}>
        <p>Controlled content</p>
      </SealPopover>,
    )
    expect(screen.getByText('Controlled content')).toBeInTheDocument()
  })

  it('works in controlled mode (open=false)', () => {
    renderWithTheme(
      <SealPopover open={false}>
        <p>Hidden content</p>
      </SealPopover>,
    )
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it.each(['top', 'right', 'bottom', 'left'] as const)(
    'renders with side="%s" and opens correctly',
    async (side) => {
      renderWithTheme(
        <SealPopover side={side} trigger={<button>Open</button>}>
          <p>Side content</p>
        </SealPopover>,
      )
      await openPopover()
      expect(screen.getByText('Side content')).toBeInTheDocument()
    },
  )

  it.each(['start', 'center', 'end'] as const)(
    'renders with align="%s" and opens correctly',
    async (align) => {
      renderWithTheme(
        <SealPopover align={align} trigger={<button>Open</button>}>
          <p>Aligned content</p>
        </SealPopover>,
      )
      await openPopover()
      expect(screen.getByText('Aligned content')).toBeInTheDocument()
    },
  )
})

// ---------------------------------------------------------------------------
// displayName
// ---------------------------------------------------------------------------

describe('SealPopover displayName', () => {
  it('has correct displayName', () => {
    expect(SealPopover.displayName).toBe('SealPopover')
  })
})
