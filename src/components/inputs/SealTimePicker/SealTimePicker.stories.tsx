import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import type { SealTimeValue } from './SealTimePicker'
import { SealTimePicker } from './SealTimePicker'

const meta = {
  title: 'Inputs/SealTimePicker',
  component: SealTimePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    showHours: { control: 'boolean' },
    showMinutes: { control: 'boolean' },
    showSeconds: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SealTimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: { source: { code: `<SealTimePicker />` } },
  },
  render: () => <SealTimePicker />,
}

export const Controlled: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [time, setTime] = React.useState<SealTimeValue>({ hour: 14, minute: 30, second: 0 })
  return <SealTimePicker value={time} onChanged={setTime} />
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [time, setTime] = React.useState<SealTimeValue>({ hour: 14, minute: 30, second: 0 })
    return <SealTimePicker value={time} onChanged={setTime} />
  },
}

export const WithoutSeconds: Story = {
  args: {},
  parameters: {
    docs: { source: { code: `<SealTimePicker showSeconds={false} />` } },
  },
  render: () => <SealTimePicker showSeconds={false} />,
}

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: { source: { code: `<SealTimePicker disabled />` } },
  },
  render: () => <SealTimePicker disabled />,
}

export const Period: Story = {
  args: {},
  parameters: {
    docs: { source: { code: `<SealTimePicker.Period />` } },
  },
  render: () => <SealTimePicker.Period />,
}

export const PeriodControlled: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [time, setTime] = React.useState<SealTimeValue>({ hour: 9, minute: 0, second: 0 })
  const [period, setPeriod] = React.useState<'am' | 'pm'>('am')
  return (
    <SealTimePicker.Period
      value={time}
      onChanged={setTime}
      period={period}
      onPeriodChange={setPeriod}
    />
  )
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [time, setTime] = React.useState<SealTimeValue>({ hour: 9, minute: 0, second: 0 })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [period, setPeriod] = React.useState<'am' | 'pm'>('am')
    return (
      <SealTimePicker.Period
        value={time}
        onChanged={setTime}
        period={period}
        onPeriodChange={setPeriod}
      />
    )
  },
}

export const PeriodWithoutSeconds: Story = {
  args: {},
  parameters: {
    docs: { source: { code: `<SealTimePicker.Period showSeconds={false} defaultPeriod="pm" />` } },
  },
  render: () => <SealTimePicker.Period showSeconds={false} defaultPeriod="pm" />,
}

export const PeriodDisabled: Story = {
  args: {},
  parameters: {
    docs: { source: { code: `<SealTimePicker.Period disabled />` } },
  },
  render: () => <SealTimePicker.Period disabled />,
}

export const AllVariants: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
  <SealTimePicker />
  <SealTimePicker showSeconds={false} />
  <SealTimePicker.Period />
  <SealTimePicker.Period showSeconds={false} defaultPeriod="pm" />
  <SealTimePicker disabled />
  <SealTimePicker.Period disabled />
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SealTimePicker />
      <SealTimePicker showSeconds={false} />
      <SealTimePicker.Period />
      <SealTimePicker.Period showSeconds={false} defaultPeriod="pm" />
      <SealTimePicker disabled />
      <SealTimePicker.Period disabled />
    </div>
  ),
}
