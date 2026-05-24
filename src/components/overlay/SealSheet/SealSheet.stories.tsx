import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealSheet, SealSheetClose } from './SealSheet'

import { SealFilledButton } from '@/components/buttons/SealFilledButton/SealFilledButton'
import { SealOutlineButton } from '@/components/buttons/SealOutlineButton/SealOutlineButton'

// ---------------------------------------------------------------------------
// Shared style constant for trigger buttons (native element — asChild-safe)
// ---------------------------------------------------------------------------

const TEXT_PRIMARY = 'var(--seal-text-primary)'

const triggerStyle: React.CSSProperties = {
  padding: '8px 20px',
  border: '1px solid var(--seal-border-default)',
  borderRadius: 'var(--seal-radius-sm)',
  background: 'var(--seal-surface-surface)',
  color: TEXT_PRIMARY,
  cursor: 'pointer',
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Overlay/SealSheet',
  component: SealSheet,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
} satisfies Meta<typeof SealSheet>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <SealSheet
      side="right"
      trigger={<button style={triggerStyle}>Open settings</button>}
      title="Settings"
      description="Adjust your account preferences."
      actions={
        <>
          <SealSheetClose asChild>
            <SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>
          </SealSheetClose>
          <SealFilledButton.Primary>Save</SealFilledButton.Primary>
        </>
      }
    />
  ),
}

export const LeftSide: Story = {
  render: () => (
    <SealSheet
      side="left"
      trigger={<button style={triggerStyle}>Open from left</button>}
      title="Navigation"
      description="Browse sections."
      actions={
        <SealSheetClose asChild>
          <SealOutlineButton.Primary>Close</SealOutlineButton.Primary>
        </SealSheetClose>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seal-dimension-sm)' }}>
        <p style={{ color: TEXT_PRIMARY, margin: 0 }}>Dashboard</p>
        <p style={{ color: TEXT_PRIMARY, margin: 0 }}>Profile</p>
        <p style={{ color: TEXT_PRIMARY, margin: 0 }}>Settings</p>
      </div>
    </SealSheet>
  ),
}

export const BottomSheet: Story = {
  render: () => (
    <SealSheet
      side="bottom"
      trigger={<button style={triggerStyle}>Open from bottom</button>}
      title="Choose an option"
      description="Select one of the available actions."
      actions={
        <>
          <SealSheetClose asChild>
            <SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>
          </SealSheetClose>
          <SealFilledButton.Primary>Confirm</SealFilledButton.Primary>
        </>
      }
    />
  ),
}

export const WithChildren: Story = {
  render: () => (
    <SealSheet
      side="right"
      trigger={<button style={triggerStyle}>Open with content</button>}
      title="Account details"
      description="Your current account information."
      actions={
        <SealSheetClose asChild>
          <SealOutlineButton.Primary>Close</SealOutlineButton.Primary>
        </SealSheetClose>
      }
    >
      <div
        style={{
          padding: 'var(--seal-dimension-md)',
          background: 'var(--seal-surface-surface-alt)',
          borderRadius: 'var(--seal-radius-sm)',
          color: 'var(--seal-text-secondary)',
          fontSize: '0.875rem',
        }}
      >
        Name: Jane Doe
        <br />
        Email: jane@example.com
      </div>
    </SealSheet>
  ),
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
}

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
      <SealSheet
        open={open}
        onOpenChange={setOpen}
        title="Controlled sheet"
        description="This sheet is controlled externally."
        actions={
          <SealFilledButton.Primary
            onClick={() => {
              setOpen(false)
            }}
          >
            Done
          </SealFilledButton.Primary>
        }
      />
    </>
  )
}
