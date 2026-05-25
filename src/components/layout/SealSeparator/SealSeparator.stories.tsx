import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealSeparator } from './SealSeparator'

const meta = {
  title: 'Layout/SealSeparator',
  component: SealSeparator.Horizontal,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    decorative: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof SealSeparator.Horizontal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="p-dimension-md">
      <p className="text-[var(--seal-text-primary)] mt-0 mb-dimension-sm">Section A</p>
      <SealSeparator />
      <p className="text-[var(--seal-text-primary)] mt-dimension-sm mb-0">Section B</p>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealSeparator />`,
      },
    },
  },
}

export const Horizontal: Story = {
  render: () => (
    <div className="p-dimension-md">
      <p className="text-[var(--seal-text-primary)] mt-0 mb-dimension-sm">Above</p>
      <SealSeparator.Horizontal />
      <p className="text-[var(--seal-text-primary)] mt-dimension-sm mb-0">Below</p>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealSeparator.Horizontal />`,
      },
    },
  },
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-dimension-md p-dimension-md" style={{ height: '40px' }}>
      <span className="text-[var(--seal-text-primary)]">Left</span>
      <SealSeparator.Vertical className="h-full" />
      <span className="text-[var(--seal-text-primary)]">Right</span>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
  <span>Left</span>
  <SealSeparator.Vertical className="h-full" />
  <span>Right</span>
</div>`,
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-dimension-xl">
      <div>
        <p className="text-[var(--seal-text-secondary)] mt-0 mb-dimension-sm text-style-small">
          Horizontal
        </p>
        <SealSeparator.Horizontal />
      </div>

      <div>
        <p className="text-[var(--seal-text-secondary)] mt-0 mb-dimension-sm text-style-small">
          Vertical (inside flex row)
        </p>
        <div className="flex items-center gap-dimension-md h-dimension-xl">
          <span className="text-[var(--seal-text-primary)]">Left</span>
          <SealSeparator.Vertical className="h-full" />
          <span className="text-[var(--seal-text-primary)]">Right</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealSeparator.Horizontal />

<div style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
  <span>Left</span>
  <SealSeparator.Vertical className="h-full" />
  <span>Right</span>
</div>`,
      },
    },
  },
}
