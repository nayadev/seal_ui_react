import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealContainer } from './SealContainer'

const CONTENT = (
  <p style={{ color: 'var(--seal-text-primary)', margin: 0 }}>
    This is a Seal UI container with token-driven surface styling.
  </p>
)

const meta = {
  title: 'Layout/SealContainer',
  component: SealContainer,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
    gradient: { control: 'text' },
    color: { control: 'color' },
    showBorder: { control: 'boolean' },
    padding: { control: 'text' },
    margin: { control: 'text' },
    borderRadius: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
} satisfies Meta<typeof SealContainer>

export default meta
type Story = StoryObj<typeof meta>

// Satisfies required `children` for Storybook type inference — overridden by each story's render.
const defaultArgs = { children: 'Content' } as const

export const Default: Story = {
  args: defaultArgs,
  render: () => <SealContainer>{CONTENT}</SealContainer>,
  parameters: {
    docs: {
      source: {
        code: `<SealContainer>
  <p>This is a Seal UI container.</p>
</SealContainer>`,
      },
    },
  },
}

export const WithGradient: Story = {
  name: 'With Gradient',
  args: defaultArgs,
  render: () => (
    <SealContainer gradient="var(--seal-gradient-surface)" showBorder={false}>
      {CONTENT}
    </SealContainer>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealContainer gradient="var(--seal-gradient-surface)" showBorder={false}>
  <p>Gradient surface container.</p>
</SealContainer>`,
      },
    },
  },
}

export const NoBorder: Story = {
  name: 'No Border',
  args: defaultArgs,
  render: () => <SealContainer showBorder={false}>{CONTENT}</SealContainer>,
  parameters: {
    docs: {
      source: {
        code: `<SealContainer showBorder={false}>
  <p>Container without a border.</p>
</SealContainer>`,
      },
    },
  },
}

export const CustomPadding: Story = {
  name: 'Custom Padding',
  args: defaultArgs,
  render: () => <SealContainer padding="var(--seal-dimension-xl)">{CONTENT}</SealContainer>,
  parameters: {
    docs: {
      source: {
        code: `<SealContainer padding="var(--seal-dimension-xl)">
  <p>Extra padding via token.</p>
</SealContainer>`,
      },
    },
  },
}

export const FixedSize: Story = {
  name: 'Fixed Size',
  args: defaultArgs,
  render: () => (
    <SealContainer width={320} height={160}>
      {CONTENT}
    </SealContainer>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealContainer width={320} height={160}>
  <p>Fixed-size container.</p>
</SealContainer>`,
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  args: defaultArgs,
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seal-dimension-lg)' }}>
      <SealContainer>{CONTENT}</SealContainer>
      <SealContainer gradient="var(--seal-gradient-surface)" showBorder={false}>
        {CONTENT}
      </SealContainer>
      <SealContainer showBorder={false}>{CONTENT}</SealContainer>
      <SealContainer padding="var(--seal-dimension-xl)" borderRadius="var(--seal-radius-lg)">
        {CONTENT}
      </SealContainer>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealContainer>{/* default */}</SealContainer>
<SealContainer gradient="var(--seal-gradient-surface)" showBorder={false}>{/* gradient */}</SealContainer>
<SealContainer showBorder={false}>{/* no border */}</SealContainer>
<SealContainer padding="var(--seal-dimension-xl)" borderRadius="var(--seal-radius-lg)">{/* custom tokens */}</SealContainer>`,
      },
    },
  },
}
