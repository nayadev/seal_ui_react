import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealTabs } from './SealTabs'

const meta = {
  title: 'Layout/SealTabs',
  component: SealTabs,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { control: 'text' },
    value: { control: 'text' },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof SealTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SealTabs defaultValue="account">
      <SealTabs.List>
        <SealTabs.Trigger value="account">Account</SealTabs.Trigger>
        <SealTabs.Trigger value="security">Security</SealTabs.Trigger>
        <SealTabs.Trigger value="notifications">Notifications</SealTabs.Trigger>
      </SealTabs.List>
      <SealTabs.Content value="account">
        <div className="p-dimension-md bg-[var(--seal-surface-surface-alt)] rounded-sm text-[var(--seal-text-primary)]">
          Account settings content
        </div>
      </SealTabs.Content>
      <SealTabs.Content value="security">
        <div className="p-dimension-md bg-[var(--seal-surface-surface-alt)] rounded-sm text-[var(--seal-text-primary)]">
          Security settings content
        </div>
      </SealTabs.Content>
      <SealTabs.Content value="notifications">
        <div className="p-dimension-md bg-[var(--seal-surface-surface-alt)] rounded-sm text-[var(--seal-text-primary)]">
          Notification preferences content
        </div>
      </SealTabs.Content>
    </SealTabs>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealTabs defaultValue="account">
  <SealTabs.List>
    <SealTabs.Trigger value="account">Account</SealTabs.Trigger>
    <SealTabs.Trigger value="security">Security</SealTabs.Trigger>
    <SealTabs.Trigger value="notifications">Notifications</SealTabs.Trigger>
  </SealTabs.List>
  <SealTabs.Content value="account">Account settings content</SealTabs.Content>
  <SealTabs.Content value="security">Security settings content</SealTabs.Content>
  <SealTabs.Content value="notifications">Notification preferences content</SealTabs.Content>
</SealTabs>`,
      },
    },
  },
}

export const WithDisabledTab: Story = {
  render: () => (
    <SealTabs defaultValue="active">
      <SealTabs.List>
        <SealTabs.Trigger value="active">Active</SealTabs.Trigger>
        <SealTabs.Trigger value="disabled" disabled>
          Disabled
        </SealTabs.Trigger>
        <SealTabs.Trigger value="another">Another</SealTabs.Trigger>
      </SealTabs.List>
      <SealTabs.Content value="active">
        <p className="text-[var(--seal-text-primary)]">This tab is active and reachable.</p>
      </SealTabs.Content>
      <SealTabs.Content value="disabled">
        <p className="text-[var(--seal-text-primary)]">Disabled tab content (unreachable).</p>
      </SealTabs.Content>
      <SealTabs.Content value="another">
        <p className="text-[var(--seal-text-primary)]">Another tab content.</p>
      </SealTabs.Content>
    </SealTabs>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealTabs defaultValue="active">
  <SealTabs.List>
    <SealTabs.Trigger value="active">Active</SealTabs.Trigger>
    <SealTabs.Trigger value="disabled" disabled>Disabled</SealTabs.Trigger>
    <SealTabs.Trigger value="another">Another</SealTabs.Trigger>
  </SealTabs.List>
  <SealTabs.Content value="active">This tab is active and reachable.</SealTabs.Content>
  <SealTabs.Content value="another">Another tab content.</SealTabs.Content>
</SealTabs>`,
      },
    },
  },
}

export const ManyTabs: Story = {
  render: () => (
    <SealTabs defaultValue="tab1">
      <SealTabs.List>
        {['tab1', 'tab2', 'tab3', 'tab4', 'tab5'].map((tab, i) => (
          <SealTabs.Trigger key={tab} value={tab}>
            Tab {i + 1}
          </SealTabs.Trigger>
        ))}
      </SealTabs.List>
      {['tab1', 'tab2', 'tab3', 'tab4', 'tab5'].map((tab, i) => (
        <SealTabs.Content key={tab} value={tab}>
          <p className="text-[var(--seal-text-primary)]">Content for Tab {i + 1}</p>
        </SealTabs.Content>
      ))}
    </SealTabs>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealTabs defaultValue="tab1">
  <SealTabs.List>
    <SealTabs.Trigger value="tab1">Tab 1</SealTabs.Trigger>
    <SealTabs.Trigger value="tab2">Tab 2</SealTabs.Trigger>
    <SealTabs.Trigger value="tab3">Tab 3</SealTabs.Trigger>
    <SealTabs.Trigger value="tab4">Tab 4</SealTabs.Trigger>
    <SealTabs.Trigger value="tab5">Tab 5</SealTabs.Trigger>
  </SealTabs.List>
  {/* content panels */}
</SealTabs>`,
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-dimension-xl">
      <div>
        <p className="text-[var(--seal-text-secondary)] mb-dimension-md text-style-small">
          Default — uncontrolled with defaultValue
        </p>
        <SealTabs defaultValue="a">
          <SealTabs.List>
            <SealTabs.Trigger value="a">Overview</SealTabs.Trigger>
            <SealTabs.Trigger value="b">Details</SealTabs.Trigger>
            <SealTabs.Trigger value="c">History</SealTabs.Trigger>
          </SealTabs.List>
          <SealTabs.Content value="a">
            <p className="text-[var(--seal-text-primary)]">Overview content</p>
          </SealTabs.Content>
          <SealTabs.Content value="b">
            <p className="text-[var(--seal-text-primary)]">Details content</p>
          </SealTabs.Content>
          <SealTabs.Content value="c">
            <p className="text-[var(--seal-text-primary)]">History content</p>
          </SealTabs.Content>
        </SealTabs>
      </div>

      <div>
        <p className="text-[var(--seal-text-secondary)] mb-dimension-md text-style-small">
          With a disabled tab
        </p>
        <SealTabs defaultValue="x">
          <SealTabs.List>
            <SealTabs.Trigger value="x">Enabled</SealTabs.Trigger>
            <SealTabs.Trigger value="y" disabled>
              Disabled
            </SealTabs.Trigger>
            <SealTabs.Trigger value="z">Also Enabled</SealTabs.Trigger>
          </SealTabs.List>
          <SealTabs.Content value="x">
            <p className="text-[var(--seal-text-primary)]">Enabled tab content</p>
          </SealTabs.Content>
          <SealTabs.Content value="z">
            <p className="text-[var(--seal-text-primary)]">Also enabled tab content</p>
          </SealTabs.Content>
        </SealTabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// Uncontrolled tabs
<SealTabs defaultValue="a">
  <SealTabs.List>
    <SealTabs.Trigger value="a">Overview</SealTabs.Trigger>
    <SealTabs.Trigger value="b">Details</SealTabs.Trigger>
  </SealTabs.List>
  <SealTabs.Content value="a">Overview content</SealTabs.Content>
  <SealTabs.Content value="b">Details content</SealTabs.Content>
</SealTabs>

// With disabled tab
<SealTabs defaultValue="x">
  <SealTabs.List>
    <SealTabs.Trigger value="x">Enabled</SealTabs.Trigger>
    <SealTabs.Trigger value="y" disabled>Disabled</SealTabs.Trigger>
  </SealTabs.List>
  <SealTabs.Content value="x">Enabled tab content</SealTabs.Content>
</SealTabs>`,
      },
    },
  },
}
