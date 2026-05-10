import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealCheckbox } from './SealCheckbox'

const meta = {
  title: 'Inputs/SealCheckbox',
  component: SealCheckbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    sublabel: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SealCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Accept terms and conditions' },
  parameters: {
    docs: { source: { code: `<SealCheckbox label="Accept terms and conditions" />` } },
  },
  render: (args) => <SealCheckbox {...args} />,
}

export const WithSublabel: Story = {
  args: {
    label: 'Marketing emails',
    sublabel: 'Receive news, product updates and offers.',
  },
  parameters: {
    docs: {
      source: {
        code: `<SealCheckbox
  label="Marketing emails"
  sublabel="Receive news, product updates and offers."
/>`,
      },
    },
  },
  render: (args) => <SealCheckbox {...args} />,
}

export const Checked: Story = {
  args: { label: 'Remember me', checked: true },
  parameters: {
    docs: { source: { code: `<SealCheckbox label="Remember me" checked />` } },
  },
  render: (args) => <SealCheckbox {...args} />,
}

export const Disabled: Story = {
  args: { label: 'Not available', disabled: true },
  parameters: {
    docs: { source: { code: `<SealCheckbox label="Not available" disabled />` } },
  },
  render: (args) => <SealCheckbox {...args} />,
}

export const DisabledChecked: Story = {
  args: { label: 'Pre-selected option', disabled: true, checked: true },
  parameters: {
    docs: {
      source: { code: `<SealCheckbox label="Pre-selected option" disabled checked />` },
    },
  },
  render: (args) => <SealCheckbox {...args} />,
}

export const Controlled: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [checked, setChecked] = React.useState(false)
  return (
    <SealCheckbox
      checked={checked}
      onCheckedChange={setChecked}
      label="Toggle me"
      sublabel={checked ? 'Checked!' : 'Click to check'}
    />
  )
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = React.useState(false)
    return (
      <SealCheckbox
        checked={checked}
        onCheckedChange={setChecked}
        label="Toggle me"
        sublabel={checked ? 'Checked!' : 'Click to check'}
      />
    )
  },
}

export const AllVariants: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<SealCheckbox label="Unchecked" />
<SealCheckbox label="Checked" checked />
<SealCheckbox label="With sublabel" sublabel="Additional description" />
<SealCheckbox label="Disabled" disabled />
<SealCheckbox label="Disabled checked" disabled checked />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-[var(--seal-dimension-md)]">
      <SealCheckbox label="Unchecked" />
      <SealCheckbox label="Checked" checked />
      <SealCheckbox label="With sublabel" sublabel="Additional description" />
      <SealCheckbox label="Disabled" disabled />
      <SealCheckbox label="Disabled checked" disabled checked />
    </div>
  ),
}
