import type { Meta, StoryObj } from '@storybook/react-vite'
import { Lock, Mail, Search, User } from 'lucide-react'
import * as React from 'react'

import { SealTextField } from './SealTextField'

const EMAIL_PLACEHOLDER = 'you@example.com'

function W({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-[320px]">{children}</div>
}

const meta = {
  title: 'Inputs/SealTextField',
  component: SealTextField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    obscureText: { control: 'boolean' },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
  },
} satisfies Meta<typeof SealTextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Type something…' },
  parameters: {
    docs: { source: { code: `<SealTextField placeholder="Type something…" />` } },
  },
  render: (args) => (
    <W>
      <SealTextField {...args} />
    </W>
  ),
}

export const WithLabel: Story = {
  args: { label: 'Email', placeholder: EMAIL_PLACEHOLDER },
  parameters: {
    docs: {
      source: {
        code: `<SealTextField label="Email" placeholder="${EMAIL_PLACEHOLDER}" />`,
      },
    },
  },
  render: (args) => (
    <W>
      <SealTextField {...args} />
    </W>
  ),
}

export const WithLeadingIcon: Story = {
  args: { label: 'Email', placeholder: EMAIL_PLACEHOLDER },
  parameters: {
    docs: {
      source: {
        code: `<SealTextField label="Email" placeholder="${EMAIL_PLACEHOLDER}" leadingIcon={Mail} />`,
      },
    },
  },
  render: ({ label, placeholder, disabled }) => (
    <W>
      <SealTextField
        {...(label !== undefined && { label })}
        {...(placeholder !== undefined && { placeholder })}
        disabled={disabled ?? false}
        leadingIcon={Mail}
      />
    </W>
  ),
}

export const WithTrailingIcon: Story = {
  args: { label: 'Search', placeholder: 'Search…' },
  parameters: {
    docs: {
      source: {
        code: `<SealTextField label="Search" placeholder="Search…" trailingIcon={Search} />`,
      },
    },
  },
  render: ({ label, placeholder, disabled }) => (
    <W>
      <SealTextField
        {...(label !== undefined && { label })}
        {...(placeholder !== undefined && { placeholder })}
        disabled={disabled ?? false}
        trailingIcon={Search}
      />
    </W>
  ),
}

export const WithBothIcons: Story = {
  args: { label: 'Search', placeholder: 'Search by name…' },
  parameters: {
    docs: {
      source: {
        code: `<SealTextField label="Search" placeholder="Search by name…" leadingIcon={User} trailingIcon={Search} />`,
      },
    },
  },
  render: ({ label, placeholder, disabled }) => (
    <W>
      <SealTextField
        {...(label !== undefined && { label })}
        {...(placeholder !== undefined && { placeholder })}
        disabled={disabled ?? false}
        leadingIcon={User}
        trailingIcon={Search}
      />
    </W>
  ),
}

export const Password: Story = {
  args: { label: 'Password', placeholder: '••••••••' },
  parameters: {
    docs: {
      source: {
        code: `<SealTextField label="Password" placeholder="••••••••" obscureText leadingIcon={Lock} />`,
      },
    },
  },
  render: ({ label, placeholder, disabled }) => (
    <W>
      <SealTextField
        {...(label !== undefined && { label })}
        {...(placeholder !== undefined && { placeholder })}
        disabled={disabled ?? false}
        obscureText
        leadingIcon={Lock}
      />
    </W>
  ),
}

export const Disabled: Story = {
  args: { label: 'Email', placeholder: EMAIL_PLACEHOLDER, disabled: true },
  parameters: {
    docs: {
      source: {
        code: `<SealTextField label="Email" placeholder="${EMAIL_PLACEHOLDER}" leadingIcon={Mail} disabled />`,
      },
    },
  },
  render: ({ label, placeholder, disabled }) => (
    <W>
      <SealTextField
        {...(label !== undefined && { label })}
        {...(placeholder !== undefined && { placeholder })}
        disabled={disabled ?? false}
        leadingIcon={Mail}
      />
    </W>
  ),
}

export const AllConfigurations: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<SealTextField placeholder="Plain input" />
<SealTextField label="With label" placeholder="${EMAIL_PLACEHOLDER}" />
<SealTextField label="Leading icon" placeholder="${EMAIL_PLACEHOLDER}" leadingIcon={Mail} />
<SealTextField label="Trailing icon" placeholder="Search…" trailingIcon={Search} />
<SealTextField label="Password" placeholder="••••••••" obscureText leadingIcon={Lock} />
<SealTextField label="Disabled" placeholder="Not editable" leadingIcon={Mail} disabled />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-[var(--seal-dimension-md)] w-[320px]">
      <SealTextField placeholder="Plain input" />
      <SealTextField label="With label" placeholder={EMAIL_PLACEHOLDER} />
      <SealTextField label="Leading icon" placeholder={EMAIL_PLACEHOLDER} leadingIcon={Mail} />
      <SealTextField label="Trailing icon" placeholder="Search…" trailingIcon={Search} />
      <SealTextField label="Password" placeholder="••••••••" obscureText leadingIcon={Lock} />
      <SealTextField label="Disabled" placeholder="Not editable" leadingIcon={Mail} disabled />
    </div>
  ),
}
