import type { Meta, StoryObj } from '@storybook/react-vite'
import { Rocket, Trash, User, Settings, Sparkles } from 'lucide-react'

import { SealIconButton } from './SealIconButton'

const meta: Meta<typeof SealIconButton> = {
  title: 'Buttons/SealIconButton',
  component: SealIconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent', 'accent-secondary', 'gradient', 'accent-gradient', 'custom'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: { control: 'color' },
    gradient: { control: 'text' },
    tooltip: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: Rocket,
    tooltip: 'Launch',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <SealIconButton variant="primary" icon={Rocket} tooltip="Primary" />
      <SealIconButton variant="accent" icon={User} tooltip="Accent" />
      <SealIconButton variant="accent-secondary" icon={Settings} tooltip="Accent Secondary" />
      <SealIconButton variant="gradient" icon={Sparkles} tooltip="Gradient" />
      <SealIconButton variant="accent-gradient" icon={Sparkles} tooltip="Accent Gradient" />
    </div>
  ),
}

export const CustomVariant: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <SealIconButton variant="custom" color="#e53935" icon={Trash} tooltip="Custom Solid Color" />
      <SealIconButton
        variant="custom"
        gradient="linear-gradient(to right, #00c6ff, #0072ff)"
        icon={Settings}
        tooltip="Custom Gradient"
      />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    icon: Rocket,
    loading: true,
    tooltip: 'Loading',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    icon: Rocket,
    disabled: true,
    tooltip: 'Disabled',
  },
}
