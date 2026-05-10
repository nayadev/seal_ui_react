import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealAvatar } from './SealAvatar'

const meta = {
  title: 'Layout/SealAvatar',
  component: SealAvatar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    fallback: { table: { disable: true } },
  },
} satisfies Meta<typeof SealAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SealAvatar fallback="JD" />,
  parameters: {
    docs: { source: { code: '<SealAvatar fallback="JD" />' } },
  },
}

export const WithImage: Story = {
  name: 'With Image',
  render: () => <SealAvatar src="https://i.pravatar.cc/150?u=seal" alt="Seal User" fallback="JD" />,
  parameters: {
    docs: {
      source: {
        code: '<SealAvatar src="https://i.pravatar.cc/150?u=seal" alt="Seal User" fallback="JD" />',
      },
    },
  },
}

export const Small: Story = {
  render: () => <SealAvatar.Small fallback="SM" />,
  parameters: {
    docs: { source: { code: '<SealAvatar.Small fallback="SM" />' } },
  },
}

export const Large: Story = {
  render: () => <SealAvatar.Large fallback="LG" />,
  parameters: {
    docs: { source: { code: '<SealAvatar.Large fallback="LG" />' } },
  },
}

export const AllVariants: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-[var(--seal-dimension-xl)]">
      <div className="flex flex-col items-center gap-[var(--seal-dimension-xs)]">
        <SealAvatar.Small fallback="S" />
        <span className="text-[var(--seal-text-secondary)] font-style-small">Small · 28 px</span>
      </div>
      <div className="flex flex-col items-center gap-[var(--seal-dimension-xs)]">
        <SealAvatar fallback="M" />
        <span className="text-[var(--seal-text-secondary)] font-style-small">Default · 40 px</span>
      </div>
      <div className="flex flex-col items-center gap-[var(--seal-dimension-xs)]">
        <SealAvatar.Large fallback="L" />
        <span className="text-[var(--seal-text-secondary)] font-style-small">Large · 56 px</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealAvatar.Small fallback="S" />\n<SealAvatar fallback="M" />\n<SealAvatar.Large fallback="L" />`,
      },
    },
  },
}
