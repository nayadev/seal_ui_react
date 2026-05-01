import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealInputOTP } from './SealInputOtp'

const meta = {
  title: 'Inputs/SealInputOtp',
  component: SealInputOTP,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    maxLength: { control: 'number' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    pattern: { control: 'text' },
    onChange: { action: 'onChange' },
  },
} satisfies Meta<typeof SealInputOTP>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { maxLength: 6 },
  parameters: {
    docs: {
      source: {
        code: `
<SealInputOTP maxLength={6} onChange={setValue}>
  <SealInputOTP.Group>
    <SealInputOTP.Slot index={0} />
    <SealInputOTP.Slot index={1} />
    <SealInputOTP.Slot index={2} />
  </SealInputOTP.Group>
  <SealInputOTP.Separator />
  <SealInputOTP.Group>
    <SealInputOTP.Slot index={3} />
    <SealInputOTP.Slot index={4} />
    <SealInputOTP.Slot index={5} />
  </SealInputOTP.Group>
</SealInputOTP>
`.trim(),
      },
    },
  },
  render: (args) => (
    <SealInputOTP {...args}>
      <SealInputOTP.Group>
        <SealInputOTP.Slot index={0} />
        <SealInputOTP.Slot index={1} />
        <SealInputOTP.Slot index={2} />
      </SealInputOTP.Group>
      <SealInputOTP.Separator />
      <SealInputOTP.Group>
        <SealInputOTP.Slot index={3} />
        <SealInputOTP.Slot index={4} />
        <SealInputOTP.Slot index={5} />
      </SealInputOTP.Group>
    </SealInputOTP>
  ),
}

export const FourDigit: Story = {
  args: { maxLength: 4 },
  parameters: {
    docs: {
      source: {
        code: `
<SealInputOTP maxLength={4} onChange={setPin}>
  <SealInputOTP.Group>
    <SealInputOTP.Slot index={0} />
    <SealInputOTP.Slot index={1} />
    <SealInputOTP.Slot index={2} />
    <SealInputOTP.Slot index={3} />
  </SealInputOTP.Group>
</SealInputOTP>
`.trim(),
      },
    },
  },
  render: (args) => (
    <SealInputOTP {...args}>
      <SealInputOTP.Group>
        <SealInputOTP.Slot index={0} />
        <SealInputOTP.Slot index={1} />
        <SealInputOTP.Slot index={2} />
        <SealInputOTP.Slot index={3} />
      </SealInputOTP.Group>
    </SealInputOTP>
  ),
}

export const Controlled: Story = {
  args: { maxLength: 6 },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('')
    return (
      <div className="flex flex-col items-center gap-4">
        <SealInputOTP
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v)
            args.onChange?.(v)
          }}
        >
          <SealInputOTP.Group>
            <SealInputOTP.Slot index={0} />
            <SealInputOTP.Slot index={1} />
            <SealInputOTP.Slot index={2} />
          </SealInputOTP.Group>
          <SealInputOTP.Separator />
          <SealInputOTP.Group>
            <SealInputOTP.Slot index={3} />
            <SealInputOTP.Slot index={4} />
            <SealInputOTP.Slot index={5} />
          </SealInputOTP.Group>
        </SealInputOTP>
        <p
          style={{
            color: 'var(--seal-text-secondary)',
            fontSize: 'var(--seal-constant-small-font-size)',
          }}
        >
          Value: {value || '—'}
        </p>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: { maxLength: 6, disabled: true },
  render: (args) => (
    <SealInputOTP {...args}>
      <SealInputOTP.Group>
        <SealInputOTP.Slot index={0} />
        <SealInputOTP.Slot index={1} />
        <SealInputOTP.Slot index={2} />
      </SealInputOTP.Group>
      <SealInputOTP.Separator />
      <SealInputOTP.Group>
        <SealInputOTP.Slot index={3} />
        <SealInputOTP.Slot index={4} />
        <SealInputOTP.Slot index={5} />
      </SealInputOTP.Group>
    </SealInputOTP>
  ),
}
