import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealRadioGroup } from './SealRadioGroup'

const themeItems = [
  { value: 'light', label: 'Light mode' },
  { value: 'dark', label: 'Dark mode', sublabel: 'Easier on the eyes at night' },
  { value: 'system', label: 'System default', sublabel: 'Follows your OS preference' },
]

const meta = {
  title: 'Inputs/SealRadioGroup',
  component: SealRadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof SealRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items: themeItems },
  parameters: {
    docs: {
      source: {
        code: `<SealRadioGroup
  items={[
    { value: 'light', label: 'Light mode' },
    { value: 'dark', label: 'Dark mode', sublabel: 'Easier on the eyes at night' },
    { value: 'system', label: 'System default', sublabel: 'Follows your OS preference' },
  ]}
/>`,
      },
    },
  },
  render: (args) => <SealRadioGroup {...args} />,
}

export const Controlled: Story = {
  args: { items: themeItems },
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [value, setValue] = React.useState('dark')
  return (
    <SealRadioGroup
      items={[
        { value: 'light', label: 'Light mode' },
        { value: 'dark', label: 'Dark mode', sublabel: 'Easier on the eyes at night' },
        { value: 'system', label: 'System default', sublabel: 'Follows your OS preference' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  )
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('dark')
    return <SealRadioGroup items={themeItems} value={value} onValueChange={setValue} />
  },
}

export const Horizontal: Story = {
  args: {
    items: [
      { value: 'xs', label: 'XS' },
      { value: 'sm', label: 'SM' },
      { value: 'md', label: 'MD' },
      { value: 'lg', label: 'LG' },
    ],
    orientation: 'horizontal',
    value: 'md',
  },
  parameters: {
    docs: {
      source: {
        code: `<SealRadioGroup
  items={[
    { value: 'xs', label: 'XS' },
    { value: 'sm', label: 'SM' },
    { value: 'md', label: 'MD' },
    { value: 'lg', label: 'LG' },
  ]}
  orientation="horizontal"
  value="md"
/>`,
      },
    },
  },
  render: (args) => <SealRadioGroup {...args} />,
}

export const Disabled: Story = {
  args: { items: themeItems, disabled: true, value: 'dark' },
  parameters: {
    docs: {
      source: {
        code: `<SealRadioGroup
  items={themeItems}
  disabled
  value="dark"
/>`,
      },
    },
  },
  render: (args) => <SealRadioGroup {...args} />,
}

export const PartiallyDisabled: Story = {
  args: {
    items: [
      { value: 'free', label: 'Free tier', sublabel: '5 GB storage' },
      { value: 'pro', label: 'Pro', sublabel: '100 GB storage' },
      { value: 'enterprise', label: 'Enterprise', sublabel: 'Unlimited storage', disabled: true },
    ],
    value: 'pro',
  },
  parameters: {
    docs: {
      source: {
        code: `<SealRadioGroup
  items={[
    { value: 'free', label: 'Free tier', sublabel: '5 GB storage' },
    { value: 'pro', label: 'Pro', sublabel: '100 GB storage' },
    { value: 'enterprise', label: 'Enterprise', sublabel: 'Unlimited storage', disabled: true },
  ]}
  value="pro"
/>`,
      },
    },
  },
  render: (args) => <SealRadioGroup {...args} />,
}

export const WithoutLabels: Story = {
  args: {
    items: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
  },
  parameters: {
    docs: {
      source: {
        code: `<SealRadioGroup
  items={[{ value: 'a' }, { value: 'b' }, { value: 'c' }]}
  aria-label="Bare options"
/>`,
      },
    },
  },
  render: (args) => <SealRadioGroup {...args} aria-label="Bare options" />,
}

export const AllVariants: Story = {
  args: { items: themeItems },
  parameters: {
    docs: {
      source: {
        code: `{/* Vertical (default) */}
<SealRadioGroup items={themeItems} value="dark" />

{/* Horizontal */}
<SealRadioGroup items={sizeItems} orientation="horizontal" value="md" />

{/* Disabled */}
<SealRadioGroup items={themeItems} disabled value="dark" />

{/* Partially disabled */}
<SealRadioGroup items={partialItems} value="pro" />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-[var(--seal-dimension-xl)]">
      <div>
        <p className="mb-[var(--seal-dimension-xs)] text-sm text-[var(--seal-text-secondary)]">
          Vertical (default)
        </p>
        <SealRadioGroup items={themeItems} value="dark" />
      </div>
      <div>
        <p className="mb-[var(--seal-dimension-xs)] text-sm text-[var(--seal-text-secondary)]">
          Horizontal
        </p>
        <SealRadioGroup
          items={[
            { value: 'xs', label: 'XS' },
            { value: 'sm', label: 'SM' },
            { value: 'md', label: 'MD' },
            { value: 'lg', label: 'LG' },
          ]}
          orientation="horizontal"
          value="md"
        />
      </div>
      <div>
        <p className="mb-[var(--seal-dimension-xs)] text-sm text-[var(--seal-text-secondary)]">
          Disabled
        </p>
        <SealRadioGroup items={themeItems} disabled value="dark" />
      </div>
      <div>
        <p className="mb-[var(--seal-dimension-xs)] text-sm text-[var(--seal-text-secondary)]">
          Partially disabled
        </p>
        <SealRadioGroup
          items={[
            { value: 'free', label: 'Free tier', sublabel: '5 GB storage' },
            { value: 'pro', label: 'Pro', sublabel: '100 GB storage' },
            {
              value: 'enterprise',
              label: 'Enterprise',
              sublabel: 'Unlimited storage',
              disabled: true,
            },
          ]}
          value="pro"
        />
      </div>
    </div>
  ),
}
