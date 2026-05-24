import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealSeparator } from './SealSeparator'

const TOKEN_PAD_MD = 'var(--seal-dimension-md)'
const TOKEN_PAD_SM = 'var(--seal-dimension-sm)'
const TOKEN_PAD_XL = 'var(--seal-dimension-xl)'
const TOKEN_TEXT_PRIMARY = 'var(--seal-text-primary)'
const TOKEN_TEXT_SECONDARY = 'var(--seal-text-secondary)'

const meta = {
  title: 'Layout/SealSeparator',
  component: SealSeparator.Horizontal,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    decorative: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof SealSeparator.Horizontal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ padding: TOKEN_PAD_MD }}>
      <p style={{ color: TOKEN_TEXT_PRIMARY, margin: `0 0 ${TOKEN_PAD_SM}` }}>Section A</p>
      <SealSeparator />
      <p style={{ color: TOKEN_TEXT_PRIMARY, margin: `${TOKEN_PAD_SM} 0 0` }}>Section B</p>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealSeparator />`,
      },
    },
  },
}

export const Horizontal: Story = {
  render: () => (
    <div style={{ padding: TOKEN_PAD_MD }}>
      <p style={{ color: TOKEN_TEXT_PRIMARY, margin: `0 0 ${TOKEN_PAD_SM}` }}>Above</p>
      <SealSeparator.Horizontal />
      <p style={{ color: TOKEN_TEXT_PRIMARY, margin: `${TOKEN_PAD_SM} 0 0` }}>Below</p>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealSeparator.Horizontal />`,
      },
    },
  },
}

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: TOKEN_PAD_MD,
        padding: TOKEN_PAD_MD,
        height: '40px',
      }}
    >
      <span style={{ color: TOKEN_TEXT_PRIMARY }}>Left</span>
      <SealSeparator.Vertical className="h-full" />
      <span style={{ color: TOKEN_TEXT_PRIMARY }}>Right</span>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
  <span>Left</span>
  <SealSeparator.Vertical className="h-full" />
  <span>Right</span>
</div>`,
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: TOKEN_PAD_XL }}>
      <div>
        <p style={{ color: TOKEN_TEXT_SECONDARY, margin: `0 0 ${TOKEN_PAD_SM}`, fontSize: '12px' }}>
          Horizontal
        </p>
        <SealSeparator.Horizontal />
      </div>

      <div>
        <p style={{ color: TOKEN_TEXT_SECONDARY, margin: `0 0 ${TOKEN_PAD_SM}`, fontSize: '12px' }}>
          Vertical (inside flex row)
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: TOKEN_PAD_MD, height: '32px' }}>
          <span style={{ color: TOKEN_TEXT_PRIMARY }}>Left</span>
          <SealSeparator.Vertical className="h-full" />
          <span style={{ color: TOKEN_TEXT_PRIMARY }}>Right</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealSeparator.Horizontal />

<div style={{ display: 'flex', alignItems: 'center', height: '32px' }}>
  <span>Left</span>
  <SealSeparator.Vertical className="h-full" />
  <span>Right</span>
</div>`,
      },
    },
  },
}
