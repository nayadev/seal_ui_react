import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealCard } from './SealCard'

const HEADER = <p style={{ fontWeight: 600, fontSize: '1.25rem', margin: 0 }}>Card Title</p>
const BODY = (
  <p style={{ color: 'var(--seal-text-secondary)', margin: 0 }}>
    This is the card body with some descriptive content.
  </p>
)
const FOOTER = (
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--seal-dimension-xs)' }}>
    <button
      type="button"
      style={{
        color: 'var(--seal-text-secondary)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Cancel
    </button>
    <button
      type="button"
      style={{
        background: 'var(--seal-brand-primary)',
        color: 'var(--seal-text-on-primary)',
        border: 'none',
        borderRadius: 'var(--seal-radius-sm)',
        padding: '6px 16px',
        cursor: 'pointer',
      }}
    >
      Confirm
    </button>
  </div>
)

const meta = {
  title: 'Layout/SealCard',
  component: SealCard.Default,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    header: { table: { disable: true } },
    body: { table: { disable: true } },
    footer: { table: { disable: true } },
    onClick: { table: { disable: true } },
    elevation: {
      control: 'select',
      options: [0, 2, 4, 8],
    },
  },
} satisfies Meta<typeof SealCard.Default>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SealCard.Default header={HEADER} body={BODY} footer={FOOTER} />,
  parameters: {
    docs: {
      source: {
        code: `<SealCard.Default
  header={<h3>Card Title</h3>}
  body={<p>This is the card body with some descriptive content.</p>}
  footer={<div>…footer actions…</div>}
/>`,
      },
    },
  },
}

export const Gradient: Story = {
  render: () => <SealCard.Gradient header={HEADER} body={BODY} />,
  parameters: {
    docs: {
      source: {
        code: `<SealCard.Gradient
  header={<h3>Gradient Card</h3>}
  body={<p>A card with a gradient background.</p>}
/>`,
      },
    },
  },
}

export const Tappable: Story = {
  render: () => <SealCard.Default header={HEADER} body={BODY} onClick={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<SealCard.Default
  header={<h3>Tappable Card</h3>}
  body={<p>Tap this card to trigger an action.</p>}
  onClick={() => console.log('tapped')}
/>`,
      },
    },
  },
}

export const NoBorder: Story = {
  name: 'No Border',
  render: () => <SealCard.Default header={HEADER} body={BODY} showBorder={false} />,
  parameters: {
    docs: {
      source: {
        code: `<SealCard.Default
  header={<h3>Card Title</h3>}
  body={<p>Card without a border.</p>}
  showBorder={false}
/>`,
      },
    },
  },
}

export const Flat: Story = {
  render: () => <SealCard.Default header={HEADER} body={BODY} elevation={0} />,
  parameters: {
    docs: {
      source: {
        code: `<SealCard.Default
  header={<h3>Flat Card</h3>}
  body={<p>No drop shadow.</p>}
  elevation={0}
/>`,
      },
    },
  },
}

export const BodyOnly: Story = {
  name: 'Body Only',
  render: () => <SealCard.Default body={BODY} />,
  parameters: {
    docs: {
      source: {
        code: `<SealCard.Default body={<p>Card with only a body — no header or footer.</p>} />`,
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--seal-dimension-lg)',
      }}
    >
      <SealCard.Default header={HEADER} body={BODY} footer={FOOTER} />
      <SealCard.Gradient header={HEADER} body={BODY} />
      <SealCard.Default body={BODY} onClick={() => undefined} />
      <SealCard.Default body={BODY} showBorder={false} elevation={0} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealCard.Default header={…} body={…} footer={…} />
<SealCard.Gradient header={…} body={…} />
<SealCard.Default body={…} onClick={handleTap} />
<SealCard.Default body={…} showBorder={false} elevation={0} />`,
      },
    },
  },
}
