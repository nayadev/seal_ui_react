import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealFilledButton } from '../../buttons/SealFilledButton/SealFilledButton'
import { SealTextButton } from '../../buttons/SealTextButton/SealTextButton'

import { SealCard } from './SealCard'

const HEADER = <p className="text-style-subtitle font-style-subtitle m-0">Card Title</p>
const BODY = (
  <p className="text-[var(--seal-text-secondary)] m-0">
    This is the card body with some descriptive content.
  </p>
)
const FOOTER = (
  <div className="flex justify-end gap-dimension-xs">
    <SealTextButton.Primary onClick={() => undefined}>Cancel</SealTextButton.Primary>
    <SealFilledButton.Primary onClick={() => undefined}>Confirm</SealFilledButton.Primary>
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
  footer={
    <div className="flex justify-end gap-dimension-xs">
      <SealTextButton.Primary onClick={handleCancel}>Cancel</SealTextButton.Primary>
      <SealFilledButton.Primary onClick={handleConfirm}>Confirm</SealFilledButton.Primary>
    </div>
  }
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
    <div className="grid grid-cols-2 gap-dimension-lg">
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
