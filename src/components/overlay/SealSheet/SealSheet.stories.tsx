import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealSheet, SealSheetClose } from './SealSheet'

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
      trigger={<button className={TRIGGER_CLASS}>Open settings</button>}
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
      trigger={<button className={TRIGGER_CLASS}>Open from left</button>}
      title="Navigation"
      description="Browse sections."
      actions={
        <SealSheetClose asChild>
          <SealOutlineButton.Primary>Close</SealOutlineButton.Primary>
        </SealSheetClose>
      }
    >
      <div className="flex flex-col gap-dimension-sm">
        <p className="text-[var(--seal-text-primary)] m-0">Dashboard</p>
        <p className="text-[var(--seal-text-primary)] m-0">Profile</p>
        <p className="text-[var(--seal-text-primary)] m-0">Settings</p>
      </div>
    </SealSheet>
  ),
}

export const BottomSheet: Story = {
  render: () => (
    <SealSheet
      side="bottom"
      trigger={<button className={TRIGGER_CLASS}>Open from bottom</button>}
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
      trigger={<button className={TRIGGER_CLASS}>Open with content</button>}
      title="Account details"
      description="Your current account information."
      actions={
        <SealSheetClose asChild>
          <SealOutlineButton.Primary>Close</SealOutlineButton.Primary>
        </SealSheetClose>
      }
    >
      <div className="p-dimension-md bg-[var(--seal-surface-surface-alt)] rounded-sm text-[var(--seal-text-secondary)] text-style-small">
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
        className={TRIGGER_CLASS}
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
