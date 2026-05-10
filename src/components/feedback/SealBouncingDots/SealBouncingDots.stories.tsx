import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealBouncingDots } from './SealBouncingDots'

const meta = {
  title: 'Feedback/SealBouncingDots',
  component: SealBouncingDots,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    size: { control: { type: 'number', min: 2, max: 20, step: 1 } },
    spacing: { control: { type: 'number', min: 0, max: 20, step: 1 } },
  },
} satisfies Meta<typeof SealBouncingDots>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PrimaryColor: Story = {
  args: { color: 'var(--seal-brand-primary)' },
}

export const AccentColor: Story = {
  args: { color: 'var(--seal-accent-accent)' },
}

export const AccentSecondaryColor: Story = {
  args: { color: 'var(--seal-accent-accent-secondary)' },
}

export const LargeSize: Story = {
  args: { size: 10, spacing: 6 },
}

export const SmallSize: Story = {
  args: { size: 4, spacing: 3 },
}

export const WithAccessibility: Story = {
  args: {
    role: 'status',
    'aria-label': 'Loading',
    color: 'var(--seal-text-primary)',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <SealBouncingDots size={4} spacing={3} color="var(--seal-brand-primary)" />
      <SealBouncingDots size={6} spacing={4} color="var(--seal-brand-primary)" />
      <SealBouncingDots size={8} spacing={5} color="var(--seal-brand-primary)" />
      <SealBouncingDots size={10} spacing={6} color="var(--seal-brand-primary)" />
    </div>
  ),
}

export const AllTokenColors: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <SealBouncingDots color="var(--seal-brand-primary)" />
      <SealBouncingDots color="var(--seal-accent-accent)" />
      <SealBouncingDots color="var(--seal-accent-accent-secondary)" />
      <SealBouncingDots color="var(--seal-text-primary)" />
    </div>
  ),
}
