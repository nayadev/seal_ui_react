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
  args: { children: 'Launch', variant: 'gradient', icon: <Rocket size={16} /> },
}

export const AccentGradient: Story = {
  args: { children: 'Boost', variant: 'accent-gradient', icon: <Star size={16} /> },
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
  args: { children: 'Settings', variant: 'primary', icon: <Settings size={16} /> },
}

export const Loading: Story = {
  args: { children: 'Saving…', variant: 'primary', loading: true },
}

export const LoadingWithIcon: Story = {
  args: {
    children: 'Launching',
    variant: 'gradient',
    loading: true,
    icon: <Rocket size={16} />,
  },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', variant: 'primary', disabled: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <SealFilledButton variant="primary">Primary</SealFilledButton>
      <SealFilledButton variant="accent">Accent</SealFilledButton>
      <SealFilledButton variant="accent-secondary">Accent Secondary</SealFilledButton>
      <SealFilledButton variant="gradient" icon={<Rocket size={16} />}>
        Gradient
      </SealFilledButton>
      <SealFilledButton variant="accent-gradient" icon={<Star size={16} />}>
        Accent Gradient
      </SealFilledButton>
      <SealFilledButton variant="custom" color="#e53935">
        Custom
      </SealFilledButton>
    </div>
  ),
}
