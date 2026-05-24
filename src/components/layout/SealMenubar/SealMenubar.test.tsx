import { screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealMenubar } from './SealMenubar'

function FileMenu() {
  return (
    <SealMenubar.Menu>
      <SealMenubar.Trigger>File</SealMenubar.Trigger>
      <SealMenubar.Content>
        <SealMenubar.Item>New Tab</SealMenubar.Item>
        <SealMenubar.Item>Open…</SealMenubar.Item>
        <SealMenubar.Separator />
        <SealMenubar.Item>
          Save <SealMenubar.Shortcut>⌘S</SealMenubar.Shortcut>
        </SealMenubar.Item>
      </SealMenubar.Content>
    </SealMenubar.Menu>
  )
}

function EditMenu() {
  return (
    <SealMenubar.Menu>
      <SealMenubar.Trigger>Edit</SealMenubar.Trigger>
      <SealMenubar.Content>
        <SealMenubar.Item>Undo</SealMenubar.Item>
        <SealMenubar.Item>Redo</SealMenubar.Item>
      </SealMenubar.Content>
    </SealMenubar.Menu>
  )
}

describe('SealMenubar', () => {
  describe('rendering', () => {
    it('renders without error with a single menu', () => {
      renderWithTheme(
        <SealMenubar>
          <FileMenu />
        </SealMenubar>,
      )
      expect(screen.getByText('File')).toBeInTheDocument()
    })

    it('renders multiple menu triggers', () => {
      renderWithTheme(
        <SealMenubar>
          <FileMenu />
          <EditMenu />
        </SealMenubar>,
      )
      expect(screen.getByText('File')).toBeInTheDocument()
      expect(screen.getByText('Edit')).toBeInTheDocument()
    })

    it('does not show dropdown items before trigger is clicked', () => {
      renderWithTheme(
        <SealMenubar>
          <FileMenu />
        </SealMenubar>,
      )
      expect(screen.queryByText('New Tab')).not.toBeInTheDocument()
    })
  })

  describe('sub-components', () => {
    it('renders SealMenubar.Label', () => {
      renderWithTheme(
        <SealMenubar>
          <SealMenubar.Menu>
            <SealMenubar.Trigger>View</SealMenubar.Trigger>
            <SealMenubar.Content>
              <SealMenubar.Label>Appearance</SealMenubar.Label>
              <SealMenubar.Item>Zoom In</SealMenubar.Item>
            </SealMenubar.Content>
          </SealMenubar.Menu>
        </SealMenubar>,
      )
      expect(screen.getByText('View')).toBeInTheDocument()
    })

    it('renders SealMenubar.CheckboxItem', () => {
      renderWithTheme(
        <SealMenubar>
          <SealMenubar.Menu>
            <SealMenubar.Trigger>View</SealMenubar.Trigger>
            <SealMenubar.Content>
              <SealMenubar.CheckboxItem checked={true} onCheckedChange={() => undefined}>
                Show Toolbar
              </SealMenubar.CheckboxItem>
            </SealMenubar.Content>
          </SealMenubar.Menu>
        </SealMenubar>,
      )
      expect(screen.getByText('View')).toBeInTheDocument()
    })

    it('renders SealMenubar.RadioGroup with RadioItems', () => {
      renderWithTheme(
        <SealMenubar>
          <SealMenubar.Menu>
            <SealMenubar.Trigger>Options</SealMenubar.Trigger>
            <SealMenubar.Content>
              <SealMenubar.RadioGroup value="a" onValueChange={() => undefined}>
                <SealMenubar.RadioItem value="a">Option A</SealMenubar.RadioItem>
                <SealMenubar.RadioItem value="b">Option B</SealMenubar.RadioItem>
              </SealMenubar.RadioGroup>
            </SealMenubar.Content>
          </SealMenubar.Menu>
        </SealMenubar>,
      )
      expect(screen.getByText('Options')).toBeInTheDocument()
    })

    it('renders SealMenubar.Sub and SubTrigger', () => {
      renderWithTheme(
        <SealMenubar>
          <SealMenubar.Menu>
            <SealMenubar.Trigger>File</SealMenubar.Trigger>
            <SealMenubar.Content>
              <SealMenubar.Sub>
                <SealMenubar.SubTrigger>Share</SealMenubar.SubTrigger>
                <SealMenubar.SubContent>
                  <SealMenubar.Item>Via Email</SealMenubar.Item>
                </SealMenubar.SubContent>
              </SealMenubar.Sub>
            </SealMenubar.Content>
          </SealMenubar.Menu>
        </SealMenubar>,
      )
      expect(screen.getByText('File')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('trigger has role=menuitem', () => {
      renderWithTheme(
        <SealMenubar>
          <FileMenu />
        </SealMenubar>,
      )
      expect(screen.getByRole('menuitem', { name: 'File' })).toBeInTheDocument()
    })

    it('root has role=menubar', () => {
      renderWithTheme(
        <SealMenubar>
          <FileMenu />
        </SealMenubar>,
      )
      expect(screen.getByRole('menubar')).toBeInTheDocument()
    })
  })

  describe('displayName', () => {
    it('SealMenubar has correct displayName', () => {
      expect(SealMenubar.displayName).toBe('SealMenubar')
    })

    it('SealMenubar.Trigger has correct displayName', () => {
      expect(SealMenubar.Trigger.displayName).toBe('SealMenubar.Trigger')
    })

    it('SealMenubar.Content has correct displayName', () => {
      expect(SealMenubar.Content.displayName).toBe('SealMenubar.Content')
    })

    it('SealMenubar.Item has correct displayName', () => {
      expect(SealMenubar.Item.displayName).toBe('SealMenubar.Item')
    })

    it('SealMenubar.Separator has correct displayName', () => {
      expect(SealMenubar.Separator.displayName).toBe('SealMenubar.Separator')
    })

    it('SealMenubar.Shortcut has correct displayName', () => {
      expect(SealMenubar.Shortcut.displayName).toBe('SealMenubar.Shortcut')
    })
  })
})
