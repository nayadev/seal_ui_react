import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealFilledButton } from '../../buttons/SealFilledButton'
import { SealToast } from '../SealToast'

import { SealSonner } from './SealSonner'

const POSITION_BOTTOM_RIGHT = 'bottom-right' as const

const meta = {
  title: 'Feedback/SealSonner',
  component: SealSonner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        POSITION_BOTTOM_RIGHT,
      ],
    },
    visibleToasts: { control: { type: 'number', min: 1, max: 10 } },
    offset: { control: 'number' },
  },
} satisfies Meta<typeof SealSonner>

export default meta
type Story = StoryObj<typeof meta>

// SealSonner stories demonstrate position and configuration.
// The global preview.tsx already mounts one Toaster for the iframe, so
// stories render only the trigger button — no extra <SealSonner> per story.

export const Default: Story = {
  args: { position: POSITION_BOTTOM_RIGHT, visibleToasts: 3 },
  render: () => (
    <SealFilledButton.Primary onClick={() => SealToast.info({ message: 'Hello from SealSonner!' })}>
      Show toast
    </SealFilledButton.Primary>
  ),
}

export const TopCenter: Story = {
  args: { position: 'top-center' },
  render: () => (
    <SealFilledButton.Primary onClick={() => SealToast.success({ message: 'Appears at the top!' })}>
      Top Center
    </SealFilledButton.Primary>
  ),
}

export const WithChildren: Story = {
  args: { position: POSITION_BOTTOM_RIGHT },
  render: () => (
    <SealFilledButton.Primary
      onClick={() => SealToast.success({ message: 'Children rendered inside SealSonner.' })}
    >
      Wrapped content
    </SealFilledButton.Primary>
  ),
}
