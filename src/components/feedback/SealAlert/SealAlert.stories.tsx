import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealAlert } from './SealAlert'

const meta = {
  title: 'Feedback/SealAlert',
  component: SealAlert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof SealAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Heads up!',
    description: 'You can add components using the CLI.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Heads up!',
    description: 'You can add components using the CLI.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Profile updated',
    description: 'Your changes have been saved successfully.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Low storage',
    description: 'You have less than 1 GB remaining.',
  },
}

export const ErrorVariant: Story = {
  name: 'Error',
  args: {
    variant: 'error',
    title: 'Upload failed',
    description: 'The file could not be uploaded. Please try again.',
  },
}

export const WithoutTitle: Story = {
  args: {
    variant: 'error',
    description: 'Upload failed. Please try again.',
  },
}

export const AllVariants: Story = {
  args: {
    variant: 'info',
    description: 'See all variants below.',
  },
  render: () => (
    <div className="flex flex-col gap-[var(--seal-dimension-md)] w-[420px]">
      <SealAlert
        variant="info"
        title="Heads up!"
        description="You can add components using the CLI."
      />
      <SealAlert
        variant="success"
        title="Profile updated"
        description="Your changes have been saved successfully."
      />
      <SealAlert
        variant="warning"
        title="Low storage"
        description="You have less than 1 GB remaining."
      />
      <SealAlert
        variant="error"
        title="Upload failed"
        description="The file could not be uploaded. Please try again."
      />
    </div>
  ),
}
