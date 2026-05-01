import * as React from 'react'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { cn } from '@/lib/utils'

/**
 * Props for `SealInputOTP`.
 *
 * The component follows the same composable slot API as `input-otp` — declare
 * groups via `SealInputOTP.Group` and individual character slots via
 * `SealInputOTP.Slot`. The optional `SealInputOTP.Separator` renders the
 * dot separator between groups.
 */
export interface SealInputOTPProps {
  /**
   * Maximum number of OTP characters accepted across all groups.
   * Must equal the total number of `SealInputOTP.Slot` children.
   */
  maxLength: number
  /**
   * Controlled value. When provided the component is fully controlled
   * and you must update it via `onChange`.
   */
  value?: string
  /**
   * Called with the full OTP string on every change.
   * Receives an empty string when all slots are cleared.
   */
  onChange?: (value: string) => void
  /** Disables the input when `true`. */
  disabled?: boolean
  /** Additional CSS class names for the container. */
  className?: string
  /**
   * Pattern for auto-complete. Passed through to the underlying `OTPInput`.
   * Example: `"^[0-9]*$"` restricts to digits only.
   */
  pattern?: string
  /**
   * Slot groups (`SealInputOTP.Group`) and separators (`SealInputOTP.Separator`).
   * Optional only for Storybook compatibility — the component requires at least one group at runtime.
   */
  children?: React.ReactNode
}

/** Props for `SealInputOTP.Group`. */
export interface SealInputOTPGroupProps {
  /** `SealInputOTP.Slot` elements, one per expected character. */
  children: React.ReactNode
  /** Additional CSS class names for the group container. */
  className?: string
}

/** Props for `SealInputOTP.Slot`. */
export interface SealInputOTPSlotProps {
  /**
   * Zero-based index of this slot within the overall OTP sequence.
   * Must match the slot's absolute position across all groups.
   */
  index: number
  /** Additional CSS class names for the slot element. */
  className?: string
}

function SealInputOTPImpl({
  maxLength,
  value,
  onChange,
  disabled,
  className,
  pattern,
  children,
}: Readonly<SealInputOTPProps>) {
  return (
    <InputOTP
      maxLength={maxLength}
      {...(value !== undefined && { value })}
      {...(onChange !== undefined && { onChange })}
      {...(disabled === true && { disabled: true })}
      {...(pattern !== undefined && { pattern })}
      containerClassName={cn('flex items-center gap-[var(--seal-dimension-xs)]', className)}
    >
      {children}
    </InputOTP>
  )
}

function Group({ children, className }: Readonly<SealInputOTPGroupProps>) {
  return <InputOTPGroup className={cn('flex items-center', className)}>{children}</InputOTPGroup>
}
Group.displayName = 'SealInputOTP.Group'

function Slot({ index, className }: Readonly<SealInputOTPSlotProps>) {
  return (
    <InputOTPSlot
      index={index}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center',
        'border-y border-r border-[var(--seal-border-default)]',
        'bg-[var(--seal-surface-surface)]',
        'text-sm font-medium text-[var(--seal-text-primary)]',
        'transition-all',
        'first:rounded-l-[var(--seal-radius-md)] first:border-l',
        'last:rounded-r-[var(--seal-radius-md)]',
        // Override shadcn's ring-ring with the brand primary color when active.
        'ring-[var(--seal-brand-primary)]',
        className,
      )}
    />
  )
}
Slot.displayName = 'SealInputOTP.Slot'

function Separator({ className }: Readonly<{ className?: string }>) {
  return <div role="separator" className={cn(className)} />
}
Separator.displayName = 'SealInputOTP.Separator'

/**
 * Token-driven one-time password input built on the `input-otp` library.
 *
 * Compose groups and slots to build any OTP layout. Each `SealInputOTP.Slot`
 * must declare its absolute `index` across all groups.
 *
 * @example
 * // 6-digit OTP with two groups of 3
 * <SealInputOTP maxLength={6} onChange={setValue}>
 *   <SealInputOTP.Group>
 *     <SealInputOTP.Slot index={0} />
 *     <SealInputOTP.Slot index={1} />
 *     <SealInputOTP.Slot index={2} />
 *   </SealInputOTP.Group>
 *   <SealInputOTP.Separator />
 *   <SealInputOTP.Group>
 *     <SealInputOTP.Slot index={3} />
 *     <SealInputOTP.Slot index={4} />
 *     <SealInputOTP.Slot index={5} />
 *   </SealInputOTP.Group>
 * </SealInputOTP>
 *
 * @example
 * // 4-digit pin with password masking
 * <SealInputOTP maxLength={4} mask onChange={setPin}>
 *   <SealInputOTP.Group>
 *     {[0, 1, 2, 3].map((i) => <SealInputOTP.Slot key={i} index={i} />)}
 *   </SealInputOTP.Group>
 * </SealInputOTP>
 */
export const SealInputOTP = Object.assign(SealInputOTPImpl, {
  Group,
  Slot,
  Separator,
})
