import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket, Settings, Star } from 'lucide-react'

import { SealFilledButton } from './SealFilledButton'

const meta = {
  title: 'Buttons/SealFilledButton',
  component: SealFilledButton.Primary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SealFilledButton.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Get Started' },
}

export const Primary: Story = {
  render: (args) => <SealFilledButton.Primary {...args}>Confirm</SealFilledButton.Primary>,
}

export const Accent: Story = {
  render: (args) => <SealFilledButton.Accent {...args}>Continue</SealFilledButton.Accent>,
}

export const AccentSecondary: Story = {
  render: (args) => (
    <SealFilledButton.AccentSecondary {...args}>Learn More</SealFilledButton.AccentSecondary>
  ),
}

export const Gradient: Story = {
  render: (args) => (
    <SealFilledButton.Gradient icon={Rocket} {...args}>
      Launch
    </SealFilledButton.Gradient>
  ),
}

export const AccentGradient: Story = {
  render: (args) => (
    <SealFilledButton.AccentGradient icon={Star} {...args}>
      Boost
    </SealFilledButton.AccentGradient>
  ),
}

export const CustomColor: Story = {
  render: (args) => (
    <SealFilledButton.Custom color="#e53935" {...args}>
      Delete
    </SealFilledButton.Custom>
  ),
}

export const CustomGradient: Story = {
  render: (args) => (
    <SealFilledButton.Custom gradient="linear-gradient(to right, #7b2ff7, #f107a3)" {...args}>
      Special
    </SealFilledButton.Custom>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <SealFilledButton.Primary icon={Settings} {...args}>
      Settings
    </SealFilledButton.Primary>
  ),
}

export const Loading: Story = {
  render: (args) => (
    <SealFilledButton.Primary loading {...args}>
      Saving…
    </SealFilledButton.Primary>
  ),
}

export const LoadingWithIcon: Story = {
  render: (args) => (
    <SealFilledButton.Gradient loading icon={Rocket} {...args}>
      Launching
    </SealFilledButton.Gradient>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <SealFilledButton.Primary disabled {...args}>
      Unavailable
    </SealFilledButton.Primary>
  ),
}

export const AllVariants: Story = {
  args: { loading: false, disabled: false },
  render: ({ loading = false, disabled = false }) => (
    <div className="flex flex-wrap gap-3">
      <SealFilledButton.Primary loading={loading} disabled={disabled}>
        Primary
      </SealFilledButton.Primary>
      <SealFilledButton.Accent loading={loading} disabled={disabled}>
        Accent
      </SealFilledButton.Accent>
      <SealFilledButton.AccentSecondary loading={loading} disabled={disabled}>
        Accent Secondary
      </SealFilledButton.AccentSecondary>
      <SealFilledButton.Gradient icon={Rocket} loading={loading} disabled={disabled}>
        Gradient
      </SealFilledButton.Gradient>
      <SealFilledButton.AccentGradient icon={Star} loading={loading} disabled={disabled}>
        Accent Gradient
      </SealFilledButton.AccentGradient>
      <SealFilledButton.Custom color="#e53935" loading={loading} disabled={disabled}>
        Custom
      </SealFilledButton.Custom>
    </div>
  ),
}
