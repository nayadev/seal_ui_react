import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealSelect } from './SealSelect'

const themeOptions = [
  { value: 'nebula', label: 'Nebula' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'deep_ocean', label: 'Deep Ocean' },
  { value: 'terminal', label: 'Terminal' },
]

const THEME_PLACEHOLDER = 'Choose a theme'

const meta = {
  title: 'Inputs/SealSelect',
  component: SealSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof SealSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: themeOptions,
    placeholder: THEME_PLACEHOLDER,
  },
  parameters: {
    docs: {
      source: {
        code: `<SealSelect
  options={[
    { value: 'nebula', label: 'Nebula' },
    { value: 'arctic', label: 'Arctic' },
    { value: 'deep_ocean', label: 'Deep Ocean' },
    { value: 'terminal', label: 'Terminal' },
  ]}
  placeholder="Choose a theme"
/>`,
      },
    },
  },
  render: (args) => <SealSelect {...args} />,
}

export const WithLabel: Story = {
  args: {
    options: themeOptions,
    label: 'Theme',
    placeholder: THEME_PLACEHOLDER,
  },
  parameters: {
    docs: {
      source: {
        code: `<SealSelect
  options={themeOptions}
  label="Theme"
  placeholder="Choose a theme"
/>`,
      },
    },
  },
  render: (args) => <SealSelect {...args} />,
}

export const Controlled: Story = {
  args: { options: themeOptions, label: 'Theme' },
  parameters: {
    docs: {
      source: {
        code: `function Example() {
  const [value, setValue] = React.useState('nebula')
  return (
    <SealSelect
      options={themeOptions}
      label="Theme"
      value={value}
      onValueChange={setValue}
    />
  )
}`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('nebula')
    return (
      <SealSelect options={themeOptions} label="Theme" value={value} onValueChange={setValue} />
    )
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'nebula', label: 'Nebula' },
      { value: 'arctic', label: 'Arctic' },
      { value: 'terminal', label: 'Terminal (coming soon)', disabled: true },
    ],
    label: 'Theme',
    placeholder: THEME_PLACEHOLDER,
  },
  parameters: {
    docs: {
      source: {
        code: `<SealSelect
  options={[
    { value: 'nebula', label: 'Nebula' },
    { value: 'arctic', label: 'Arctic' },
    { value: 'terminal', label: 'Terminal (coming soon)', disabled: true },
  ]}
  label="Theme"
  placeholder="Choose a theme"
/>`,
      },
    },
  },
  render: (args) => <SealSelect {...args} />,
}

export const Disabled: Story = {
  args: {
    options: themeOptions,
    label: 'Theme',
    value: 'nebula',
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<SealSelect options={themeOptions} label="Theme" value="nebula" disabled />`,
      },
    },
  },
  render: (args) => <SealSelect {...args} />,
}

export const AllVariants: Story = {
  args: { options: themeOptions },
  parameters: {
    docs: {
      source: {
        code: `{/* No label */}
<SealSelect options={themeOptions} placeholder="Choose a theme" />

{/* With label */}
<SealSelect options={themeOptions} label="Theme" placeholder="Choose a theme" />

{/* Pre-selected */}
function PreSelected() {
  const [value, setValue] = React.useState('arctic')
  return (
    <SealSelect options={themeOptions} label="Theme" value={value} onValueChange={setValue} />
  )
}

{/* Disabled */}
<SealSelect options={themeOptions} label="Theme" value="nebula" disabled />`,
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [preSelectedValue, setPreSelectedValue] = React.useState('arctic')
    return (
      <div className="flex flex-col gap-[var(--seal-dimension-xl)] w-64">
        <div>
          <p className="mb-[var(--seal-dimension-xs)] text-sm text-[var(--seal-text-secondary)]">
            No label
          </p>
          <SealSelect options={themeOptions} placeholder={THEME_PLACEHOLDER} />
        </div>
        <div>
          <p className="mb-[var(--seal-dimension-xs)] text-sm text-[var(--seal-text-secondary)]">
            With label
          </p>
          <SealSelect options={themeOptions} label="Theme" placeholder={THEME_PLACEHOLDER} />
        </div>
        <div>
          <p className="mb-[var(--seal-dimension-xs)] text-sm text-[var(--seal-text-secondary)]">
            Pre-selected
          </p>
          <SealSelect
            options={themeOptions}
            label="Theme"
            value={preSelectedValue}
            onValueChange={setPreSelectedValue}
          />
        </div>
        <div>
          <p className="mb-[var(--seal-dimension-xs)] text-sm text-[var(--seal-text-secondary)]">
            Disabled
          </p>
          <SealSelect options={themeOptions} label="Theme" value="nebula" disabled />
        </div>
      </div>
    )
  },
}
