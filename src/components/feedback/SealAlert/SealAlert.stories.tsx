import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealAlert } from './SealAlert'

const meta = {
  title: 'Feedback/SealAlert',
  component: SealAlert.Info,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof SealAlert.Info>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Heads up!',
    description: 'You can add components using the CLI.',
  },
}

export const InfoVariant: Story = {
  name: 'Info',
  args: { title: 'Heads up!', description: 'You can add components using the CLI.' },
  render: (args) => <SealAlert.Info {...args} />,
}

export const SuccessVariant: Story = {
  name: 'Success',
  args: { title: 'Profile updated', description: 'Your changes have been saved successfully.' },
  render: (args) => <SealAlert.Success {...args} />,
}

export const WarningVariant: Story = {
  name: 'Warning',
  args: { title: 'Low storage', description: 'You have less than 1 GB remaining.' },
  render: (args) => <SealAlert.Warning {...args} />,
}

export const ErrorVariant: Story = {
  name: 'Error',
  args: {
    title: 'Upload failed',
    description: 'The file could not be uploaded. Please try again.',
  },
  render: (args) => <SealAlert.Error {...args} />,
}

export const WithoutTitle: Story = {
  args: { description: 'Upload failed. Please try again.' },
  render: (args) => <SealAlert.Error {...args} />,
}

export const AllVariants: Story = {
  args: { description: 'See all variants below.' },
  render: () => (
    <div className="flex flex-col gap-[var(--seal-dimension-md)] w-[420px]">
      <SealAlert.Info title="Heads up!" description="You can add components using the CLI." />
      <SealAlert.Success
        title="Profile updated"
        description="Your changes have been saved successfully."
      />
      <SealAlert.Warning title="Low storage" description="You have less than 1 GB remaining." />
      <SealAlert.Error
        title="Upload failed"
        description="The file could not be uploaded. Please try again."
      />
    </div>
  ),
}
