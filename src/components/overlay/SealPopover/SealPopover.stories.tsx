import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealPopover, SealPopoverClose } from './SealPopover'

import { SealFilledButton } from '@/components/buttons/SealFilledButton/SealFilledButton'
import { SealOutlineButton } from '@/components/buttons/SealOutlineButton/SealOutlineButton'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const TEXT_PRIMARY = 'var(--seal-text-primary)'
const TEXT_SECONDARY = 'var(--seal-text-secondary)'

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seal-dimension-xs)' }}>
        <p style={{ margin: 0, fontWeight: 600, color: TEXT_PRIMARY }}>More information</p>
        <p style={{ margin: 0, color: TEXT_SECONDARY }}> anchored to its trigger.</p>
      </div>
    </SealPopover>
  ),
}

export const WithCloseButton: Story = {
  render: () => (
    <SealPopover trigger={<SealFilledButton.Primary>Open</SealFilledButton.Primary>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seal-dimension-sm)' }}>
        <p style={{ margin: 0, color: TEXT_PRIMARY }}>Click the button below to close.</p>
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
      <p style={{ margin: 0, color: TEXT_PRIMARY }}>Opens above the trigger.</p>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seal-dimension-xs)' }}>
        <p style={{ margin: 0, color: TEXT_PRIMARY }}>Controlled popover</p>
        <p style={{ margin: 0, color: TEXT_SECONDARY, fontSize: '0.75rem' }}>
          State is managed externally.
        </p>
      </div>
    </SealPopover>
  )
}
