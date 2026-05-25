import * as React from 'react'

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { cn } from '@/lib/utils'

// Shared class fragments reused across dropdown item sub-components.
const ITEM_BASE = 'relative flex cursor-pointer select-none items-center'
const ITEM_RADIUS = 'rounded-sm'
const ITEM_PADDING = 'px-dimension-sm py-dimension-xxs'
const ITEM_TEXT = 'text-style-small text-[var(--seal-text-primary)] outline-none'
const ITEM_FOCUS = 'focus:bg-[var(--seal-surface-surface-alt)]'
const ITEM_DISABLED = 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

/** Props for the `SealMenubar` root element. */
export type SealMenubarProps = React.ComponentPropsWithoutRef<typeof Menubar>

function SealMenubarImpl({ className, ...props }: Readonly<SealMenubarProps>) {
  return (
    <Menubar
      className={cn(
        'h-auto items-center gap-0 space-x-0 rounded-md',
        'border border-[var(--seal-border-default)] bg-[var(--seal-surface-surface)]',
        'p-dimension-xxs',
        className,
      )}
      {...props}
    />
  )
}

SealMenubarImpl.displayName = 'SealMenubar'

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Menu` — groups a trigger with its dropdown content. */
export type SealMenubarMenuProps = React.ComponentPropsWithoutRef<typeof MenubarMenu>

function Menu(props: Readonly<SealMenubarMenuProps>) {
  return <MenubarMenu {...props} />
}

Menu.displayName = 'SealMenubar.Menu'

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Trigger` — the clickable label shown in the bar. */
export type SealMenubarTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarTrigger>

function Trigger({ className, ...props }: Readonly<SealMenubarTriggerProps>) {
  return (
    <MenubarTrigger
      className={cn(
        `cursor-pointer select-none ${ITEM_RADIUS}`,
        ITEM_PADDING,
        'text-style-small font-style-small text-[var(--seal-text-primary)]',
        'outline-none',
        `hover:bg-[var(--seal-surface-surface-alt)] ${ITEM_FOCUS}`,
        'data-[state=open]:bg-[var(--seal-surface-surface-alt)]',
        className,
      )}
      {...props}
    />
  )
}

Trigger.displayName = 'SealMenubar.Trigger'

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Content` — the dropdown panel for a menu. */
export type SealMenubarContentProps = React.ComponentPropsWithoutRef<typeof MenubarContent>

function Content({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: Readonly<SealMenubarContentProps>) {
  return (
    <MenubarContent
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[12rem] overflow-hidden',
        'rounded-md border border-[var(--seal-border-default)]',
        'bg-[var(--seal-surface-surface)] p-dimension-xxs',
        'text-[var(--seal-text-primary)] shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95',
        'data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'origin-[--radix-menubar-content-transform-origin]',
        className,
      )}
      {...props}
    />
  )
}

Content.displayName = 'SealMenubar.Content'

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Item` — a single action entry in the dropdown. */
export interface SealMenubarItemProps extends React.ComponentPropsWithoutRef<typeof MenubarItem> {
  /**
   * When `true`, adds left padding to align with items that have a leading icon
   * or checkbox indicator.
   */
  inset?: boolean
}

function Item({ className, inset, ...props }: Readonly<SealMenubarItemProps>) {
  return (
    <MenubarItem
      {...(inset === undefined ? {} : { inset })}
      className={cn(
        ITEM_BASE,
        ITEM_RADIUS,
        ITEM_PADDING,
        ITEM_TEXT,
        ITEM_FOCUS,
        ITEM_DISABLED,
        inset === true && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

Item.displayName = 'SealMenubar.Item'

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Separator` — a horizontal divider between groups. */
export type SealMenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof MenubarSeparator>

function Separator({ className, ...props }: Readonly<SealMenubarSeparatorProps>) {
  return (
    <MenubarSeparator
      className={cn('-mx-1 my-dimension-xxs h-px bg-[var(--seal-border-default)]', className)}
      {...props}
    />
  )
}

Separator.displayName = 'SealMenubar.Separator'

// ---------------------------------------------------------------------------
// Label
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Label` — a non-interactive group heading. */
export interface SealMenubarLabelProps extends React.ComponentPropsWithoutRef<typeof MenubarLabel> {
  /** Adds left padding to align with inset items. */
  inset?: boolean
}

function Label({ className, inset, ...props }: Readonly<SealMenubarLabelProps>) {
  return (
    <MenubarLabel
      {...(inset === undefined ? {} : { inset })}
      className={cn(
        ITEM_PADDING,
        'text-style-small font-style-small text-[var(--seal-text-secondary)]',
        inset === true && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

Label.displayName = 'SealMenubar.Label'

// ---------------------------------------------------------------------------
// CheckboxItem
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.CheckboxItem` — a menu item with a checkmark indicator. */
export type SealMenubarCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof MenubarCheckboxItem
>

function CheckboxItem({ className, children, ...props }: Readonly<SealMenubarCheckboxItemProps>) {
  return (
    <MenubarCheckboxItem
      className={cn(
        `${ITEM_BASE} ${ITEM_RADIUS}`,
        `py-dimension-xxs pl-8 pr-dimension-sm`,
        ITEM_TEXT,
        ITEM_FOCUS,
        ITEM_DISABLED,
        className,
      )}
      {...props}
    >
      {children}
    </MenubarCheckboxItem>
  )
}

CheckboxItem.displayName = 'SealMenubar.CheckboxItem'

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.RadioGroup` — wraps a set of mutually exclusive radio items. */
export type SealMenubarRadioGroupProps = React.ComponentPropsWithoutRef<typeof MenubarRadioGroup>

function RadioGroup(props: Readonly<SealMenubarRadioGroupProps>) {
  return <MenubarRadioGroup {...props} />
}

RadioGroup.displayName = 'SealMenubar.RadioGroup'

// ---------------------------------------------------------------------------
// RadioItem
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.RadioItem` — a menu item that behaves like a radio button. */
export type SealMenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof MenubarRadioItem>

function RadioItem({ className, children, ...props }: Readonly<SealMenubarRadioItemProps>) {
  return (
    <MenubarRadioItem
      className={cn(
        `${ITEM_BASE} ${ITEM_RADIUS}`,
        `py-dimension-xxs pl-8 pr-dimension-sm`,
        ITEM_TEXT,
        ITEM_FOCUS,
        ITEM_DISABLED,
        className,
      )}
      {...props}
    >
      {children}
    </MenubarRadioItem>
  )
}

RadioItem.displayName = 'SealMenubar.RadioItem'

// ---------------------------------------------------------------------------
// Sub
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Sub` — a nested submenu container. */
export type SealMenubarSubProps = React.ComponentPropsWithoutRef<typeof MenubarSub>

function Sub(props: Readonly<SealMenubarSubProps>) {
  return <MenubarSub {...props} />
}

Sub.displayName = 'SealMenubar.Sub'

// ---------------------------------------------------------------------------
// SubTrigger
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.SubTrigger` — the item that opens a nested submenu. */
export interface SealMenubarSubTriggerProps extends React.ComponentPropsWithoutRef<
  typeof MenubarSubTrigger
> {
  /** Adds left padding to align with inset items. */
  inset?: boolean
}

function SubTrigger({
  className,
  inset,
  children,
  ...props
}: Readonly<SealMenubarSubTriggerProps>) {
  return (
    <MenubarSubTrigger
      {...(inset === undefined ? {} : { inset })}
      className={cn(
        `flex cursor-pointer select-none items-center ${ITEM_RADIUS}`,
        ITEM_PADDING,
        ITEM_TEXT,
        ITEM_FOCUS,
        'data-[state=open]:bg-[var(--seal-surface-surface-alt)]',
        inset === true && 'pl-8',
        className,
      )}
      {...props}
    >
      {children}
    </MenubarSubTrigger>
  )
}

SubTrigger.displayName = 'SealMenubar.SubTrigger'

// ---------------------------------------------------------------------------
// SubContent
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.SubContent` — the panel for a nested submenu. */
export type SealMenubarSubContentProps = React.ComponentPropsWithoutRef<typeof MenubarSubContent>

function SubContent({ className, ...props }: Readonly<SealMenubarSubContentProps>) {
  return (
    <MenubarSubContent
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden',
        'rounded-md border border-[var(--seal-border-default)]',
        'bg-[var(--seal-surface-surface)] p-dimension-xxs',
        'text-[var(--seal-text-primary)] shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'origin-[--radix-menubar-content-transform-origin]',
        className,
      )}
      {...props}
    />
  )
}

SubContent.displayName = 'SealMenubar.SubContent'

// ---------------------------------------------------------------------------
// Shortcut
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Shortcut` — displays a keyboard shortcut hint aligned to the right. */
export type SealMenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>

function Shortcut({ className, ...props }: Readonly<SealMenubarShortcutProps>) {
  return (
    <MenubarShortcut
      className={cn(
        'ml-auto text-style-small tracking-widest text-[var(--seal-text-secondary)]',
        className,
      )}
      {...props}
    />
  )
}

Shortcut.displayName = 'SealMenubar.Shortcut'

// ---------------------------------------------------------------------------
// Group / Portal (pass-through)
// ---------------------------------------------------------------------------

/** Props for `SealMenubar.Group` — groups related items for accessibility. */
export type SealMenubarGroupProps = React.ComponentPropsWithoutRef<typeof MenubarGroup>

function Group(props: Readonly<SealMenubarGroupProps>) {
  return <MenubarGroup {...props} />
}

Group.displayName = 'SealMenubar.Group'

/** Props for `SealMenubar.Portal` — renders content in a portal outside the DOM tree. */
export type SealMenubarPortalProps = React.ComponentPropsWithoutRef<typeof MenubarPortal>

function Portal(props: Readonly<SealMenubarPortalProps>) {
  return <MenubarPortal {...props} />
}

Portal.displayName = 'SealMenubar.Portal'

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Token-styled horizontal menu bar built on shadcn/ui's `Menubar` primitives.
 *
 * Compose `SealMenubar.Menu`, `SealMenubar.Trigger`, and `SealMenubar.Content`
 * for each top-level entry. Nest additional sub-components inside the content
 * panel to build items, separators, labels, checkboxes, and submenus.
 *
 * @example
 * <SealMenubar>
 *   <SealMenubar.Menu>
 *     <SealMenubar.Trigger>File</SealMenubar.Trigger>
 *     <SealMenubar.Content>
 *       <SealMenubar.Item>New Tab</SealMenubar.Item>
 *       <SealMenubar.Item>Open…</SealMenubar.Item>
 *       <SealMenubar.Separator />
 *       <SealMenubar.Item>
 *         Save <SealMenubar.Shortcut>⌘S</SealMenubar.Shortcut>
 *       </SealMenubar.Item>
 *     </SealMenubar.Content>
 *   </SealMenubar.Menu>
 *
 *   <SealMenubar.Menu>
 *     <SealMenubar.Trigger>Edit</SealMenubar.Trigger>
 *     <SealMenubar.Content>
 *       <SealMenubar.Item>Undo <SealMenubar.Shortcut>⌘Z</SealMenubar.Shortcut></SealMenubar.Item>
 *       <SealMenubar.Item>Redo <SealMenubar.Shortcut>⇧⌘Z</SealMenubar.Shortcut></SealMenubar.Item>
 *     </SealMenubar.Content>
 *   </SealMenubar.Menu>
 * </SealMenubar>
 */
export const SealMenubar = Object.assign(SealMenubarImpl, {
  Menu,
  Trigger,
  Content,
  Item,
  Separator,
  Label,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  Sub,
  SubTrigger,
  SubContent,
  Shortcut,
  Group,
  Portal,
})
