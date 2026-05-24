import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealDialog, SealDialogClose } from './SealDialog'

import { SealFilledButton } from '@/components/buttons/SealFilledButton/SealFilledButton'
import { SealOutlineButton } from '@/components/buttons/SealOutlineButton/SealOutlineButton'

// ---------------------------------------------------------------------------
// Shared style constant for trigger buttons (native element — asChild-safe)
// ---------------------------------------------------------------------------

const triggerStyle: React.CSSProperties = {
  padding: '8px 20px',
  border: '1px solid var(--seal-border-default)',
  borderRadius: 'var(--seal-radius-sm)',
  background: 'var(--seal-surface-surface)',
  color: 'var(--seal-text-primary)',
  cursor: 'pointer',
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Overlay/SealDialog',
  component: SealDialog.Default,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SealDialog.Default>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <SealDialog.Default
      trigger={<button style={triggerStyle}>Edit profile</button>}
      title="Edit profile"
      description="Make changes to your profile here. Click save when you're done."
      actions={
        <>
          <SealDialogClose asChild>
            <SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>
          </SealDialogClose>
          <SealFilledButton.Primary>Save</SealFilledButton.Primary>
        </>
      }
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SealDialog.Default
  trigger={<SealFilledButton.Primary>Edit profile</SealFilledButton.Primary>}
  title="Edit profile"
  description="Make changes to your profile here."
  actions={
    <>
      <SealDialogClose asChild>
        <SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>
      </SealDialogClose>
      <SealFilledButton.Primary onClick={handleSave}>Save</SealFilledButton.Primary>
    </>
  }
/>`,
      },
    },
  },
}

export const WithChildren: Story = {
  render: () => (
    <SealDialog.Default
      trigger={<button style={triggerStyle}>Open with content</button>}
      title="Profile details"
      description="Your current account information."
      actions={
        <SealDialogClose asChild>
          <SealOutlineButton.Primary>Close</SealOutlineButton.Primary>
        </SealDialogClose>
      }
    >
      <div
        style={{
          padding: 'var(--seal-dimension-md)',
          background: 'var(--seal-surface-background)',
          borderRadius: 'var(--seal-radius-sm)',
          color: 'var(--seal-text-secondary)',
          fontSize: '0.875rem',
        }}
      >
        Name: Jane Doe
        <br />
        Email: jane@example.com
      </div>
    </SealDialog.Default>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SealDialog.Default
  trigger={<SealFilledButton.Primary>Open</SealFilledButton.Primary>}
  title="Profile details"
  description="Your current account information."
  actions={
    <SealDialogClose asChild>
      <SealOutlineButton.Primary>Close</SealOutlineButton.Primary>
    </SealDialogClose>
  }
>
  <p>Custom content here.</p>
</SealDialog.Default>`,
      },
    },
  },
}

export const AlertVariant: Story = {
  render: () => (
    <SealDialog.Alert
      trigger={<button style={triggerStyle}>Delete account</button>}
      title="Are you sure?"
      description="This action cannot be undone. Your account and all associated data will be permanently deleted."
      actions={
        <>
          <SealDialogClose asChild>
            <SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>
          </SealDialogClose>
          <SealFilledButton.Custom color="var(--seal-semantic-error)">
            Delete
          </SealFilledButton.Custom>
        </>
      }
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SealDialog.Alert
  trigger={<SealFilledButton.Primary>Delete account</SealFilledButton.Primary>}
  title="Are you sure?"
  description="This action cannot be undone."
  actions={
    <>
      <SealDialogClose asChild>
        <SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>
      </SealDialogClose>
      <SealFilledButton.Custom color="var(--seal-semantic-error)">
        Delete
      </SealFilledButton.Custom>
    </>
  }
/>`,
      },
    },
  },
}

// Extracted into a proper React component so hooks rules are satisfied
function ControlledDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button
        style={triggerStyle}
        onClick={() => {
          setOpen(true)
        }}
      >
        Open (controlled)
      </button>
      <SealDialog.Default
        open={open}
        onOpenChange={setOpen}
        title="Controlled dialog"
        description="This dialog's open state is managed externally."
        actions={
          <SealOutlineButton.Primary
            onClick={() => {
              setOpen(false)
            }}
          >
            Close
          </SealOutlineButton.Primary>
        }
      />
    </>
  )
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
  parameters: {
    docs: {
      source: {
        code: `
const [open, setOpen] = useState(false)

<SealDialog.Default
  open={open}
  onOpenChange={setOpen}
  title="Controlled dialog"
  description="This dialog's open state is managed externally."
  actions={
    <SealOutlineButton.Primary onClick={() => setOpen(false)}>
      Close
    </SealOutlineButton.Primary>
  }
/>`,
      },
    },
  },
}
