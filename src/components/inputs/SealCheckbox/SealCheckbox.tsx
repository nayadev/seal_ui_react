import * as React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

/**
 * Props for `SealCheckbox`.
 *
 * Extends all Radix Checkbox Root attributes. The `checked` prop is narrowed
 * to `boolean` (no `'indeterminate'` state) and `onCheckedChange` is simplified
 * to always return `boolean` to align with the Flutter API.
 */
export interface SealCheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Checkbox>,
  'checked' | 'onCheckedChange'
> {
  /** Whether the checkbox is currently checked. */
  checked?: boolean
  /** Called when the user toggles the checkbox. */
  onCheckedChange?: (checked: boolean) => void
  /**
   * Primary label rendered to the right of the control and linked via `htmlFor`.
   * Accepts a string or any React node.
   */
  label?: React.ReactNode
  /**
   * Secondary label rendered below `label`.
   * Commonly used for a short description or disclaimer.
   */
  sublabel?: React.ReactNode
}

/**
 * Token-driven checkbox with optional primary label and secondary sublabel.
 *
 * The checkbox color follows `--seal-brand-primary`. Use `label` and `sublabel`
 * to describe the option inline — both are linked to the checkbox via `htmlFor`.
 *
 * Forwards the `ref` to the underlying Radix Checkbox Root for form library
 * compatibility (e.g. React Hook Form).
 *
 * @example
 * <SealCheckbox checked={accepted} onCheckedChange={setAccepted} label="Accept terms" />
 * <SealCheckbox
 *   checked={subscribed}
 *   onCheckedChange={setSubscribed}
 *   label="Marketing emails"
 *   sublabel="Receive news and product updates"
 * />
 */
export const SealCheckbox = React.forwardRef<
  React.ComponentRef<typeof Checkbox>,
  SealCheckboxProps
>(function SealCheckbox(
  { checked, onCheckedChange, label, sublabel, disabled, id: externalId, className, ...restProps },
  ref,
) {
  const generatedId = React.useId()
  const checkboxId = externalId ?? generatedId

  const handleCheckedChange = (value: boolean | 'indeterminate') => {
    if (value !== 'indeterminate') {
      onCheckedChange?.(value)
    }
  }

  const hasLabel = label != null
  const hasSublabel = sublabel != null

  return (
    <div className="flex items-start gap-dimension-xs">
      <Checkbox
        ref={ref}
        id={checkboxId}
        {...(checked !== undefined && { checked })}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        className={cn(
          'mt-dimension-xxxs',
          'rounded-xs',
          'border-[var(--seal-border-default)]',
          'data-[state=checked]:bg-[var(--seal-brand-primary)]',
          'data-[state=checked]:border-[var(--seal-brand-primary)]',
          'data-[state=checked]:text-[var(--seal-text-on-primary)]',
          'focus-visible:ring-[var(--seal-brand-primary)]',
          'focus-visible:ring-offset-0',
          'disabled:opacity-[var(--seal-state-disabled-opacity)]',
          className,
        )}
        {...restProps}
      />
      {(hasLabel || hasSublabel) && (
        <div className="flex flex-col gap-dimension-xxxs">
          {hasLabel && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'cursor-pointer select-none leading-none text-style-small font-style-small text-[var(--seal-text-primary)]',
                disabled === true &&
                  'cursor-not-allowed opacity-[var(--seal-state-disabled-opacity)]',
              )}
            >
              {label}
            </label>
          )}
          {hasSublabel && (
            <p className="text-style-caption font-style-caption text-[var(--seal-text-secondary)]">
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

SealCheckbox.displayName = 'SealCheckbox'
