import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Bookmark,
  Rocket,
  Settings,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  Zap,
} from 'lucide-react'

import { SealIconButton } from './SealIconButton'

const meta = {
  title: 'Buttons/SealIconButton',
  component: SealIconButton.Primary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    icon: { table: { disable: true } },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    tooltip: { control: 'text' },
  },
} satisfies Meta<typeof SealIconButton.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { icon: Rocket, tooltip: 'Launch' },
  parameters: {
    docs: { source: { code: `<SealIconButton.Primary icon={Rocket} tooltip="Launch" />` } },
  },
  render: () => <SealIconButton.Primary icon={Rocket} tooltip="Launch" />,
}

export const Primary: Story = {
  args: { icon: Rocket, tooltip: 'Action' },
  parameters: {
    docs: { source: { code: `<SealIconButton.Primary icon={Rocket} tooltip="Action" />` } },
  },
  render: () => <SealIconButton.Primary icon={Rocket} tooltip="Action" />,
}

export const Accent: Story = {
  args: { icon: Bookmark, tooltip: 'Save' },
  parameters: {
    docs: { source: { code: `<SealIconButton.Accent icon={Bookmark} tooltip="Save" />` } },
  },
  render: () => <SealIconButton.Accent icon={Bookmark} tooltip="Save" />,
}

export const AccentSecondary: Story = {
  args: { icon: SlidersHorizontal, tooltip: 'Filter' },
  parameters: {
    docs: {
      source: {
        code: `<SealIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Filter" />`,
      },
    },
  },
  render: () => <SealIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Filter" />,
}

export const Gradient: Story = {
  args: { icon: Sparkles, tooltip: 'Magic' },
  parameters: {
    docs: { source: { code: `<SealIconButton.Gradient icon={Sparkles} tooltip="Magic" />` } },
  },
  render: () => <SealIconButton.Gradient icon={Sparkles} tooltip="Magic" />,
}

export const AccentGradient: Story = {
  args: { icon: Zap, tooltip: 'Boost' },
  parameters: {
    docs: { source: { code: `<SealIconButton.AccentGradient icon={Zap} tooltip="Boost" />` } },
  },
  render: () => <SealIconButton.AccentGradient icon={Zap} tooltip="Boost" />,
}

export const CustomColor: Story = {
  args: { icon: TriangleAlert, tooltip: 'Warning' },
  parameters: {
    docs: {
      source: {
        code: `<SealIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Warning" />`,
      },
    },
  },
  render: () => <SealIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Warning" />,
}

export const CustomGradient: Story = {
  args: { icon: Settings, tooltip: 'Custom' },
  parameters: {
    docs: {
      source: {
        code: `<SealIconButton.Custom
  gradient="linear-gradient(to right, #7b2ff7, #f107a3)"
  icon={Settings}
  tooltip="Custom"
/>`,
      },
    },
  },
  render: () => (
    <SealIconButton.Custom
      gradient="linear-gradient(to right, #7b2ff7, #f107a3)"
      icon={Settings}
      tooltip="Custom"
    />
  ),
}

export const Loading: Story = {
  args: { icon: Rocket, tooltip: 'Loading', loading: true },
  parameters: {
    docs: {
      source: { code: `<SealIconButton.Primary icon={Rocket} tooltip="Loading" loading />` },
    },
  },
  render: () => <SealIconButton.Primary icon={Rocket} tooltip="Loading" loading />,
}

export const Disabled: Story = {
  args: { icon: Rocket, tooltip: 'Disabled', disabled: true },
  parameters: {
    docs: {
      source: { code: `<SealIconButton.Primary icon={Rocket} tooltip="Disabled" disabled />` },
    },
  },
  render: () => <SealIconButton.Primary icon={Rocket} tooltip="Disabled" disabled />,
}

export const AllVariants: Story = {
  args: { icon: Rocket, loading: false, disabled: false },
  parameters: {
    docs: {
      source: {
        code: `<SealIconButton.Primary icon={Rocket} tooltip="Primary" />
<SealIconButton.Accent icon={Bookmark} tooltip="Accent" />
<SealIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Accent Secondary" />
<SealIconButton.Gradient icon={Sparkles} tooltip="Gradient" />
<SealIconButton.AccentGradient icon={Zap} tooltip="Accent Gradient" />
<SealIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Custom" />`,
      },
    },
  },
  render: ({ loading, disabled }) => (
    <div className="flex gap-4 items-center">
      <SealIconButton.Primary
        icon={Rocket}
        tooltip="Primary"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealIconButton.Accent
        icon={Bookmark}
        tooltip="Accent"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealIconButton.AccentSecondary
        icon={SlidersHorizontal}
        tooltip="Accent Secondary"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealIconButton.Gradient
        icon={Sparkles}
        tooltip="Gradient"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealIconButton.AccentGradient
        icon={Zap}
        tooltip="Accent Gradient"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealIconButton.Custom
        color="#e53935"
        icon={TriangleAlert}
        tooltip="Custom"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
    </div>
  ),
}
