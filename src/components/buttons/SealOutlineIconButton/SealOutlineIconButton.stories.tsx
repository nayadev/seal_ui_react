import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Bookmark,
  Settings,
  Share2,
  SlidersHorizontal,
  Sparkles,
  TriangleAlert,
  Zap,
} from 'lucide-react'

import { SealOutlineIconButton } from './SealOutlineIconButton'

const meta = {
  title: 'Buttons/SealOutlineIconButton',
  component: SealOutlineIconButton.Primary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    icon: { table: { disable: true } },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    tooltip: { control: 'text' },
  },
} satisfies Meta<typeof SealOutlineIconButton.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { icon: Share2, tooltip: 'Share' },
  parameters: {
    docs: { source: { code: `<SealOutlineIconButton.Primary icon={Share2} tooltip="Share" />` } },
  },
  render: () => <SealOutlineIconButton.Primary icon={Share2} tooltip="Share" />,
}

export const Primary: Story = {
  args: { icon: Share2, tooltip: 'Share' },
  parameters: {
    docs: { source: { code: `<SealOutlineIconButton.Primary icon={Share2} tooltip="Share" />` } },
  },
  render: () => <SealOutlineIconButton.Primary icon={Share2} tooltip="Share" />,
}

export const Accent: Story = {
  args: { icon: Bookmark, tooltip: 'Save' },
  parameters: {
    docs: { source: { code: `<SealOutlineIconButton.Accent icon={Bookmark} tooltip="Save" />` } },
  },
  render: () => <SealOutlineIconButton.Accent icon={Bookmark} tooltip="Save" />,
}

export const AccentSecondary: Story = {
  args: { icon: SlidersHorizontal, tooltip: 'Filter' },
  parameters: {
    docs: {
      source: {
        code: `<SealOutlineIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Filter" />`,
      },
    },
  },
  render: () => <SealOutlineIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Filter" />,
}

export const Gradient: Story = {
  args: { icon: Sparkles, tooltip: 'Magic' },
  parameters: {
    docs: {
      source: { code: `<SealOutlineIconButton.Gradient icon={Sparkles} tooltip="Magic" />` },
    },
  },
  render: () => <SealOutlineIconButton.Gradient icon={Sparkles} tooltip="Magic" />,
}

export const AccentGradient: Story = {
  args: { icon: Zap, tooltip: 'Boost' },
  parameters: {
    docs: {
      source: { code: `<SealOutlineIconButton.AccentGradient icon={Zap} tooltip="Boost" />` },
    },
  },
  render: () => <SealOutlineIconButton.AccentGradient icon={Zap} tooltip="Boost" />,
}

export const CustomColor: Story = {
  args: { icon: TriangleAlert, tooltip: 'Warning' },
  parameters: {
    docs: {
      source: {
        code: `<SealOutlineIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Warning" />`,
      },
    },
  },
  render: () => (
    <SealOutlineIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Warning" />
  ),
}

export const CustomGradient: Story = {
  args: { icon: Settings, tooltip: 'Custom' },
  parameters: {
    docs: {
      source: {
        code: `<SealOutlineIconButton.Custom
  gradient="linear-gradient(to right, #7b2ff7, #f107a3)"
  icon={Settings}
  tooltip="Custom"
/>`,
      },
    },
  },
  render: () => (
    <SealOutlineIconButton.Custom
      gradient="linear-gradient(to right, #7b2ff7, #f107a3)"
      icon={Settings}
      tooltip="Custom"
    />
  ),
}

export const Loading: Story = {
  args: { icon: Share2, tooltip: 'Loading', loading: true },
  parameters: {
    docs: {
      source: { code: `<SealOutlineIconButton.Primary icon={Share2} tooltip="Loading" loading />` },
    },
  },
  render: () => <SealOutlineIconButton.Primary icon={Share2} tooltip="Loading" loading />,
}

export const Disabled: Story = {
  args: { icon: Share2, tooltip: 'Disabled', disabled: true },
  parameters: {
    docs: {
      source: {
        code: `<SealOutlineIconButton.Primary icon={Share2} tooltip="Disabled" disabled />`,
      },
    },
  },
  render: () => <SealOutlineIconButton.Primary icon={Share2} tooltip="Disabled" disabled />,
}

export const AllVariants: Story = {
  args: { icon: Share2, loading: false, disabled: false },
  parameters: {
    docs: {
      source: {
        code: `<SealOutlineIconButton.Primary icon={Share2} tooltip="Primary" />
<SealOutlineIconButton.Accent icon={Bookmark} tooltip="Accent" />
<SealOutlineIconButton.AccentSecondary icon={SlidersHorizontal} tooltip="Accent Secondary" />
<SealOutlineIconButton.Gradient icon={Sparkles} tooltip="Gradient" />
<SealOutlineIconButton.AccentGradient icon={Zap} tooltip="Accent Gradient" />
<SealOutlineIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Custom" />`,
      },
    },
  },
  render: ({ loading, disabled }) => (
    <div className="flex gap-4 items-center">
      <SealOutlineIconButton.Primary
        icon={Share2}
        tooltip="Primary"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealOutlineIconButton.Accent
        icon={Bookmark}
        tooltip="Accent"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealOutlineIconButton.AccentSecondary
        icon={SlidersHorizontal}
        tooltip="Accent Secondary"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealOutlineIconButton.Gradient
        icon={Sparkles}
        tooltip="Gradient"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealOutlineIconButton.AccentGradient
        icon={Zap}
        tooltip="Accent Gradient"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      <SealOutlineIconButton.Custom
        color="#e53935"
        icon={TriangleAlert}
        tooltip="Custom"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
    </div>
  ),
}
