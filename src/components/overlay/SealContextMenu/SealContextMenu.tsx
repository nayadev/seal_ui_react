import * as React from 'react'

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'

// Shared class fragments — identical to SealMenubar.
const ITEM_BASE = 'relative flex cursor-pointer select-none items-center'
const ITEM_RADIUS = 'rounded-[var(--seal-radius-sm)]'
const ITEM_PADDING = 'px-[var(--seal-dimension-sm)] py-[var(--seal-dimension-xxs)]'
const ITEM_TEXT = 'text-sm text-[var(--seal-text-primary)] outline-none'
const ITEM_FOCUS = 'focus:bg-[var(--seal-surface-surface-alt)]'
const ITEM_DISABLED = 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu`. */
export interface SealContextMenuProps {
  /** The element that receives right-click / long-press to open the menu. */
  trigger: React.ReactNode
  /** Menu items rendered inside the floating panel. */
  children?: React.ReactNode
  /** Additional CSS classes applied to the content panel. */
  className?: string
}

function SealContextMenuImpl({ trigger, children, className }: Readonly<SealContextMenuProps>) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{trigger}</ContextMenuTrigger>
      <ContextMenuContent
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden',
          'rounded-[var(--seal-radius-md)] border border-[var(--seal-border-default)]',
          'bg-[var(--seal-surface-surface)] p-[var(--seal-dimension-xxs)]',
          'text-[var(--seal-text-primary)] shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'origin-[--radix-context-menu-content-transform-origin]',
          className,
        )}
      >
        {children}
      </ContextMenuContent>
    </ContextMenu>
  )
}

SealContextMenuImpl.displayName = 'SealContextMenu'

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.Item` — a single action entry. */
export interface SealContextMenuItemProps extends React.ComponentPropsWithoutRef<
  typeof ContextMenuItem
> {
  /** Adds left padding to align with items that have a leading icon or indicator. */
  inset?: boolean
}

function Item({ className, inset, ...props }: Readonly<SealContextMenuItemProps>) {
  return (
    <ContextMenuItem
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

Item.displayName = 'SealContextMenu.Item'

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.Separator` — a horizontal divider between groups. */
export type SealContextMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuSeparator
>

function Separator({ className, ...props }: Readonly<SealContextMenuSeparatorProps>) {
  return (
    <ContextMenuSeparator
      className={cn(
        '-mx-1 my-[var(--seal-dimension-xxs)] h-px bg-[var(--seal-border-default)]',
        className,
      )}
      {...props}
    />
  )
}

Separator.displayName = 'SealContextMenu.Separator'

// ---------------------------------------------------------------------------
// Label
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.Label` — a non-interactive group heading. */
export interface SealContextMenuLabelProps extends React.ComponentPropsWithoutRef<
  typeof ContextMenuLabel
> {
  /** Adds left padding to align with inset items. */
  inset?: boolean
}

function Label({ className, inset, ...props }: Readonly<SealContextMenuLabelProps>) {
  return (
    <ContextMenuLabel
      {...(inset === undefined ? {} : { inset })}
      className={cn(
        ITEM_PADDING,
        'text-xs font-semibold text-[var(--seal-text-secondary)]',
        inset === true && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

Label.displayName = 'SealContextMenu.Label'

// ---------------------------------------------------------------------------
// CheckboxItem
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.CheckboxItem` — a menu item with a checkmark indicator. */
export type SealContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuCheckboxItem
>

function CheckboxItem({
  className,
  children,
  ...props
}: Readonly<SealContextMenuCheckboxItemProps>) {
  return (
    <ContextMenuCheckboxItem
      className={cn(
        `${ITEM_BASE} ${ITEM_RADIUS}`,
        `py-[var(--seal-dimension-xxs)] pl-8 pr-[var(--seal-dimension-sm)]`,
        ITEM_TEXT,
        ITEM_FOCUS,
        ITEM_DISABLED,
        className,
      )}
      {...props}
    >
      {children}
    </ContextMenuCheckboxItem>
  )
}

CheckboxItem.displayName = 'SealContextMenu.CheckboxItem'

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.RadioGroup` — wraps a set of mutually exclusive radio items. */
export type SealContextMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuRadioGroup
>

function RadioGroup(props: Readonly<SealContextMenuRadioGroupProps>) {
  return <ContextMenuRadioGroup {...props} />
}

RadioGroup.displayName = 'SealContextMenu.RadioGroup'

// ---------------------------------------------------------------------------
// RadioItem
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.RadioItem` — a menu item that behaves like a radio button. */
export type SealContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuRadioItem
>

function RadioItem({ className, children, ...props }: Readonly<SealContextMenuRadioItemProps>) {
  return (
    <ContextMenuRadioItem
      className={cn(
        `${ITEM_BASE} ${ITEM_RADIUS}`,
        `py-[var(--seal-dimension-xxs)] pl-8 pr-[var(--seal-dimension-sm)]`,
        ITEM_TEXT,
        ITEM_FOCUS,
        ITEM_DISABLED,
        className,
      )}
      {...props}
    >
      {children}
    </ContextMenuRadioItem>
  )
}

RadioItem.displayName = 'SealContextMenu.RadioItem'

// ---------------------------------------------------------------------------
// Sub
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.Sub` — a nested submenu container. */
export type SealContextMenuSubProps = React.ComponentPropsWithoutRef<typeof ContextMenuSub>

function Sub(props: Readonly<SealContextMenuSubProps>) {
  return <ContextMenuSub {...props} />
}

Sub.displayName = 'SealContextMenu.Sub'

// ---------------------------------------------------------------------------
// SubTrigger
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.SubTrigger` — the item that opens a nested submenu. */
export interface SealContextMenuSubTriggerProps extends React.ComponentPropsWithoutRef<
  typeof ContextMenuSubTrigger
> {
  /** Adds left padding to align with inset items. */
  inset?: boolean
}

function SubTrigger({
  className,
  inset,
  children,
  ...props
}: Readonly<SealContextMenuSubTriggerProps>) {
  return (
    <ContextMenuSubTrigger
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
    </ContextMenuSubTrigger>
  )
}

SubTrigger.displayName = 'SealContextMenu.SubTrigger'

// ---------------------------------------------------------------------------
// SubContent
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.SubContent` — the panel for a nested submenu. */
export type SealContextMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuSubContent
>

function SubContent({ className, ...props }: Readonly<SealContextMenuSubContentProps>) {
  return (
    <ContextMenuSubContent
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden',
        'rounded-[var(--seal-radius-md)] border border-[var(--seal-border-default)]',
        'bg-[var(--seal-surface-surface)] p-[var(--seal-dimension-xxs)]',
        'text-[var(--seal-text-primary)] shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'origin-[--radix-context-menu-content-transform-origin]',
        className,
      )}
      {...props}
    />
  )
}

SubContent.displayName = 'SealContextMenu.SubContent'

// ---------------------------------------------------------------------------
// Shortcut
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.Shortcut` — displays a keyboard shortcut hint aligned to the right. */
export type SealContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>

function Shortcut({ className, ...props }: Readonly<SealContextMenuShortcutProps>) {
  return (
    <ContextMenuShortcut
      className={cn('ml-auto text-xs tracking-widest text-[var(--seal-text-secondary)]', className)}
      {...props}
    />
  )
}

Shortcut.displayName = 'SealContextMenu.Shortcut'

// ---------------------------------------------------------------------------
// Group / Portal (pass-through)
// ---------------------------------------------------------------------------

/** Props for `SealContextMenu.Group` — groups related items for accessibility. */
export type SealContextMenuGroupProps = React.ComponentPropsWithoutRef<typeof ContextMenuGroup>

function Group(props: Readonly<SealContextMenuGroupProps>) {
  return <ContextMenuGroup {...props} />
}

Group.displayName = 'SealContextMenu.Group'

/** Props for `SealContextMenu.Portal` — renders content in a portal outside the DOM tree. */
export type SealContextMenuPortalProps = React.ComponentPropsWithoutRef<typeof ContextMenuPortal>

function Portal(props: Readonly<SealContextMenuPortalProps>) {
  return <ContextMenuPortal {...props} />
}

Portal.displayName = 'SealContextMenu.Portal'

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Token-styled context menu built on shadcn/ui's `ContextMenu` primitives.
 *
 * Wrap any element with `trigger` to make it respond to right-click (desktop)
 * or long-press (mobile). Place `SealContextMenu.Item` and other sub-components
 * as children to compose the menu content.
 *
 * @example
 * <SealContextMenu trigger={<div>Right-click me</div>}>
 *   <SealContextMenu.Item onSelect={() => copy()}>
 *     Copy <SealContextMenu.Shortcut>⌘C</SealContextMenu.Shortcut>
 *   </SealContextMenu.Item>
 *   <SealContextMenu.Item onSelect={() => paste()}>
 *     Paste <SealContextMenu.Shortcut>⌘V</SealContextMenu.Shortcut>
 *   </SealContextMenu.Item>
 *   <SealContextMenu.Separator />
 *   <SealContextMenu.Sub>
 *     <SealContextMenu.SubTrigger>More</SealContextMenu.SubTrigger>
 *     <SealContextMenu.SubContent>
 *       <SealContextMenu.Item>Option A</SealContextMenu.Item>
 *     </SealContextMenu.SubContent>
 *   </SealContextMenu.Sub>
 * </SealContextMenu>
 */
export const SealContextMenu = Object.assign(SealContextMenuImpl, {
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
