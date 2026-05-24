import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'

import { SealIconButton } from '@/components/buttons/SealIconButton/SealIconButton'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

/**
 * Props accepted by `SealDialog` and its compound sub-components.
 */
export interface SealDialogProps {
  /** The trigger element that opens the dialog when interacted with. */
  trigger?: React.ReactNode
  /** Dialog heading text. */
  title?: React.ReactNode
  /** Secondary descriptive text rendered below the title. */
  description?: React.ReactNode
  /** Arbitrary content rendered between the description and the footer. */
  children?: React.ReactNode
  /** Action buttons rendered in the dialog footer. */
  actions?: React.ReactNode
  /**
   * Controls the open state in controlled mode.
   * Omit for uncontrolled behavior driven by the trigger.
   */
  open?: boolean
  /** Called when the open state changes. Required when `open` is provided. */
  onOpenChange?: (open: boolean) => void
  /** Additional CSS classes applied to the dialog content panel. */
  className?: string
}

// ---------------------------------------------------------------------------
// Shared content layout (used by both Default and Alert)
// ---------------------------------------------------------------------------

interface SealDialogContentProps extends SealDialogProps {
  /** When true, renders the alert variant. Reserved for future visual differentiation. */
  alert?: boolean
}

function SealDialogImpl({
  trigger,
  title,
  description,
  children,
  actions,
  open,
  onOpenChange,
  className,
}: Readonly<SealDialogContentProps>) {
  const controlledProps =
    open === undefined
      ? {}
      : {
          open,
          ...(onOpenChange === undefined ? {} : { onOpenChange }),
        }

  return (
    <Dialog {...controlledProps}>
      {trigger != null && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
            'border border-[var(--seal-border-default)]',
            'bg-[var(--seal-surface-surface)]',
            'rounded-[var(--seal-radius-lg)]',
            'p-[var(--seal-dimension-lg)]',
            'gap-[var(--seal-dimension-md)]',
            'shadow-lg',
            'duration-200',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
            'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            className,
          )}
        >
          {(title != null || description != null) && (
            <DialogHeader>
              {title != null && (
                <DialogTitle
                  className={cn(
                    'text-[var(--seal-text-primary)]',
                    'text-base font-semibold leading-snug',
                  )}
                >
                  {title}
                </DialogTitle>
              )}
              {description != null && (
                <DialogDescription className="text-[var(--seal-text-secondary)] text-sm">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}

          {children != null && (
            <div className="text-[var(--seal-text-primary)] text-sm">{children}</div>
          )}

          {actions != null && (
            <DialogFooter className="gap-[var(--seal-dimension-xs)]">{actions}</DialogFooter>
          )}

          <DialogClose asChild>
            <SealIconButton.Primary
              icon={X}
              tooltip="Close"
              className="absolute right-[var(--seal-dimension-sm)] top-[var(--seal-dimension-sm)]"
            />
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

type AlertProps = SealDialogProps

/** Standard dialog — left-aligned header, for forms and information. */
const Default = (props: SealDialogProps) => <SealDialogImpl {...props} alert={false} />
Default.displayName = 'SealDialog.Default'

/**
 * Alert variant — centered header, for confirmations and destructive actions.
 * Use when the action requires explicit user acknowledgement before proceeding.
 */
const Alert = (props: AlertProps) => <SealDialogImpl {...props} alert={true} />
Alert.displayName = 'SealDialog.Alert'

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/**
 * Re-exported primitives for advanced composition outside the opinionated wrapper.
 * Prefer `SealDialog.Default` or `SealDialog.Alert` for standard usage.
 */
export { DialogClose as SealDialogClose, DialogTrigger as SealDialogTrigger }

/**
 * Modal dialog component built on the Radix Dialog primitive with Seal token styling.
 *
 * Use `SealDialog.Default` for standard dialogs (forms, information) and
 * `SealDialog.Alert` for confirmations and destructive-action prompts.
 *
 * Pass `trigger` to let the dialog manage its own open state, or use `open` /
 * `onOpenChange` for fully controlled behavior.
 *
 * @example
 * <SealDialog.Default
 *   trigger={<SealFilledButton.Primary>Edit profile</SealFilledButton.Primary>}
 *   title="Edit profile"
 *   description="Make changes to your profile here."
 *   actions={
 *     <>
 *       <SealDialogClose asChild>
 *         <SealOutlineButton.Primary>Cancel</SealOutlineButton.Primary>
 *       </SealDialogClose>
 *       <SealFilledButton.Primary onClick={handleSave}>Save</SealFilledButton.Primary>
 *     </>
 *   }
 * />
 *
 * @example
 * <SealDialog.Alert
 *   trigger={<SealFilledButton.Primary>Delete account</SealFilledButton.Primary>}
 *   title="Are you sure?"
 *   description="This action cannot be undone."
 *   actions={<SealFilledButton.Primary onClick={handleDelete}>Delete</SealFilledButton.Primary>}
 * />
 */
export const SealDialog = Object.assign(SealDialogImpl, { Default, Alert })
