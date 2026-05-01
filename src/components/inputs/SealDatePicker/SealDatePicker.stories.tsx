import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import type { DateRange } from './SealDatePicker'
import { SealDatePicker } from './SealDatePicker'

const meta = {
  title: 'Inputs/SealDatePicker',
  component: SealDatePicker.Single,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    closeOnSelection: { control: 'boolean' },
    allowDeselection: { control: 'boolean' },
    numberOfMonths: { control: 'number' },
  },
} satisfies Meta<typeof SealDatePicker.Single>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: { source: { code: `<SealDatePicker.Single />` } },
  },
  render: (args) => (
    <div style={{ width: '280px' }}>
      <SealDatePicker.Single {...args} />
    </div>
  ),
}

export const SingleControlled: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <SealDatePicker.Single
      selected={date}
      onSelect={(d) => setDate(d)}
    />
  )
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <div style={{ width: '280px' }}>
        <SealDatePicker.Single
          selected={date}
          onSelect={(d) => {
            setDate(d)
          }}
        />
      </div>
    )
  },
}

export const RangeControlled: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [range, setRange] = React.useState<DateRange | undefined>()
  return (
    <SealDatePicker.Range
      selected={range}
      onSelect={(r) => setRange(r)}
    />
  )
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <div style={{ width: '320px' }}>
        <SealDatePicker.Range
          selected={range}
          onSelect={(r) => {
            setRange(r)
          }}
        />
      </div>
    )
  },
}

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose a date...' },
  parameters: {
    docs: { source: { code: `<SealDatePicker.Single placeholder="Choose a date..." />` } },
  },
  render: (args) => (
    <div style={{ width: '280px' }}>
      <SealDatePicker.Single {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      source: {
        code: `<SealDatePicker.Single disabled />`,
      },
    },
  },
  render: (args) => (
    <div style={{ width: '280px' }}>
      <SealDatePicker.Single {...args} />
    </div>
  ),
}

export const TwoMonths: Story = {
  args: { numberOfMonths: 2 },
  parameters: {
    docs: {
      source: {
        code: `<SealDatePicker.Single numberOfMonths={2} />`,
      },
    },
  },
  render: (args) => (
    <div style={{ width: '280px' }}>
      <SealDatePicker.Single {...args} />
    </div>
  ),
}

export const AllVariants: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
  <SealDatePicker.Single />
  <SealDatePicker.Range />
</div>`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = React.useState<Date | undefined>()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [range, setRange] = React.useState<DateRange | undefined>()
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <div>
          <p style={{ marginBottom: '6px', fontSize: '11px', opacity: 0.6 }}>Single</p>
          <SealDatePicker.Single
            selected={date}
            onSelect={(d) => {
              setDate(d)
            }}
          />
        </div>
        <div>
          <p style={{ marginBottom: '6px', fontSize: '11px', opacity: 0.6 }}>Range</p>
          <SealDatePicker.Range
            selected={range}
            onSelect={(r) => {
              setRange(r)
            }}
          />
        </div>
        <div>
          <p style={{ marginBottom: '6px', fontSize: '11px', opacity: 0.6 }}>Disabled</p>
          <SealDatePicker.Single disabled />
        </div>
      </div>
    )
  },
}
