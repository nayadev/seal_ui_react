import type { Meta, StoryObj } from '@storybook/react-vite'
import { RefreshCw, Rocket } from 'lucide-react'

import { SealFilledButton } from '../../buttons/SealFilledButton'
import { SealSonner } from '../SealSonner'

import { SealToast } from './SealToast'

const meta = {
  title: 'Feedback/SealToast',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Imperative toast API. Requires `<SealSonner>` in the component tree. Use `SealToast.info()`, `.success()`, `.warning()`, `.error()`, or `.custom()` to show toasts.',
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <SealSonner position="bottom-right" />
        <Story />
      </>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SealFilledButton.Primary
      onClick={() => SealToast.info({ message: 'You can add components via the CLI.' })}
    >
      Show Toast
    </SealFilledButton.Primary>
  ),
}

export const Info: Story = {
  render: () => (
    <SealFilledButton.Primary
      onClick={() => SealToast.info({ message: 'You can add components via the CLI.' })}
    >
      Show Info
    </SealFilledButton.Primary>
  ),
}

export const Success: Story = {
  render: () => (
    <SealFilledButton.Primary
      onClick={() =>
        SealToast.success({ message: 'Your changes were saved.', title: 'Profile updated' })
      }
    >
      Show Success
    </SealFilledButton.Primary>
  ),
}

export const Warning: Story = {
  render: () => (
    <SealFilledButton.Primary
      onClick={() =>
        SealToast.warning({ message: 'You have less than 1 GB remaining.', title: 'Low storage' })
      }
    >
      Show Warning
    </SealFilledButton.Primary>
  ),
}

export const ErrorVariant: Story = {
  name: 'Error',
  render: () => (
    <SealFilledButton.Primary
      onClick={() =>
        SealToast.error({
          message: 'The file could not be uploaded.',
          title: 'Upload failed',
          action: { label: 'Retry', onClick: () => undefined },
        })
      }
    >
      Show Error
    </SealFilledButton.Primary>
  ),
}

export const Custom: Story = {
  render: () => (
    <SealFilledButton.Primary
      onClick={() =>
        SealToast.custom({
          message: '42 items synced.',
          icon: RefreshCw,
          color: 'var(--seal-accent-accent)',
        })
      }
    >
      Show Custom
    </SealFilledButton.Primary>
  ),
}

export const WithAction: Story = {
  render: () => (
    <SealFilledButton.Primary
      onClick={() =>
        SealToast.error({
          message: 'Something went wrong.',
          action: { label: 'Undo', onClick: () => undefined },
        })
      }
    >
      Show with Action
    </SealFilledButton.Primary>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-[var(--seal-dimension-sm)]">
      <SealFilledButton.Primary
        onClick={() => SealToast.info({ message: 'Informational message.' })}
      >
        Info
      </SealFilledButton.Primary>
      <SealFilledButton.Accent onClick={() => SealToast.success({ message: 'Action completed!' })}>
        Success
      </SealFilledButton.Accent>
      <SealFilledButton.Primary
        onClick={() => SealToast.warning({ message: 'Proceed with caution.' })}
      >
        Warning
      </SealFilledButton.Primary>
      <SealFilledButton.Primary onClick={() => SealToast.error({ message: 'Something failed.' })}>
        Error
      </SealFilledButton.Primary>
      <SealFilledButton.Primary
        onClick={() =>
          SealToast.custom({
            message: 'Launched!',
            icon: Rocket,
            color: 'var(--seal-brand-primary)',
          })
        }
      >
        Custom
      </SealFilledButton.Primary>
    </div>
  ),
}
