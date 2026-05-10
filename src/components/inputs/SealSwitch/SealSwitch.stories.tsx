import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealSwitch } from './SealSwitch'

const meta = {
  title: 'Inputs/SealSwitch',
  component: SealSwitch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    sublabel: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SealSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: { source: { code: `<SealSwitch />` } },
  },
  render: (args) => <SealSwitch {...args} />,
}

export const WithLabel: Story = {
  args: { label: 'Enable notifications' },
  parameters: {
    docs: { source: { code: `<SealSwitch label="Enable notifications" />` } },
  },
  render: (args) => <SealSwitch {...args} />,
}

export const WithLabelAndSublabel: Story = {
  args: {
    label: 'Dark mode',
    sublabel: 'Switch between dark and light themes',
  },
  parameters: {
    docs: {
      source: {
        code: `<SealSwitch
  label="Dark mode"
  sublabel="Switch between dark and light themes"
/>`,
      },
    },
  },
  render: (args) => <SealSwitch {...args} />,
}

export const Checked: Story = {
  args: { label: 'Marketing emails', checked: true },
  parameters: {
    docs: { source: { code: `<SealSwitch label="Marketing emails" checked />` } },
  },
  render: (args) => <SealSwitch {...args} />,
}

export const Disabled: Story = {
  args: { label: 'Not available', disabled: true },
  parameters: {
    docs: { source: { code: `<SealSwitch label="Not available" disabled />` } },
  },
  render: (args) => <SealSwitch {...args} />,
}

export const DisabledChecked: Story = {
  args: { label: 'Pre-selected option', disabled: true, checked: true },
  parameters: {
    docs: {
      source: { code: `<SealSwitch label="Pre-selected option" disabled checked />` },
    },
  },
  render: (args) => <SealSwitch {...args} />,
}

export const Controlled: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [enabled, setEnabled] = React.useState(false)
  return (
    <SealSwitch
      checked={enabled}
      onCheckedChange={setEnabled}
      label="Enable feature"
      sublabel={enabled ? 'Feature is active' : 'Feature is inactive'}
    />
  )
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [enabled, setEnabled] = React.useState(false)
    return (
      <SealSwitch
        checked={enabled}
        onCheckedChange={setEnabled}
        label="Enable feature"
        sublabel={enabled ? 'Feature is active' : 'Feature is inactive'}
      />
    )
  },
}

export const AllVariants: Story = {
  args: { disabled: false },
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <SealSwitch label="Off state" checked={false} />
  <SealSwitch label="On state" checked />
  <SealSwitch label="Disabled off" checked={false} disabled />
  <SealSwitch label="Disabled on" checked disabled />
  <SealSwitch
    label="With sublabel"
    sublabel="Additional description text"
    checked
  />
</div>`,
      },
    },
  },
  render: ({ disabled }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SealSwitch label="Off state" checked={false} disabled={disabled ?? false} />
      <SealSwitch label="On state" checked disabled={disabled ?? false} />
      <SealSwitch label="Disabled off" checked={false} disabled />
      <SealSwitch label="Disabled on" checked disabled />
      <SealSwitch
        label="With sublabel"
        sublabel="Additional description text"
        checked
        disabled={disabled ?? false}
      />
    </div>
  ),
}
