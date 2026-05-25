import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'

import { cn } from '@/lib/utils'

/** The preferred side of the trigger the popover should open toward. */
export type SealPopoverSide = 'top' | 'right' | 'bottom' | 'left'

/** The alignment of the popover panel relative to the trigger. */
export type SealPopoverAlign = 'start' | 'center' | 'end'

/**
 * Props accepted by `SealPopover`.
 */
export interface SealPopoverProps {
  /** The trigger element that opens the popover when clicked. */
  trigger?: React.ReactNode
  /** Content rendered inside the floating panel. */
  children?: React.ReactNode
  /** Preferred side of the trigger to open toward. Defaults to `'bottom'`. */
  side?: SealPopoverSide
  /** Alignment of the panel relative to the trigger. Defaults to `'center'`. */
  align?: SealPopoverAlign
  /** Distance in pixels between the panel and the trigger. Defaults to `4`. */
  sideOffset?: number
  /**
   * Controls the open state in controlled mode.
   * Omit for uncontrolled behavior driven by the trigger.
   */
  open?: boolean
  /** Called when the open state changes. Required when `open` is provided. */
  onOpenChange?: (open: boolean) => void
  /** Additional CSS classes applied to the popover panel. */
  className?: string
}

/**
 * Floating popover panel built on the Radix Popover primitive with Seal token styling.
 *
 * The panel opens anchored next to `trigger`. For uncontrolled usage pass a
 * `trigger`; for fully controlled behavior use `open` and `onOpenChange`.
 * Use `SealPopoverClose` for a close button inside the panel content.
 *
 * @example
 * <SealPopover
 *   trigger={<SealFilledButton.Primary>Open</SealFilledButton.Primary>}
 *   side="bottom"
 *   align="start"
 * >
 *   <p>Popover content</p>
 * </SealPopover>
 */
export function SealPopover({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  sideOffset = 4,
  open,
  onOpenChange,
  className,
}: Readonly<SealPopoverProps>) {
  const controlledProps =
    open === undefined
      ? {}
      : {
          open,
          ...(onOpenChange === undefined ? {} : { onOpenChange }),
        }

  return (
    <PopoverPrimitive.Root {...controlledProps}>
      {trigger != null && <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 w-auto',
            'bg-[var(--seal-surface-surface)]',
            'border border-[var(--seal-border-default)]',
            'rounded-md',
            'px-dimension-md py-dimension-sm',
            'text-[var(--seal-text-primary)] text-style-small',
            'shadow-md outline-none',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            'origin-[--radix-popover-content-transform-origin]',
            className,
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

SealPopover.displayName = 'SealPopover'

/**
 * Re-exported primitive for placing a close button inside popover content.
 * Wrap with `asChild` to use a custom element.
 */
export const SealPopoverClose = PopoverPrimitive.Close
