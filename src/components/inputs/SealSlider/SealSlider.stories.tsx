import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealSlider } from './SealSlider'

const meta = {
  title: 'Inputs/SealSlider',
  component: SealSlider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    defaultValue: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    onValueChange: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SealSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: 50, min: 0, max: 100, 'aria-label': 'Volume' },
  parameters: {
    docs: {
      source: {
        code: `<SealSlider defaultValue={50} min={0} max={100} aria-label="Volume" />`,
      },
    },
  },
  render: (args) => <SealSlider {...args} />,
}

export const WithStep: Story = {
  args: { defaultValue: 40, min: 0, max: 100, step: 10, 'aria-label': 'Steps' },
  parameters: {
    docs: {
      source: {
        code: `<SealSlider defaultValue={40} min={0} max={100} step={10} aria-label="Steps" />`,
      },
    },
  },
  render: (args) => <SealSlider {...args} />,
}

export const Disabled: Story = {
  args: { defaultValue: 30, disabled: true, 'aria-label': 'Disabled slider' },
  parameters: {
    docs: {
      source: {
        code: `<SealSlider defaultValue={30} disabled aria-label="Disabled slider" />`,
      },
    },
  },
  render: (args) => <SealSlider {...args} />,
}

export const CustomRange: Story = {
  args: { defaultValue: 50, min: -100, max: 100, step: 1, 'aria-label': 'Pan' },
  parameters: {
    docs: {
      source: {
        code: `<SealSlider defaultValue={50} min={-100} max={100} step={1} aria-label="Pan" />`,
      },
    },
  },
  render: (args) => <SealSlider {...args} />,
}

function ControlledExample() {
  const [gain, setGain] = React.useState(50)
  return (
    <div className="flex flex-col gap-3">
      <SealSlider value={gain} onValueChange={setGain} min={0} max={100} aria-label="Gain" />
      <span className="text-sm" style={{ color: 'var(--seal-text-secondary)' }}>
        Gain: {gain}
      </span>
    </div>
  )
}

export const Controlled: Story = {
  args: { min: 0, max: 100, 'aria-label': 'Gain' },
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [gain, setGain] = React.useState(50)

  return (
    <div className="flex flex-col gap-3">
      <SealSlider value={gain} onValueChange={setGain} min={0} max={100} aria-label="Gain" />
      <span>Gain: {gain}</span>
    </div>
  )
}`,
      },
    },
  },
  render: () => <ControlledExample />,
}
