import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealDialog, SealDialogClose } from './SealDialog'

import { SealFilledButton } from '@/components/buttons/SealFilledButton/SealFilledButton'
import { SealOutlineButton } from '@/components/buttons/SealOutlineButton/SealOutlineButton'

// ---------------------------------------------------------------------------
// Shared class for trigger buttons (native element — asChild-safe)
// ---------------------------------------------------------------------------

const TRIGGER_CLASS =
  'py-dimension-xs px-dimension-md border border-[var(--seal-border-default)] rounded-sm bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] cursor-pointer'

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
      trigger={<button className={TRIGGER_CLASS}>Edit profile</button>}
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
      trigger={<button className={TRIGGER_CLASS}>Open with content</button>}
      title="Profile details"
      description="Your current account information."
      actions={
        <SealDialogClose asChild>
          <SealOutlineButton.Primary>Close</SealOutlineButton.Primary>
        </SealDialogClose>
      }
    >
      <div className="p-dimension-md bg-[var(--seal-surface-background)] rounded-sm text-[var(--seal-text-secondary)] text-style-small">
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
      trigger={<button className={TRIGGER_CLASS}>Delete account</button>}
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
        className={TRIGGER_CLASS}
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
