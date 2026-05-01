import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealTextarea } from './SealTextarea'

const meta = {
  title: 'Inputs/SealTextarea',
  component: SealTextarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    resizable: { control: 'boolean' },
    rows: { control: 'number' },
  },
} satisfies Meta<typeof SealTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Type something…' },
  parameters: {
    docs: { source: { code: `<SealTextarea placeholder="Type something…" />` } },
  },
  render: (args) => (
    <div className="w-[400px]">
      <SealTextarea {...args} />
    </div>
  ),
}

export const WithLabel: Story = {
  args: { label: 'Description', placeholder: 'Enter a description…' },
  parameters: {
    docs: {
      source: {
        code: `<SealTextarea label="Description" placeholder="Enter a description…" />`,
      },
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <SealTextarea {...args} />
    </div>
  ),
}

export const Taller: Story = {
  args: { label: 'Message', placeholder: 'Write your message…', rows: 6 },
  parameters: {
    docs: {
      source: {
        code: `<SealTextarea label="Message" placeholder="Write your message…" rows={6} />`,
      },
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <SealTextarea {...args} />
    </div>
  ),
}

export const NonResizable: Story = {
  args: {
    label: 'Fixed height',
    placeholder: 'This field cannot be resized.',
    resizable: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<SealTextarea label="Fixed height" placeholder="This field cannot be resized." resizable={false} />`,
      },
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <SealTextarea {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Description',
    placeholder: 'Not editable.',
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<SealTextarea label="Description" placeholder="Not editable." disabled />`,
      },
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <SealTextarea {...args} />
    </div>
  ),
}

export const AllConfigurations: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<SealTextarea placeholder="Plain textarea" />
<SealTextarea label="With label" placeholder="Enter a description…" />
<SealTextarea label="Taller" placeholder="Write your message…" rows={6} />
<SealTextarea label="Non-resizable" placeholder="Fixed size." resizable={false} />
<SealTextarea label="Disabled" placeholder="Not editable." disabled />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-[var(--seal-dimension-md)] w-[400px]">
      <SealTextarea placeholder="Plain textarea" />
      <SealTextarea label="With label" placeholder="Enter a description…" />
      <SealTextarea label="Taller" placeholder="Write your message…" rows={6} />
      <SealTextarea label="Non-resizable" placeholder="Fixed size." resizable={false} />
      <SealTextarea label="Disabled" placeholder="Not editable." disabled />
    </div>
  ),
}
