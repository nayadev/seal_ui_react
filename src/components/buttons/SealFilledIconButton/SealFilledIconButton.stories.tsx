import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Bookmark,
  Plus,
  Rocket,
  Settings,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  Zap,
} from 'lucide-react'

import { SealFilledIconButton } from './SealFilledIconButton'

const meta = {
  title: 'Buttons/SealFilledIconButton',
  component: SealFilledIconButton,
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
    tooltip: { control: 'text' },
  },
} satisfies Meta<typeof SealFilledIconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { icon: Plus, tooltip: 'Add', variant: 'primary' },
}

export const Primary: Story = {
  args: { icon: Rocket, tooltip: 'Launch', variant: 'primary' },
}

export const Accent: Story = {
  args: { icon: Bookmark, tooltip: 'Save', variant: 'accent' },
}

export const AccentSecondary: Story = {
  args: { icon: SlidersHorizontal, tooltip: 'Filter', variant: 'accent-secondary' },
}

export const Gradient: Story = {
  args: { icon: Sparkles, tooltip: 'Magic', variant: 'gradient' },
}

export const AccentGradient: Story = {
  args: { icon: Zap, tooltip: 'Boost', variant: 'accent-gradient' },
}

export const CustomColor: Story = {
  args: { icon: TriangleAlert, variant: 'custom', color: '#e53935', tooltip: 'Warning' },
}

export const CustomGradient: Story = {
  args: {
    icon: Settings,
    variant: 'custom',
    gradient: 'linear-gradient(to right, #7b2ff7, #f107a3)',
    tooltip: 'Custom',
  },
}

export const Loading: Story = {
  args: { icon: Rocket, variant: 'primary', loading: true, tooltip: 'Loading' },
}

export const Disabled: Story = {
  args: { icon: Rocket, variant: 'primary', disabled: true, tooltip: 'Disabled' },
}

export const AllVariants: Story = {
  args: { icon: Rocket },
  render: () => (
    <div className="flex gap-4 items-center">
      <SealFilledIconButton variant="primary" icon={Rocket} tooltip="Primary" />
      <SealFilledIconButton variant="accent" icon={Bookmark} tooltip="Accent" />
      <SealFilledIconButton
        variant="accent-secondary"
        icon={SlidersHorizontal}
        tooltip="Accent Secondary"
      />
      <SealFilledIconButton variant="gradient" icon={Sparkles} tooltip="Gradient" />
      <SealFilledIconButton variant="accent-gradient" icon={Zap} tooltip="Accent Gradient" />
      <SealFilledIconButton
        variant="custom"
        color="#e53935"
        icon={TriangleAlert}
        tooltip="Custom"
      />
    </div>
  ),
}
