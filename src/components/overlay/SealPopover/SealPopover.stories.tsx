import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealPopover, SealPopoverClose } from './SealPopover'

import { SealFilledButton } from '@/components/buttons/SealFilledButton/SealFilledButton'
import { SealOutlineButton } from '@/components/buttons/SealOutlineButton/SealOutlineButton'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Overlay/SealPopover',
  component: SealPopover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
} satisfies Meta<typeof SealPopover>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <SealPopover trigger={<SealFilledButton.Primary>Open popover</SealFilledButton.Primary>}>
      <div className="flex flex-col gap-dimension-xs">
        <p className="m-0 font-style-subtitle text-[var(--seal-text-primary)]">More information</p>
        <p className="m-0 text-[var(--seal-text-secondary)]"> anchored to its trigger.</p>
      </div>
    </SealPopover>
  ),
}

export const WithCloseButton: Story = {
  render: () => (
    <SealPopover trigger={<SealFilledButton.Primary>Open</SealFilledButton.Primary>}>
      <div className="flex flex-col gap-dimension-sm">
        <p className="m-0 text-[var(--seal-text-primary)]">Click the button below to close.</p>
        <SealPopoverClose asChild>
          <SealOutlineButton.Primary>Dismiss</SealOutlineButton.Primary>
        </SealPopoverClose>
      </div>
    </SealPopover>
  ),
}

export const TopSide: Story = {
  render: () => (
    <SealPopover
      side="top"
      trigger={<SealFilledButton.Primary>Open above</SealFilledButton.Primary>}
    >
      <p className="m-0 text-[var(--seal-text-primary)]">Opens above the trigger.</p>
    </SealPopover>
  ),
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
}

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <SealPopover
      open={open}
      onOpenChange={setOpen}
      trigger={<SealFilledButton.Primary>Toggle popover</SealFilledButton.Primary>}
    >
      <div className="flex flex-col gap-dimension-xs">
        <p className="m-0 text-[var(--seal-text-primary)]">Controlled popover</p>
        <p className="m-0 text-[var(--seal-text-secondary)] text-style-small">
          State is managed externally.
        </p>
      </div>
    </SealPopover>
  )
}
