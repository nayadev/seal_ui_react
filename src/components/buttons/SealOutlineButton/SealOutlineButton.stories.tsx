import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket, Settings, Star, Telescope } from 'lucide-react'

import { SealOutlineButton } from './SealOutlineButton'

const meta = {
  title: 'Buttons/SealOutlineButton',
  component: SealOutlineButton.Primary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SealOutlineButton.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Cancel' },
}

export const Primary: Story = {
  render: (args) => <SealOutlineButton.Primary {...args}>Cancel</SealOutlineButton.Primary>,
}

export const Accent: Story = {
  render: (args) => <SealOutlineButton.Accent {...args}>Learn More</SealOutlineButton.Accent>,
}

export const AccentSecondary: Story = {
  render: (args) => (
    <SealOutlineButton.AccentSecondary {...args}>Details</SealOutlineButton.AccentSecondary>
  ),
}

export const Gradient: Story = {
  render: (args) => (
    <SealOutlineButton.Gradient icon={Telescope} {...args}>
      Explore
    </SealOutlineButton.Gradient>
  ),
}

export const AccentGradient: Story = {
  render: (args) => (
    <SealOutlineButton.AccentGradient icon={Star} {...args}>
      Boost
    </SealOutlineButton.AccentGradient>
  ),
}

export const CustomColor: Story = {
  render: (args) => (
    <SealOutlineButton.Custom color="#e53935" {...args}>
      Retry
    </SealOutlineButton.Custom>
  ),
}

export const CustomGradient: Story = {
  render: (args) => (
    <SealOutlineButton.Custom gradient="linear-gradient(to right, #7b2ff7, #f107a3)" {...args}>
      Special
    </SealOutlineButton.Custom>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <SealOutlineButton.Primary icon={Settings} {...args}>
      Settings
    </SealOutlineButton.Primary>
  ),
}

export const Loading: Story = {
  render: (args) => (
    <SealOutlineButton.Primary loading {...args}>
      Saving…
    </SealOutlineButton.Primary>
  ),
}

export const LoadingWithIcon: Story = {
  render: (args) => (
    <SealOutlineButton.Gradient loading icon={Rocket} {...args}>
      Launching
    </SealOutlineButton.Gradient>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <SealOutlineButton.Primary disabled {...args}>
      Unavailable
    </SealOutlineButton.Primary>
  ),
}

export const AllVariants: Story = {
  args: { loading: false, disabled: false },
  render: ({ loading = false, disabled = false }) => (
    <div className="flex flex-wrap gap-3">
      <SealOutlineButton.Primary loading={loading} disabled={disabled}>
        Primary
      </SealOutlineButton.Primary>
      <SealOutlineButton.Accent loading={loading} disabled={disabled}>
        Accent
      </SealOutlineButton.Accent>
      <SealOutlineButton.AccentSecondary loading={loading} disabled={disabled}>
        Accent Secondary
      </SealOutlineButton.AccentSecondary>
      <SealOutlineButton.Gradient icon={Telescope} loading={loading} disabled={disabled}>
        Gradient
      </SealOutlineButton.Gradient>
      <SealOutlineButton.AccentGradient icon={Star} loading={loading} disabled={disabled}>
        Accent Gradient
      </SealOutlineButton.AccentGradient>
      <SealOutlineButton.Custom color="#e53935" loading={loading} disabled={disabled}>
        Custom
      </SealOutlineButton.Custom>
    </div>
  ),
}
