import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealProgress } from './SealProgress'

const meta = {
  title: 'Feedback/SealProgress',
  component: SealProgress.Primary,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof SealProgress.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 60, 'aria-label': 'Upload progress' },
}

export const PrimaryVariant: Story = {
  name: 'Primary',
  args: { value: 60 },
  render: (args) => <SealProgress.Primary {...args} />,
}

export const AccentVariant: Story = {
  name: 'Accent',
  args: { value: 40 },
  render: (args) => <SealProgress.Accent {...args} />,
}

export const Indeterminate: Story = {
  args: {},
  render: () => (
    <div className="w-[400px]">
      <SealProgress.Primary />
    </div>
  ),
}

export const IndeterminateAccent: Story = {
  name: 'Indeterminate (Accent)',
  args: {},
  render: () => (
    <div className="w-[400px]">
      <SealProgress.Accent />
    </div>
  ),
}

export const AllVariants: Story = {
  args: { value: 60 },
  render: ({ value }) => {
    const progress = value ?? 60
    return (
      <div className="flex flex-col gap-[var(--seal-dimension-lg)] w-[400px]">
        <div className="flex flex-col gap-[var(--seal-dimension-xs)]">
          <span className="text-[var(--seal-text-secondary)] text-sm">Primary — determinate</span>
          <SealProgress.Primary value={progress} />
        </div>
        <div className="flex flex-col gap-[var(--seal-dimension-xs)]">
          <span className="text-[var(--seal-text-secondary)] text-sm">Accent — determinate</span>
          <SealProgress.Accent value={progress} />
        </div>
        <div className="flex flex-col gap-[var(--seal-dimension-xs)]">
          <span className="text-[var(--seal-text-secondary)] text-sm">Primary — indeterminate</span>
          <SealProgress.Primary />
        </div>
        <div className="flex flex-col gap-[var(--seal-dimension-xs)]">
          <span className="text-[var(--seal-text-secondary)] text-sm">Accent — indeterminate</span>
          <SealProgress.Accent />
        </div>
      </div>
    )
  },
}
