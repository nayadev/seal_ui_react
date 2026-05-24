import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '../../../../test/utils'

import { SealContextMenu } from './SealContextMenu'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TRIGGER_LABEL = 'Right-click me'

async function rightClick(label: string) {
  const user = userEvent.setup()
  await user.pointer({ target: screen.getByText(label), keys: '[MouseRight]' })
}

// ---------------------------------------------------------------------------
// SealContextMenu
// ---------------------------------------------------------------------------

describe('SealContextMenu', () => {
  it('renders the trigger area', () => {
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.Item>Copy</SealContextMenu.Item>
      </SealContextMenu>,
    )
    expect(screen.getByText(TRIGGER_LABEL)).toBeInTheDocument()
  })

  it('does not show menu items before right-click', () => {
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.Item>Copy</SealContextMenu.Item>
      </SealContextMenu>,
    )
    expect(screen.queryByText('Copy')).not.toBeInTheDocument()
  })

  it('shows menu items after right-click', async () => {
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.Item>Copy</SealContextMenu.Item>
        <SealContextMenu.Item>Paste</SealContextMenu.Item>
      </SealContextMenu>,
    )
    await rightClick(TRIGGER_LABEL)
    expect(screen.getByText('Copy')).toBeInTheDocument()
    expect(screen.getByText('Paste')).toBeInTheDocument()
  })

  it('calls onSelect when an item is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.Item onSelect={onSelect}>Copy</SealContextMenu.Item>
      </SealContextMenu>,
    )
    await rightClick(TRIGGER_LABEL)
    await user.click(screen.getByText('Copy'))
    expect(onSelect).toHaveBeenCalledOnce()
  })

  it('renders a Separator', async () => {
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.Item>Copy</SealContextMenu.Item>
        <SealContextMenu.Separator />
        <SealContextMenu.Item>Delete</SealContextMenu.Item>
      </SealContextMenu>,
    )
    await rightClick(TRIGGER_LABEL)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders a Label', async () => {
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.Label>Actions</SealContextMenu.Label>
        <SealContextMenu.Item>Copy</SealContextMenu.Item>
      </SealContextMenu>,
    )
    await rightClick(TRIGGER_LABEL)
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders a Shortcut inside an item', async () => {
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.Item>
          Copy <SealContextMenu.Shortcut>⌘C</SealContextMenu.Shortcut>
        </SealContextMenu.Item>
      </SealContextMenu>,
    )
    await rightClick(TRIGGER_LABEL)
    expect(screen.getByText('⌘C')).toBeInTheDocument()
  })

  it('renders a CheckboxItem', async () => {
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.CheckboxItem checked={true}>Show grid</SealContextMenu.CheckboxItem>
      </SealContextMenu>,
    )
    await rightClick(TRIGGER_LABEL)
    expect(screen.getByText('Show grid')).toBeInTheDocument()
  })

  it('renders RadioGroup and RadioItems', async () => {
    renderWithTheme(
      <SealContextMenu trigger={<div>{TRIGGER_LABEL}</div>}>
        <SealContextMenu.RadioGroup value="light">
          <SealContextMenu.RadioItem value="light">Light</SealContextMenu.RadioItem>
          <SealContextMenu.RadioItem value="dark">Dark</SealContextMenu.RadioItem>
        </SealContextMenu.RadioGroup>
      </SealContextMenu>,
    )
    await rightClick(TRIGGER_LABEL)
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// displayNames
// ---------------------------------------------------------------------------

describe('SealContextMenu displayNames', () => {
  it.each([
    ['SealContextMenu', 'SealContextMenu'],
    ['Item', 'SealContextMenu.Item'],
    ['Separator', 'SealContextMenu.Separator'],
    ['Label', 'SealContextMenu.Label'],
    ['CheckboxItem', 'SealContextMenu.CheckboxItem'],
    ['RadioGroup', 'SealContextMenu.RadioGroup'],
    ['RadioItem', 'SealContextMenu.RadioItem'],
    ['Sub', 'SealContextMenu.Sub'],
    ['SubTrigger', 'SealContextMenu.SubTrigger'],
    ['SubContent', 'SealContextMenu.SubContent'],
    ['Shortcut', 'SealContextMenu.Shortcut'],
  ] as const)('SealContextMenu.%s has displayName "%s"', (key, expected) => {
    const component =
      key === 'SealContextMenu'
        ? SealContextMenu
        : SealContextMenu[key as keyof typeof SealContextMenu]
    expect((component as { displayName?: string }).displayName).toBe(expected)
  })
})
