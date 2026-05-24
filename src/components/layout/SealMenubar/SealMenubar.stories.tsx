import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealMenubar } from './SealMenubar'

const meta = {
  title: 'Layout/SealMenubar',
  component: SealMenubar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof SealMenubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SealMenubar>
      <SealMenubar.Menu>
        <SealMenubar.Trigger>File</SealMenubar.Trigger>
        <SealMenubar.Content>
          <SealMenubar.Item>
            New Tab <SealMenubar.Shortcut>⌘T</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Item>
            New Window <SealMenubar.Shortcut>⌘N</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Separator />
          <SealMenubar.Item>
            Open… <SealMenubar.Shortcut>⌘O</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Separator />
          <SealMenubar.Item>
            Save <SealMenubar.Shortcut>⌘S</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Item disabled>
            Save As… <SealMenubar.Shortcut>⇧⌘S</SealMenubar.Shortcut>
          </SealMenubar.Item>
        </SealMenubar.Content>
      </SealMenubar.Menu>

      <SealMenubar.Menu>
        <SealMenubar.Trigger>Edit</SealMenubar.Trigger>
        <SealMenubar.Content>
          <SealMenubar.Item>
            Undo <SealMenubar.Shortcut>⌘Z</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Item>
            Redo <SealMenubar.Shortcut>⇧⌘Z</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Separator />
          <SealMenubar.Item>
            Cut <SealMenubar.Shortcut>⌘X</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Item>
            Copy <SealMenubar.Shortcut>⌘C</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Item>
            Paste <SealMenubar.Shortcut>⌘V</SealMenubar.Shortcut>
          </SealMenubar.Item>
        </SealMenubar.Content>
      </SealMenubar.Menu>

      <SealMenubar.Menu>
        <SealMenubar.Trigger>View</SealMenubar.Trigger>
        <SealMenubar.Content>
          <SealMenubar.Item>
            Zoom In <SealMenubar.Shortcut>⌘+</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Item>
            Zoom Out <SealMenubar.Shortcut>⌘-</SealMenubar.Shortcut>
          </SealMenubar.Item>
          <SealMenubar.Separator />
          <SealMenubar.Item>Full Screen</SealMenubar.Item>
        </SealMenubar.Content>
      </SealMenubar.Menu>
    </SealMenubar>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealMenubar>
  <SealMenubar.Menu>
    <SealMenubar.Trigger>File</SealMenubar.Trigger>
    <SealMenubar.Content>
      <SealMenubar.Item>New Tab <SealMenubar.Shortcut>⌘T</SealMenubar.Shortcut></SealMenubar.Item>
      <SealMenubar.Separator />
      <SealMenubar.Item>Save <SealMenubar.Shortcut>⌘S</SealMenubar.Shortcut></SealMenubar.Item>
    </SealMenubar.Content>
  </SealMenubar.Menu>
  <SealMenubar.Menu>
    <SealMenubar.Trigger>Edit</SealMenubar.Trigger>
    <SealMenubar.Content>
      <SealMenubar.Item>Undo <SealMenubar.Shortcut>⌘Z</SealMenubar.Shortcut></SealMenubar.Item>
    </SealMenubar.Content>
  </SealMenubar.Menu>
</SealMenubar>`,
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => (
    <SealMenubar>
      <SealMenubar.Menu>
        <SealMenubar.Trigger>View</SealMenubar.Trigger>
        <SealMenubar.Content>
          <SealMenubar.Label>Appearance</SealMenubar.Label>
          <SealMenubar.Item>Always On Top</SealMenubar.Item>
          <SealMenubar.Item>Show Sidebar</SealMenubar.Item>
          <SealMenubar.Separator />
          <SealMenubar.Label>Zoom</SealMenubar.Label>
          <SealMenubar.Item>Zoom In</SealMenubar.Item>
          <SealMenubar.Item>Zoom Out</SealMenubar.Item>
          <SealMenubar.Item>Reset Zoom</SealMenubar.Item>
        </SealMenubar.Content>
      </SealMenubar.Menu>
    </SealMenubar>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealMenubar>
  <SealMenubar.Menu>
    <SealMenubar.Trigger>View</SealMenubar.Trigger>
    <SealMenubar.Content>
      <SealMenubar.Label>Appearance</SealMenubar.Label>
      <SealMenubar.Item>Always On Top</SealMenubar.Item>
      <SealMenubar.Separator />
      <SealMenubar.Label>Zoom</SealMenubar.Label>
      <SealMenubar.Item>Zoom In</SealMenubar.Item>
    </SealMenubar.Content>
  </SealMenubar.Menu>
</SealMenubar>`,
      },
    },
  },
}

export const WithCheckboxItems: Story = {
  render: () => (
    <SealMenubar>
      <SealMenubar.Menu>
        <SealMenubar.Trigger>View</SealMenubar.Trigger>
        <SealMenubar.Content>
          <SealMenubar.Label>Toggle</SealMenubar.Label>
          <SealMenubar.CheckboxItem checked={true} onCheckedChange={() => undefined}>
            Show Toolbar
          </SealMenubar.CheckboxItem>
          <SealMenubar.CheckboxItem checked={false} onCheckedChange={() => undefined}>
            Show Status Bar
          </SealMenubar.CheckboxItem>
          <SealMenubar.CheckboxItem checked={true} onCheckedChange={() => undefined} disabled>
            Show Activity Bar
          </SealMenubar.CheckboxItem>
        </SealMenubar.Content>
      </SealMenubar.Menu>
    </SealMenubar>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealMenubar>
  <SealMenubar.Menu>
    <SealMenubar.Trigger>View</SealMenubar.Trigger>
    <SealMenubar.Content>
      <SealMenubar.CheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
        Show Toolbar
      </SealMenubar.CheckboxItem>
      <SealMenubar.CheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
        Show Status Bar
      </SealMenubar.CheckboxItem>
    </SealMenubar.Content>
  </SealMenubar.Menu>
</SealMenubar>`,
      },
    },
  },
}

export const WithRadioItems: Story = {
  render: () => (
    <SealMenubar>
      <SealMenubar.Menu>
        <SealMenubar.Trigger>Options</SealMenubar.Trigger>
        <SealMenubar.Content>
          <SealMenubar.Label>Theme</SealMenubar.Label>
          <SealMenubar.RadioGroup value="nebula" onValueChange={() => undefined}>
            <SealMenubar.RadioItem value="nebula">Nebula</SealMenubar.RadioItem>
            <SealMenubar.RadioItem value="arctic">Arctic</SealMenubar.RadioItem>
            <SealMenubar.RadioItem value="deep-ocean">Deep Ocean</SealMenubar.RadioItem>
            <SealMenubar.RadioItem value="terminal">Terminal</SealMenubar.RadioItem>
          </SealMenubar.RadioGroup>
        </SealMenubar.Content>
      </SealMenubar.Menu>
    </SealMenubar>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealMenubar>
  <SealMenubar.Menu>
    <SealMenubar.Trigger>Options</SealMenubar.Trigger>
    <SealMenubar.Content>
      <SealMenubar.Label>Theme</SealMenubar.Label>
      <SealMenubar.RadioGroup value={theme} onValueChange={setTheme}>
        <SealMenubar.RadioItem value="nebula">Nebula</SealMenubar.RadioItem>
        <SealMenubar.RadioItem value="arctic">Arctic</SealMenubar.RadioItem>
      </SealMenubar.RadioGroup>
    </SealMenubar.Content>
  </SealMenubar.Menu>
</SealMenubar>`,
      },
    },
  },
}

export const WithSubmenu: Story = {
  render: () => (
    <SealMenubar>
      <SealMenubar.Menu>
        <SealMenubar.Trigger>File</SealMenubar.Trigger>
        <SealMenubar.Content>
          <SealMenubar.Item>New</SealMenubar.Item>
          <SealMenubar.Sub>
            <SealMenubar.SubTrigger>Share</SealMenubar.SubTrigger>
            <SealMenubar.SubContent>
              <SealMenubar.Item>Via Email</SealMenubar.Item>
              <SealMenubar.Item>Via Link</SealMenubar.Item>
              <SealMenubar.Item>Via Message</SealMenubar.Item>
            </SealMenubar.SubContent>
          </SealMenubar.Sub>
          <SealMenubar.Separator />
          <SealMenubar.Item>Print</SealMenubar.Item>
        </SealMenubar.Content>
      </SealMenubar.Menu>
    </SealMenubar>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealMenubar>
  <SealMenubar.Menu>
    <SealMenubar.Trigger>File</SealMenubar.Trigger>
    <SealMenubar.Content>
      <SealMenubar.Item>New</SealMenubar.Item>
      <SealMenubar.Sub>
        <SealMenubar.SubTrigger>Share</SealMenubar.SubTrigger>
        <SealMenubar.SubContent>
          <SealMenubar.Item>Via Email</SealMenubar.Item>
          <SealMenubar.Item>Via Link</SealMenubar.Item>
        </SealMenubar.SubContent>
      </SealMenubar.Sub>
    </SealMenubar.Content>
  </SealMenubar.Menu>
</SealMenubar>`,
      },
    },
  },
}
