import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealTabs } from './SealTabs'

const TOKEN_PAD_MD = 'var(--seal-dimension-md)'
const TOKEN_PAD_XL = 'var(--seal-dimension-xl)'
const TOKEN_TEXT_PRIMARY = 'var(--seal-text-primary)'
const TOKEN_TEXT_SECONDARY = 'var(--seal-text-secondary)'
const TOKEN_SURFACE_ALT = 'var(--seal-surface-surface-alt)'
const TOKEN_RADIUS_SM = 'var(--seal-radius-sm)'

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
        <div
          style={{
            padding: TOKEN_PAD_MD,
            background: TOKEN_SURFACE_ALT,
            borderRadius: TOKEN_RADIUS_SM,
            color: TOKEN_TEXT_PRIMARY,
          }}
        >
          Account settings content
        </div>
      </SealTabs.Content>
      <SealTabs.Content value="security">
        <div
          style={{
            padding: TOKEN_PAD_MD,
            background: TOKEN_SURFACE_ALT,
            borderRadius: TOKEN_RADIUS_SM,
            color: TOKEN_TEXT_PRIMARY,
          }}
        >
          Security settings content
        </div>
      </SealTabs.Content>
      <SealTabs.Content value="notifications">
        <div
          style={{
            padding: TOKEN_PAD_MD,
            background: TOKEN_SURFACE_ALT,
            borderRadius: TOKEN_RADIUS_SM,
            color: TOKEN_TEXT_PRIMARY,
          }}
        >
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
        <p style={{ color: TOKEN_TEXT_PRIMARY }}>This tab is active and reachable.</p>
      </SealTabs.Content>
      <SealTabs.Content value="disabled">
        <p style={{ color: TOKEN_TEXT_PRIMARY }}>Disabled tab content (unreachable).</p>
      </SealTabs.Content>
      <SealTabs.Content value="another">
        <p style={{ color: TOKEN_TEXT_PRIMARY }}>Another tab content.</p>
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
          <p style={{ color: TOKEN_TEXT_PRIMARY }}>Content for Tab {i + 1}</p>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: TOKEN_PAD_XL }}>
      <div>
        <p
          style={{
            color: TOKEN_TEXT_SECONDARY,
            marginBottom: TOKEN_PAD_MD,
            fontSize: '12px',
          }}
        >
          Default — uncontrolled with defaultValue
        </p>
        <SealTabs defaultValue="a">
          <SealTabs.List>
            <SealTabs.Trigger value="a">Overview</SealTabs.Trigger>
            <SealTabs.Trigger value="b">Details</SealTabs.Trigger>
            <SealTabs.Trigger value="c">History</SealTabs.Trigger>
          </SealTabs.List>
          <SealTabs.Content value="a">
            <p style={{ color: TOKEN_TEXT_PRIMARY }}>Overview content</p>
          </SealTabs.Content>
          <SealTabs.Content value="b">
            <p style={{ color: TOKEN_TEXT_PRIMARY }}>Details content</p>
          </SealTabs.Content>
          <SealTabs.Content value="c">
            <p style={{ color: TOKEN_TEXT_PRIMARY }}>History content</p>
          </SealTabs.Content>
        </SealTabs>
      </div>

      <div>
        <p
          style={{
            color: TOKEN_TEXT_SECONDARY,
            marginBottom: TOKEN_PAD_MD,
            fontSize: '12px',
          }}
        >
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
            <p style={{ color: TOKEN_TEXT_PRIMARY }}>Enabled tab content</p>
          </SealTabs.Content>
          <SealTabs.Content value="z">
            <p style={{ color: TOKEN_TEXT_PRIMARY }}>Also enabled tab content</p>
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
