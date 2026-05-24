import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '../../../../test/utils'

import { SealSheet, SealSheetClose } from './SealSheet'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function openSheet(label = 'Open') {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: label }))
}

// ---------------------------------------------------------------------------
// SealSheet
// ---------------------------------------------------------------------------

describe('SealSheet', () => {
  it('renders the trigger without opening the sheet', () => {
    renderWithTheme(
      <SealSheet
        trigger={<button>Open</button>}
        title="Settings"
        description="Adjust your preferences."
      />,
    )
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens and shows title and description after trigger click', async () => {
    renderWithTheme(
      <SealSheet
        trigger={<button>Open</button>}
        title="Settings"
        description="Adjust your preferences."
      />,
    )
    await openSheet()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Adjust your preferences.')).toBeInTheDocument()
  })

  it('renders arbitrary children inside the sheet body', async () => {
    renderWithTheme(
      <SealSheet trigger={<button>Open</button>} title="Details">
        <span>Custom content</span>
      </SealSheet>,
    )
    await openSheet()
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('renders action buttons in the footer', async () => {
    renderWithTheme(
      <SealSheet trigger={<button>Open</button>} title="Confirm" actions={<button>Save</button>} />,
    )
    await openSheet()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('closes the sheet when SealSheetClose is activated', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <SealSheet
        trigger={<button>Open</button>}
        title="Confirm"
        actions={
          <SealSheetClose asChild>
            <button>Cancel</button>
          </SealSheetClose>
        }
      />,
    )
    await openSheet()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('works in controlled mode', () => {
    const onOpenChange = vi.fn()
    renderWithTheme(<SealSheet open={true} onOpenChange={onOpenChange} title="Controlled" />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders without title or description', async () => {
    renderWithTheme(
      <SealSheet trigger={<button>Open</button>}>
        <p>Body only</p>
      </SealSheet>,
    )
    await openSheet()
    expect(screen.getByText('Body only')).toBeInTheDocument()
  })

  it('has accessible role="dialog"', async () => {
    renderWithTheme(<SealSheet trigger={<button>Open</button>} title="Accessible sheet" />)
    await openSheet()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it.each(['top', 'right', 'bottom', 'left'] as const)(
    'renders with side="%s" and opens correctly',
    async (side) => {
      renderWithTheme(
        <SealSheet side={side} trigger={<button>Open</button>} title={`Sheet from ${side}`} />,
      )
      await openSheet()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    },
  )
})

// ---------------------------------------------------------------------------
// displayName
// ---------------------------------------------------------------------------

describe('SealSheet displayName', () => {
  it('has correct displayName', () => {
    expect(SealSheet.displayName).toBe('SealSheet')
  })
})
