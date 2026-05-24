import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Rocket, Settings, Star, Telescope } from 'lucide-react'

import { SealTextButton } from './SealTextButton'

const meta = {
  title: 'Buttons/SealTextButton',
  component: SealTextButton.Primary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    icon: { table: { disable: true } },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SealTextButton.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Learn more' },
}

export const Primary: Story = {
  render: (args) => <SealTextButton.Primary {...args}>Learn more</SealTextButton.Primary>,
}

export const Accent: Story = {
  render: (args) => <SealTextButton.Accent {...args}>Details</SealTextButton.Accent>,
}

export const AccentSecondary: Story = {
  render: (args) => (
    <SealTextButton.AccentSecondary {...args}>View all</SealTextButton.AccentSecondary>
  ),
}

export const Gradient: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SealTextButton.Gradient icon={Telescope}>Discover</SealTextButton.Gradient>`,
      },
    },
  },
  render: (args) => (
    <SealTextButton.Gradient icon={Telescope} {...args}>
      Discover
    </SealTextButton.Gradient>
  ),
}

export const AccentGradient: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SealTextButton.AccentGradient icon={Star}>Explore</SealTextButton.AccentGradient>`,
      },
    },
  },
  render: (args) => (
    <SealTextButton.AccentGradient icon={Star} {...args}>
      Explore
    </SealTextButton.AccentGradient>
  ),
}

export const CustomColor: Story = {
  render: (args) => (
    <SealTextButton.Custom color="#e53935" {...args}>
      Retry
    </SealTextButton.Custom>
  ),
}

export const CustomGradient: Story = {
  render: (args) => (
    <SealTextButton.Custom gradient="linear-gradient(to right, #7b2ff7, #f107a3)" {...args}>
      Special action
    </SealTextButton.Custom>
  ),
}

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: { code: `<SealTextButton.Primary icon={ArrowRight}>Skip</SealTextButton.Primary>` },
    },
  },
  render: (args) => (
    <SealTextButton.Primary icon={ArrowRight} {...args}>
      Skip
    </SealTextButton.Primary>
  ),
}

export const Loading: Story = {
  render: (args) => (
    <SealTextButton.Primary loading {...args}>
      Fetching…
    </SealTextButton.Primary>
  ),
}

export const LoadingWithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SealTextButton.Gradient loading icon={Rocket}>Launching</SealTextButton.Gradient>`,
      },
    },
  },
  render: (args) => (
    <SealTextButton.Gradient loading icon={Rocket} {...args}>
      Launching
    </SealTextButton.Gradient>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <SealTextButton.Primary disabled {...args}>
      Unavailable
    </SealTextButton.Primary>
  ),
}

export const AllVariants: Story = {
  args: { loading: false, disabled: false },
  render: ({ loading = false, disabled = false }) => (
    <div className="flex flex-wrap gap-dimension-sm">
      <SealTextButton.Primary loading={loading} disabled={disabled}>
        Primary
      </SealTextButton.Primary>
      <SealTextButton.Accent loading={loading} disabled={disabled}>
        Accent
      </SealTextButton.Accent>
      <SealTextButton.AccentSecondary loading={loading} disabled={disabled}>
        Accent Secondary
      </SealTextButton.AccentSecondary>
      <SealTextButton.Gradient icon={Telescope} loading={loading} disabled={disabled}>
        Gradient
      </SealTextButton.Gradient>
      <SealTextButton.AccentGradient icon={Star} loading={loading} disabled={disabled}>
        Accent Gradient
      </SealTextButton.AccentGradient>
      <SealTextButton.Custom color="#e53935" loading={loading} disabled={disabled}>
        Custom
      </SealTextButton.Custom>
    </div>
  ),
}

export const AllVariantsWithIcons: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SealTextButton.Primary icon={ArrowRight}>Primary</SealTextButton.Primary>
<SealTextButton.Accent icon={Settings}>Accent</SealTextButton.Accent>
<SealTextButton.Gradient icon={Telescope}>Gradient</SealTextButton.Gradient>
<SealTextButton.AccentGradient icon={Star}>Accent Gradient</SealTextButton.AccentGradient>`,
      },
    },
  },
  args: { loading: false, disabled: false },
  render: ({ loading = false, disabled = false }) => (
    <div className="flex flex-wrap gap-dimension-sm">
      <SealTextButton.Primary icon={ArrowRight} loading={loading} disabled={disabled}>
        Primary
      </SealTextButton.Primary>
      <SealTextButton.Accent icon={Settings} loading={loading} disabled={disabled}>
        Accent
      </SealTextButton.Accent>
      <SealTextButton.Gradient icon={Telescope} loading={loading} disabled={disabled}>
        Gradient
      </SealTextButton.Gradient>
      <SealTextButton.AccentGradient icon={Star} loading={loading} disabled={disabled}>
        Accent Gradient
      </SealTextButton.AccentGradient>
    </div>
  ),
}
