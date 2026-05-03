import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info } from 'lucide-react'

import { SealTooltip } from './SealTooltip'

const meta = {
  title: 'Interaction/SealTooltip',
  component: SealTooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    delayDuration: { control: { type: 'number', min: 0, max: 2000, step: 50 } },
    sideOffset: { control: { type: 'number', min: 0, max: 32 } },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof SealTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'Delete item',
    children: (
      <button className="px-4 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
        Hover me
      </button>
    ),
  },
}

export const SideBottom: Story = {
  name: 'Side — Bottom',
  args: {
    content: 'Appears below',
    side: 'bottom',
    children: (
      <button className="px-4 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
        Hover me
      </button>
    ),
  },
}

export const SideLeft: Story = {
  name: 'Side — Left',
  args: {
    content: 'Appears to the left',
    side: 'left',
    children: (
      <button className="px-4 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
        Hover me
      </button>
    ),
  },
}

export const SideRight: Story = {
  name: 'Side — Right',
  args: {
    content: 'Appears to the right',
    side: 'right',
    children: (
      <button className="px-4 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
        Hover me
      </button>
    ),
  },
}

export const WithCustomContent: Story = {
  name: 'Custom Content',
  args: {
    content: (
      <span>
        Keyboard shortcut:{' '}
        <kbd className="px-1 rounded bg-[var(--seal-surface-surface-alt)] text-[var(--seal-text-primary)]">
          ⌘K
        </kbd>
      </span>
    ),
    children: (
      <button
        aria-label="Open command palette"
        className="flex items-center gap-[var(--seal-dimension-xxs)] px-3 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]"
      >
        <Info size={16} />
        Open palette
      </button>
    ),
  },
}

export const InstantDelay: Story = {
  name: 'Instant (No Delay)',
  args: {
    content: 'Appears instantly',
    delayDuration: 0,
    children: (
      <button className="px-4 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
        Hover me
      </button>
    ),
  },
}

export const AllSides: Story = {
  args: {
    content: 'Tooltip',
    children: <button>Hover</button>,
  },
  render: () => (
    <div className="grid grid-cols-3 place-items-center gap-[var(--seal-dimension-xxl)] p-[var(--seal-dimension-xxl)]">
      <div />
      <SealTooltip content="Top" side="top">
        <button className="px-3 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
          Top
        </button>
      </SealTooltip>
      <div />

      <SealTooltip content="Left" side="left">
        <button className="px-3 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
          Left
        </button>
      </SealTooltip>
      <div className="w-12 h-12 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface-alt)] border border-[var(--seal-border-default)]" />
      <SealTooltip content="Right" side="right">
        <button className="px-3 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
          Right
        </button>
      </SealTooltip>

      <div />
      <SealTooltip content="Bottom" side="bottom">
        <button className="px-3 py-2 rounded-[var(--seal-radius-sm)] bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)] text-sm border border-[var(--seal-border-default)]">
          Bottom
        </button>
      </SealTooltip>
      <div />
    </div>
  ),
}
