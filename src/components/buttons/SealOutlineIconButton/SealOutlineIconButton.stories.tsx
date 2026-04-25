import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bookmark, Share2, SlidersHorizontal, Sparkles, TriangleAlert, Zap } from 'lucide-react'

import { SealOutlineIconButton } from './SealOutlineIconButton'

const meta: Meta<typeof SealOutlineIconButton> = {
  title: 'Buttons/SealOutlineIconButton',
  component: SealOutlineIconButton,
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
    icon: Share2,
    tooltip: 'Share',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <SealOutlineIconButton variant="primary" icon={Share2} tooltip="Primary" />
      <SealOutlineIconButton variant="accent" icon={Bookmark} tooltip="Accent" />
      <SealOutlineIconButton
        variant="accent-secondary"
        icon={SlidersHorizontal}
        tooltip="Accent Secondary"
      />
      <SealOutlineIconButton variant="gradient" icon={Sparkles} tooltip="Gradient" />
      <SealOutlineIconButton variant="accent-gradient" icon={Zap} tooltip="Accent Gradient" />
    </div>
  ),
}

export const CustomVariant: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <SealOutlineIconButton
        variant="custom"
        color="#e53935"
        icon={TriangleAlert}
        tooltip="Custom Solid Color"
      />
      <SealOutlineIconButton
        variant="custom"
        gradient="linear-gradient(to right, #00c6ff, #0072ff)"
        icon={SlidersHorizontal}
        tooltip="Custom Gradient"
      />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    icon: Share2,
    loading: true,
    tooltip: 'Loading',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    icon: Share2,
    disabled: true,
    tooltip: 'Disabled',
  },
}
