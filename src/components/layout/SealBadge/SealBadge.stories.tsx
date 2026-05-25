import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealBadge } from './SealBadge'

const meta = {
  title: 'Layout/SealBadge',
  component: SealBadge.Primary,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  args: { children: 'Badge' },
} satisfies Meta<typeof SealBadge.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SealBadge.Primary>New</SealBadge.Primary>,
  parameters: {
    docs: { source: { code: '<SealBadge.Primary>New</SealBadge.Primary>' } },
  },
}

export const Primary: Story = {
  render: () => <SealBadge.Primary>Primary</SealBadge.Primary>,
  parameters: {
    docs: { source: { code: '<SealBadge.Primary>Primary</SealBadge.Primary>' } },
  },
}

export const Accent: Story = {
  render: () => <SealBadge.Accent>Beta</SealBadge.Accent>,
  parameters: {
    docs: { source: { code: '<SealBadge.Accent>Beta</SealBadge.Accent>' } },
  },
}

export const Secondary: Story = {
  render: () => <SealBadge.Secondary>Draft</SealBadge.Secondary>,
  parameters: {
    docs: { source: { code: '<SealBadge.Secondary>Draft</SealBadge.Secondary>' } },
  },
}

export const Outline: Story = {
  render: () => <SealBadge.Outline>v1.0</SealBadge.Outline>,
  parameters: {
    docs: { source: { code: '<SealBadge.Outline>v1.0</SealBadge.Outline>' } },
  },
}

export const Success: Story = {
  render: () => <SealBadge.Success>Active</SealBadge.Success>,
  parameters: {
    docs: { source: { code: '<SealBadge.Success>Active</SealBadge.Success>' } },
  },
}

export const Warning: Story = {
  render: () => <SealBadge.Warning>Pending</SealBadge.Warning>,
  parameters: {
    docs: { source: { code: '<SealBadge.Warning>Pending</SealBadge.Warning>' } },
  },
}

export const ErrorVariant: Story = {
  name: 'Error',
  render: () => <SealBadge.Error>Expired</SealBadge.Error>,
  parameters: {
    docs: { source: { code: '<SealBadge.Error>Expired</SealBadge.Error>' } },
  },
}

export const Interactive: Story = {
  render: () => <SealBadge.Primary onClick={() => undefined}>Clickable</SealBadge.Primary>,
  parameters: {
    docs: {
      source: {
        code: '<SealBadge.Primary onClick={handleClick}>Clickable</SealBadge.Primary>',
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap gap-dimension-xs">
      <SealBadge.Primary>Primary</SealBadge.Primary>
      <SealBadge.Accent>Accent</SealBadge.Accent>
      <SealBadge.Secondary>Secondary</SealBadge.Secondary>
      <SealBadge.Outline>Outline</SealBadge.Outline>
      <SealBadge.Success>Active</SealBadge.Success>
      <SealBadge.Warning>Pending</SealBadge.Warning>
      <SealBadge.Error>Expired</SealBadge.Error>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealBadge.Primary>Primary</SealBadge.Primary>
<SealBadge.Accent>Accent</SealBadge.Accent>
<SealBadge.Secondary>Secondary</SealBadge.Secondary>
<SealBadge.Outline>Outline</SealBadge.Outline>
<SealBadge.Success>Active</SealBadge.Success>
<SealBadge.Warning>Pending</SealBadge.Warning>
<SealBadge.Error>Expired</SealBadge.Error>`,
      },
    },
  },
}
