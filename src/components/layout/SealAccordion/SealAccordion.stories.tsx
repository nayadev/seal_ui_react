import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealAccordion } from './SealAccordion'
import type { SealAccordionItemData } from './SealAccordion'

const faqItems: SealAccordionItemData[] = [
  {
    value: 'q1',
    title: 'What is Seal UI?',
    content: 'A token-driven React design system built on top of shadcn/ui.',
  },
  {
    value: 'q2',
    title: 'How do I install it?',
    content: 'Add @sealui/react to your project dependencies.',
  },
  {
    value: 'q3',
    title: 'Does it support dark mode?',
    content: 'Yes — dark mode is the primary experience, with full light theme support.',
  },
]

const designItems: SealAccordionItemData[] = [
  {
    value: 'typography',
    title: 'Typography',
    content: 'Uses Inter via Google Fonts, scaled per breakpoint using named type scale tokens.',
  },
  {
    value: 'colors',
    title: 'Colors',
    content: 'Each theme defines its own ColorPalette via CSS custom properties.',
  },
  {
    value: 'spacing',
    title: 'Spacing',
    content: 'SealDimension provides named spacing tokens ranging from xxxs (2px) to xxxl (64px).',
  },
]

const meta = {
  title: 'Layout/SealAccordion',
  component: SealAccordion,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SealAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items: faqItems },
}

export const WithInitialValue: Story = {
  name: 'With Initial Value',
  args: { items: faqItems, defaultValue: 'q2' },
}

export const NotCollapsible: Story = {
  name: 'Not Collapsible',
  args: { items: faqItems, defaultValue: 'q1', collapsible: false },
}

export const MultipleMode: Story = {
  name: 'Multiple (multi-open)',
  args: { items: designItems },
  render: () => (
    <SealAccordion.Multiple items={designItems} defaultValue={['typography', 'spacing']} />
  ),
}

export const AllVariants: Story = {
  name: 'All Variants',
  args: { items: faqItems },
  render: () => (
    <div className="flex flex-col gap-[var(--seal-dimension-xxl)]">
      <div>
        <p className="text-[var(--seal-text-secondary)] font-style-small mb-[var(--seal-dimension-md)]">
          Single (default)
        </p>
        <SealAccordion items={faqItems} />
      </div>
      <div>
        <p className="text-[var(--seal-text-secondary)] font-style-small mb-[var(--seal-dimension-md)]">
          Multiple
        </p>
        <SealAccordion.Multiple items={designItems} defaultValue={['typography']} />
      </div>
    </div>
  ),
}
