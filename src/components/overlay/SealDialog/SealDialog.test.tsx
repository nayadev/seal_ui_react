import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '../../../../test/utils'

import { SealDialog, SealDialogClose } from './SealDialog'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function openDialog(label = 'Open') {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: label }))
}

// ---------------------------------------------------------------------------
// SealDialog.Default
// ---------------------------------------------------------------------------

describe('SealDialog.Default', () => {
  it('renders the trigger without opening the dialog', () => {
    renderWithTheme(
      <SealDialog.Default
        trigger={<button>Open</button>}
        title="Edit profile"
        description="Make changes here."
      />,
    )
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens and shows title and description after trigger click', async () => {
    renderWithTheme(
      <SealDialog.Default
        trigger={<button>Open</button>}
        title="Edit profile"
        description="Make changes here."
      />,
    )
    await openDialog()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Edit profile')).toBeInTheDocument()
    expect(screen.getByText('Make changes here.')).toBeInTheDocument()
  })

  it('renders arbitrary children inside the dialog body', async () => {
    renderWithTheme(
      <SealDialog.Default trigger={<button>Open</button>} title="Details">
        <span>Custom content</span>
      </SealDialog.Default>,
    )
    await openDialog()
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('renders action buttons in the footer', async () => {
    renderWithTheme(
      <SealDialog.Default
        trigger={<button>Open</button>}
        title="Confirm"
        actions={<button>Save</button>}
      />,
    )
    await openDialog()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('closes the dialog when SealDialogClose is activated', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <SealDialog.Default
        trigger={<button>Open</button>}
        title="Confirm"
        actions={
          <SealDialogClose asChild>
            <button>Cancel</button>
          </SealDialogClose>
        }
      />,
    )
    await openDialog()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('works in controlled mode', () => {
    const onOpenChange = vi.fn()
    renderWithTheme(
      <SealDialog.Default open={true} onOpenChange={onOpenChange} title="Controlled" />,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders without title or description', async () => {
    renderWithTheme(
      <SealDialog.Default trigger={<button>Open</button>}>
        <p>Body only</p>
      </SealDialog.Default>,
    )
    await openDialog()
    expect(screen.getByText('Body only')).toBeInTheDocument()
  })

  it('has accessible role="dialog"', async () => {
    renderWithTheme(
      <SealDialog.Default trigger={<button>Open</button>} title="Accessible dialog" />,
    )
    await openDialog()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// SealDialog.Alert
// ---------------------------------------------------------------------------

describe('SealDialog.Alert', () => {
  it('renders alert dialog with title and description', async () => {
    renderWithTheme(
      <SealDialog.Alert
        trigger={<button>Delete</button>}
        title="Are you sure?"
        description="This cannot be undone."
      />,
    )
    await openDialog('Delete')
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument()
  })

  it('renders action buttons in the alert footer', async () => {
    renderWithTheme(
      <SealDialog.Alert
        trigger={<button>Delete</button>}
        title="Confirm"
        actions={<button>Confirm delete</button>}
      />,
    )
    await openDialog('Delete')
    expect(screen.getByRole('button', { name: 'Confirm delete' })).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// displayName
// ---------------------------------------------------------------------------

describe('SealDialog displayNames', () => {
  it('Default has correct displayName', () => {
    expect(SealDialog.Default.displayName).toBe('SealDialog.Default')
  })

  it('Alert has correct displayName', () => {
    expect(SealDialog.Alert.displayName).toBe('SealDialog.Alert')
  })
})
