import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket, Settings, Star, Telescope } from 'lucide-react'

import { SealOutlineButton } from './SealOutlineButton'

const meta = {
  title: 'Buttons/SealOutlineButton',
  component: SealOutlineButton,
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
} satisfies Meta<typeof SealOutlineButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Cancel', variant: 'primary' },
}

export const Primary: Story = {
  args: { children: 'Cancel', variant: 'primary' },
}

export const Accent: Story = {
  args: { children: 'Learn More', variant: 'accent' },
}

export const AccentSecondary: Story = {
  args: { children: 'Details', variant: 'accent-secondary' },
}

export const Gradient: Story = {
  args: { children: 'Explore', variant: 'gradient', icon: Telescope },
}

export const AccentGradient: Story = {
  args: { children: 'Boost', variant: 'accent-gradient', icon: Star },
}

export const CustomColor: Story = {
  args: { children: 'Retry', variant: 'custom', color: '#e53935' },
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
  render: () => (
    <div className="flex flex-wrap gap-3">
      <SealOutlineButton variant="primary">Primary</SealOutlineButton>
      <SealOutlineButton variant="accent">Accent</SealOutlineButton>
      <SealOutlineButton variant="accent-secondary">Accent Secondary</SealOutlineButton>
      <SealOutlineButton variant="gradient" icon={Telescope}>
        Gradient
      </SealOutlineButton>
      <SealOutlineButton variant="accent-gradient" icon={Star}>
        Accent Gradient
      </SealOutlineButton>
      <SealOutlineButton variant="custom" color="#e53935">
        Custom
      </SealOutlineButton>
    </div>
  ),
}
