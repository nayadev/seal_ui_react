import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import type { DateRange } from './SealCalendar'
import { SealCalendar } from './SealCalendar'

const meta = {
  title: 'Inputs/SealCalendar',
  component: SealCalendar.Single,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    showOutsideDays: { control: 'boolean' },
    numberOfMonths: { control: 'number' },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
    },
  },
} satisfies Meta<typeof SealCalendar.Single>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: { source: { code: `<SealCalendar.Single />` } },
  },
  render: (args) => <SealCalendar.Single {...args} />,
}

export const SingleControlled: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <SealCalendar.Single
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
      <SealCalendar.Single
        selected={date}
        onSelect={(d) => {
          setDate(d)
        }}
      />
    )
  },
}

export const MultipleControlled: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [dates, setDates] = React.useState<Date[] | undefined>()
  return (
    <SealCalendar.Multiple
      selected={dates}
      onSelect={(ds) => setDates(ds)}
    />
  )
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [dates, setDates] = React.useState<Date[] | undefined>()
    return (
      <SealCalendar.Multiple
        selected={dates}
        onSelect={(ds) => {
          setDates(ds)
        }}
      />
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
    <SealCalendar.Range
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
      <SealCalendar.Range
        selected={range}
        onSelect={(r) => {
          setRange(r)
        }}
      />
    )
  },
}

export const TwoMonths: Story = {
  args: { numberOfMonths: 2 },
  parameters: {
    docs: { source: { code: `<SealCalendar.Single numberOfMonths={2} />` } },
  },
  render: (args) => <SealCalendar.Single {...args} />,
}

export const DropdownCaption: Story = {
  args: { captionLayout: 'dropdown' },
  parameters: {
    docs: {
      source: {
        code: `<SealCalendar.Single captionLayout="dropdown" fromMonth={new Date(2020, 0)} toMonth={new Date(2030, 11)} />`,
      },
    },
  },
  render: (args) => (
    <SealCalendar.Single {...args} fromMonth={new Date(2020, 0)} toMonth={new Date(2030, 11)} />
  ),
}

export const WithDisabledDays: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<SealCalendar.Single disabled={{ dayOfWeek: [0, 6] }} />`,
      },
    },
  },
  render: () => <SealCalendar.Single disabled={{ dayOfWeek: [0, 6] }} />,
}

export const AllVariants: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
  <SealCalendar.Single />
  <SealCalendar.Range />
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
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', opacity: 0.6 }}>Single</p>
          <SealCalendar.Single
            selected={date}
            onSelect={(d) => {
              setDate(d)
            }}
          />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', opacity: 0.6 }}>Range</p>
          <SealCalendar.Range
            selected={range}
            onSelect={(r) => {
              setRange(r)
            }}
          />
        </div>
      </div>
    )
  },
}
