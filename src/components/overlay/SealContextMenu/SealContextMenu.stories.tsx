import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { SealContextMenu } from './SealContextMenu'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const noop = (): undefined => undefined

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Overlay/SealContextMenu',
  component: SealContextMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    trigger: null,
  },
} satisfies Meta<typeof SealContextMenu>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Shared trigger area style
// ---------------------------------------------------------------------------

const triggerAreaStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 240,
  height: 120,
  border: '2px dashed var(--seal-border-default)',
  borderRadius: 'var(--seal-radius-md)',
  color: 'var(--seal-text-secondary)',
  fontSize: '0.875rem',
  userSelect: 'none',
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <SealContextMenu trigger={<div style={triggerAreaStyle}>Right-click anywhere here</div>}>
      <SealContextMenu.Item onSelect={noop}>
        Copy <SealContextMenu.Shortcut>⌘C</SealContextMenu.Shortcut>
      </SealContextMenu.Item>
      <SealContextMenu.Item onSelect={noop}>
        Paste <SealContextMenu.Shortcut>⌘V</SealContextMenu.Shortcut>
      </SealContextMenu.Item>
      <SealContextMenu.Item onSelect={noop}>
        Cut <SealContextMenu.Shortcut>⌘X</SealContextMenu.Shortcut>
      </SealContextMenu.Item>
      <SealContextMenu.Separator />
      <SealContextMenu.Item disabled>Delete</SealContextMenu.Item>
    </SealContextMenu>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <SealContextMenu trigger={<div style={triggerAreaStyle}>Right-click anywhere here</div>}>
      <SealContextMenu.Label>Edit</SealContextMenu.Label>
      <SealContextMenu.Item onSelect={noop}>
        Copy <SealContextMenu.Shortcut>⌘C</SealContextMenu.Shortcut>
      </SealContextMenu.Item>
      <SealContextMenu.Item onSelect={noop}>
        Paste <SealContextMenu.Shortcut>⌘V</SealContextMenu.Shortcut>
      </SealContextMenu.Item>
      <SealContextMenu.Separator />
      <SealContextMenu.Label>View</SealContextMenu.Label>
      <SealContextMenu.Item onSelect={noop}>Zoom in</SealContextMenu.Item>
      <SealContextMenu.Item onSelect={noop}>Zoom out</SealContextMenu.Item>
    </SealContextMenu>
  ),
}

export const WithSubmenu: Story = {
  render: () => (
    <SealContextMenu trigger={<div style={triggerAreaStyle}>Right-click anywhere here</div>}>
      <SealContextMenu.Item onSelect={noop}>Copy</SealContextMenu.Item>
      <SealContextMenu.Item onSelect={noop}>Paste</SealContextMenu.Item>
      <SealContextMenu.Separator />
      <SealContextMenu.Sub>
        <SealContextMenu.SubTrigger>Share</SealContextMenu.SubTrigger>
        <SealContextMenu.SubContent>
          <SealContextMenu.Item onSelect={noop}>Email</SealContextMenu.Item>
          <SealContextMenu.Item onSelect={noop}>Copy link</SealContextMenu.Item>
          <SealContextMenu.Item onSelect={noop}>Message</SealContextMenu.Item>
        </SealContextMenu.SubContent>
      </SealContextMenu.Sub>
    </SealContextMenu>
  ),
}

export const WithCheckboxAndRadio: Story = {
  render: () => <CheckboxRadioDemo />,
}

function CheckboxRadioDemo() {
  const [showGrid, setShowGrid] = React.useState(false)
  const [showRulers, setShowRulers] = React.useState(true)
  const [theme, setTheme] = React.useState('dark')

  return (
    <SealContextMenu trigger={<div style={triggerAreaStyle}>Right-click anywhere here</div>}>
      <SealContextMenu.Label>View options</SealContextMenu.Label>
      <SealContextMenu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
        Show grid
      </SealContextMenu.CheckboxItem>
      <SealContextMenu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
        Show rulers
      </SealContextMenu.CheckboxItem>
      <SealContextMenu.Separator />
      <SealContextMenu.Label>Theme</SealContextMenu.Label>
      <SealContextMenu.RadioGroup value={theme} onValueChange={setTheme}>
        <SealContextMenu.RadioItem value="light">Light</SealContextMenu.RadioItem>
        <SealContextMenu.RadioItem value="dark">Dark</SealContextMenu.RadioItem>
        <SealContextMenu.RadioItem value="system">System</SealContextMenu.RadioItem>
      </SealContextMenu.RadioGroup>
    </SealContextMenu>
  )
}
