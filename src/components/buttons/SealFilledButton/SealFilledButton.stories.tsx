import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket, Settings, Star } from 'lucide-react'

import { SealFilledButton } from './SealFilledButton'

const meta = {
  title: 'Buttons/SealFilledButton',
  component: SealFilledButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent', 'accent-secondary', 'gradient', 'accent-gradient', 'custom'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: { control: 'color', if: { arg: 'variant', eq: 'custom' } },
    gradient: { control: 'text', if: { arg: 'variant', eq: 'custom' } },
  },
} satisfies Meta<typeof SealFilledButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Get Started', variant: 'primary' },
}

export const Primary: Story = {
  args: { children: 'Confirm', variant: 'primary' },
}

export const Accent: Story = {
  args: { children: 'Continue', variant: 'accent' },
}

export const AccentSecondary: Story = {
  args: { children: 'Learn More', variant: 'accent-secondary' },
}

export const Gradient: Story = {
  args: { children: 'Launch', variant: 'gradient', icon: Rocket },
}

export const AccentGradient: Story = {
  args: { children: 'Boost', variant: 'accent-gradient', icon: Star },
}

export const CustomColor: Story = {
  args: { children: 'Delete', variant: 'custom', color: '#e53935' },
}

export const CustomGradient: Story = {
  args: {
    children: 'Special',
    variant: 'custom',
    gradient: 'linear-gradient(to right, #7b2ff7, #f107a3)',
  },
}

export const WithIcon: Story = {
  args: { children: 'Settings', variant: 'primary', icon: Settings },
}

export const Loading: Story = {
  args: { children: 'Saving…', variant: 'primary', loading: true },
}

export const LoadingWithIcon: Story = {
  args: {
    children: 'Launching',
    variant: 'gradient',
    loading: true,
    icon: Rocket,
  },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', variant: 'primary', disabled: true },
}

export const AllVariants: Story = {
  args: { loading: false, disabled: false },
  render: ({ loading = false, disabled = false }) => (
    <div className="flex flex-wrap gap-3">
      <SealFilledButton variant="primary" loading={loading} disabled={disabled}>
        Primary
      </SealFilledButton>
      <SealFilledButton variant="accent" loading={loading} disabled={disabled}>
        Accent
      </SealFilledButton>
      <SealFilledButton variant="accent-secondary" loading={loading} disabled={disabled}>
        Accent Secondary
      </SealFilledButton>
      <SealFilledButton variant="gradient" icon={Rocket} loading={loading} disabled={disabled}>
        Gradient
      </SealFilledButton>
      <SealFilledButton variant="accent-gradient" icon={Star} loading={loading} disabled={disabled}>
        Accent Gradient
      </SealFilledButton>
      <SealFilledButton variant="custom" color="#e53935" loading={loading} disabled={disabled}>
        Custom
      </SealFilledButton>
    </div>
  ),
}
