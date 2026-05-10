import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealLoader } from './SealLoader'

const meta = {
  title: 'Feedback/SealLoader',
  component: SealLoader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: { control: 'text' },
    strokeWidth: { control: 'number' },
    label: { control: 'text' },
    'aria-label': { control: 'text' },
  },
} satisfies Meta<typeof SealLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: { size: 'small' },
}

export const Medium: Story = {
  args: { size: 'medium' },
}

export const Large: Story = {
  args: { size: 'large' },
}

export const WithLabel: Story = {
  args: {
    size: 'medium',
    label: 'Loading…',
  },
}

export const WithLabelLarge: Story = {
  name: 'Large with Label',
  args: {
    size: 'large',
    label: 'Syncing your data…',
  },
}

export const CustomColor: Story = {
  args: {
    size: 'medium',
    color: 'var(--seal-semantic-success)',
  },
}

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-[var(--seal-dimension-xl)]">
      <SealLoader size="small" aria-label="Small loader" />
      <SealLoader size="medium" aria-label="Medium loader" />
      <SealLoader size="large" aria-label="Large loader" />
    </div>
  ),
}

export const AllSizesWithLabels: Story = {
  args: {},
  render: () => (
    <div className="flex items-end gap-[var(--seal-dimension-xl)]">
      <SealLoader size="small" label="Small" />
      <SealLoader size="medium" label="Medium" />
      <SealLoader size="large" label="Large" />
    </div>
  ),
}
