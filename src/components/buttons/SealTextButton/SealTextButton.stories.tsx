import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Rocket, Settings, Star, Telescope } from 'lucide-react'

import { SealTextButton } from './SealTextButton'

const meta = {
  title: 'Buttons/SealTextButton',
  component: SealTextButton,
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
} satisfies Meta<typeof SealTextButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Learn more', variant: 'primary' },
}

export const Primary: Story = {
  args: { children: 'Learn more', variant: 'primary' },
}

export const Accent: Story = {
  args: { children: 'Details', variant: 'accent' },
}

export const AccentSecondary: Story = {
  args: { children: 'View all', variant: 'accent-secondary' },
}

export const Gradient: Story = {
  args: { children: 'Discover', variant: 'gradient', icon: Telescope },
}

export const AccentGradient: Story = {
  args: { children: 'Explore', variant: 'accent-gradient', icon: Star },
}

export const CustomColor: Story = {
  args: { children: 'Retry', variant: 'custom', color: '#e53935' },
}

export const CustomGradient: Story = {
  args: {
    children: 'Special action',
    variant: 'custom',
    gradient: 'linear-gradient(to right, #7b2ff7, #f107a3)',
  },
}

export const WithIcon: Story = {
  args: { children: 'Skip', variant: 'primary', icon: ArrowRight },
}

export const Loading: Story = {
  args: { children: 'Fetching…', variant: 'primary', loading: true },
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
      <SealTextButton variant="primary" loading={loading} disabled={disabled}>
        Primary
      </SealTextButton>
      <SealTextButton variant="accent" loading={loading} disabled={disabled}>
        Accent
      </SealTextButton>
      <SealTextButton variant="accent-secondary" loading={loading} disabled={disabled}>
        Accent Secondary
      </SealTextButton>
      <SealTextButton variant="gradient" icon={Telescope} loading={loading} disabled={disabled}>
        Gradient
      </SealTextButton>
      <SealTextButton variant="accent-gradient" icon={Star} loading={loading} disabled={disabled}>
        Accent Gradient
      </SealTextButton>
      <SealTextButton variant="custom" color="#e53935" loading={loading} disabled={disabled}>
        Custom
      </SealTextButton>
    </div>
  ),
}

export const AllVariantsWithIcons: Story = {
  args: { loading: false, disabled: false },
  render: ({ loading = false, disabled = false }) => (
    <div className="flex flex-wrap gap-3">
      <SealTextButton variant="primary" icon={ArrowRight} loading={loading} disabled={disabled}>
        Primary
      </SealTextButton>
      <SealTextButton variant="accent" icon={Settings} loading={loading} disabled={disabled}>
        Accent
      </SealTextButton>
      <SealTextButton variant="gradient" icon={Telescope} loading={loading} disabled={disabled}>
        Gradient
      </SealTextButton>
      <SealTextButton variant="accent-gradient" icon={Star} loading={loading} disabled={disabled}>
        Accent Gradient
      </SealTextButton>
    </div>
  ),
}
