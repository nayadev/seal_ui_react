import * as SheetPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'

import { SealIconButton } from '@/components/buttons/SealIconButton/SealIconButton'
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

/** The edge from which the sheet slides in. */
export type SealSheetSide = 'top' | 'right' | 'bottom' | 'left'

/**
 * Props accepted by `SealSheet`.
 */
export interface SealSheetProps {
  /** The edge from which the sheet slides in. Defaults to `'right'`. */
  side?: SealSheetSide
  /** Trigger element that opens the sheet when interacted with. */
  trigger?: React.ReactNode
  /** Sheet heading text. */
  title?: React.ReactNode
  /** Secondary descriptive text rendered below the title. */
  description?: React.ReactNode
  /** Arbitrary content rendered between the description and the footer. */
  children?: React.ReactNode
  /** Action buttons rendered in the sheet footer. */
  actions?: React.ReactNode
  /**
   * Controls the open state in controlled mode.
   * Omit for uncontrolled behavior driven by the trigger.
   */
  open?: boolean
  /** Called when the open state changes. Required when `open` is provided. */
  onOpenChange?: (open: boolean) => void
  /** Additional CSS classes applied to the sheet content panel. */
  className?: string
}

// ---------------------------------------------------------------------------
// Side-specific positioning and animation classes
// ---------------------------------------------------------------------------

const SIDE_CLASSES: Record<SealSheetSide, string> = {
  top: 'inset-x-0 top-0 rounded-b-[var(--seal-radius-lg)] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
  bottom:
    'inset-x-0 bottom-0 rounded-t-[var(--seal-radius-lg)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
  left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm rounded-r-[var(--seal-radius-lg)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
  right:
    'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm rounded-l-[var(--seal-radius-lg)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
}

/**
 * Slide-in sheet panel built on the Radix Dialog primitive with Seal token styling.
 *
 * The sheet slides in from any edge via the `side` prop (defaults to `'right'`).
 * It follows the same content structure as `SealDialog` — trigger, title,
 * description, body, and action buttons.
 *
 * For uncontrolled usage pass a `trigger`; for fully controlled behavior
 * use `open` and `onOpenChange`.
 *
 * @example
 * <SealSheet
 *   side="right"
 *   trigger={<SealFilledButton.Primary>Settings</SealFilledButton.Primary>}
 *   title="Settings"
 *   description="Adjust your preferences."
 *   actions={
 *     <>
 *       <SealSheetClose asChild>
 *         <SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>
 *       </SealSheetClose>
 *       <SealFilledButton.Primary onClick={handleSave}>Save</SealFilledButton.Primary>
 *     </>
 *   }
 * />
 */
export function SealSheet({
  side = 'right',
  trigger,
  title,
  description,
  children,
  actions,
  open,
  onOpenChange,
  className,
}: Readonly<SealSheetProps>) {
  const controlledProps =
    open === undefined
      ? {}
      : {
          open,
          ...(onOpenChange === undefined ? {} : { onOpenChange }),
        }

  return (
    <Sheet {...controlledProps}>
      {trigger != null && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          className={cn(
            'fixed z-50 flex flex-col',
            'bg-[var(--seal-surface-surface)]',
            'border border-[var(--seal-border-default)]',
            'p-[var(--seal-dimension-lg)]',
            'gap-[var(--seal-dimension-md)]',
            'shadow-lg',
            'transition ease-in-out',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:duration-300 data-[state=open]:duration-500',
            SIDE_CLASSES[side],
            className,
          )}
        >
          {(title != null || description != null) && (
            <SheetHeader className="text-left">
              {title != null && (
                <SheetTitle className="text-[var(--seal-text-primary)] text-base font-semibold leading-snug">
                  {title}
                </SheetTitle>
              )}
              {description != null && (
                <SheetDescription className="text-[var(--seal-text-secondary)] text-sm">
                  {description}
                </SheetDescription>
              )}
            </SheetHeader>
          )}

          {children != null && (
            <div className="flex-1 overflow-auto text-[var(--seal-text-primary)] text-sm">
              {children}
            </div>
          )}

          {actions != null && (
            <SheetFooter className="gap-[var(--seal-dimension-xs)]">{actions}</SheetFooter>
          )}

          <SheetClose asChild>
            <SealIconButton.Primary
              icon={X}
              tooltip="Close"
              className="absolute right-[var(--seal-dimension-sm)] top-[var(--seal-dimension-sm)]"
            />
          </SheetClose>
        </SheetPrimitive.Content>
      </SheetPortal>
    </Sheet>
  )
}

SealSheet.displayName = 'SealSheet'

/**
 * Re-exported primitives for advanced composition outside the opinionated wrapper.
 * Prefer passing `trigger` and `actions` to `SealSheet` for standard usage.
 */
export { SheetClose as SealSheetClose, SheetTrigger as SealSheetTrigger }
