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
  component: SealFilledIconButton.Primary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    icon: { table: { disable: true } },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    tooltip: { control: 'text' },
  },
} satisfies Meta<typeof SealFilledIconButton.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { icon: Plus, tooltip: 'Add' },
  parameters: {
    docs: { source: { code: `<SealFilledIconButton.Primary icon={Plus} tooltip="Add" />` } },
  },
  render: () => <SealFilledIconButton.Primary icon={Plus} tooltip="Add" />,
}

export const Primary: Story = {
  args: { icon: Rocket, tooltip: 'Launch' },
  parameters: {
    docs: { source: { code: `<SealFilledIconButton.Primary icon={Rocket} tooltip="Launch" />` } },
  },
  render: () => <SealFilledIconButton.Primary icon={Rocket} tooltip="Launch" />,
}

export const Accent: Story = {
  args: { icon: Bookmark, tooltip: 'Save' },
  parameters: {
    docs: { source: { code: `<SealFilledIconButton.Accent icon={Bookmark} tooltip="Save" />` } },
  },
  render: () => <SealFilledIconButton.Accent icon={Bookmark} tooltip="Save" />,
}

export const AccentSecondary: Story = {
  args: { icon: SlidersHorizontal, tooltip: 'Filter' },
  parameters: {
    docs: {
      source: {
        code: `<SealFilledIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Filter" />`,
      },
    },
  },
  render: () => <SealFilledIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Filter" />,
}

export const Gradient: Story = {
  args: { icon: Sparkles, tooltip: 'Magic' },
  parameters: {
    docs: { source: { code: `<SealFilledIconButton.Gradient icon={Sparkles} tooltip="Magic" />` } },
  },
  render: () => <SealFilledIconButton.Gradient icon={Sparkles} tooltip="Magic" />,
}

export const AccentGradient: Story = {
  args: { icon: Zap, tooltip: 'Boost' },
  parameters: {
    docs: {
      source: { code: `<SealFilledIconButton.AccentGradient icon={Zap} tooltip="Boost" />` },
    },
  },
  render: () => <SealFilledIconButton.AccentGradient icon={Zap} tooltip="Boost" />,
}

export const CustomColor: Story = {
  args: { icon: TriangleAlert, tooltip: 'Warning' },
  parameters: {
    docs: {
      source: {
        code: `<SealFilledIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Warning" />`,
      },
    },
  },
  render: () => (
    <SealFilledIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Warning" />
  ),
}

export const CustomGradient: Story = {
  args: { icon: Settings, tooltip: 'Custom' },
  parameters: {
    docs: {
      source: {
        code: `<SealFilledIconButton.Custom
  gradient="linear-gradient(to right, #7b2ff7, #f107a3)"
  icon={Settings}
  tooltip="Custom"
/>`,
      },
    },
  },
  render: () => (
    <SealFilledIconButton.Custom
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
      source: { code: `<SealFilledIconButton.Primary icon={Rocket} tooltip="Loading" loading />` },
    },
  },
  render: () => <SealFilledIconButton.Primary icon={Rocket} tooltip="Loading" loading />,
}

export const Disabled: Story = {
  args: { icon: Rocket, tooltip: 'Disabled', disabled: true },
  parameters: {
    docs: {
      source: {
        code: `<SealFilledIconButton.Primary icon={Rocket} tooltip="Disabled" disabled />`,
      },
    },
  },
  render: () => <SealFilledIconButton.Primary icon={Rocket} tooltip="Disabled" disabled />,
}

export const AllVariants: Story = {
  args: { icon: Rocket, loading: false, disabled: false },
  parameters: {
    docs: {
      source: {
        code: `<SealFilledIconButton.Primary icon={Rocket} tooltip="Primary" />
<SealFilledIconButton.Accent icon={Bookmark} tooltip="Accent" />
<SealFilledIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Accent Secondary" />
<SealFilledIconButton.Gradient icon={Sparkles} tooltip="Gradient" />
<SealFilledIconButton.AccentGradient icon={Zap} tooltip="Accent Gradient" />
<SealFilledIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Custom" />`,
      },
    },
  },
  render: ({ loading, disabled }) => (
    <div className="flex gap-4 items-center">
      <SealFilledIconButton.Primary
        icon={Rocket}
        tooltip="Primary"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealFilledIconButton.Accent
        icon={Bookmark}
        tooltip="Accent"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealFilledIconButton.AccentSecondary
        icon={SlidersHorizontal}
        tooltip="Accent Secondary"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealFilledIconButton.Gradient
        icon={Sparkles}
        tooltip="Gradient"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealFilledIconButton.AccentGradient
        icon={Zap}
        tooltip="Accent Gradient"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealFilledIconButton.Custom
        color="#e53935"
        icon={TriangleAlert}
        tooltip="Custom"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
    </div>
  ),
}
