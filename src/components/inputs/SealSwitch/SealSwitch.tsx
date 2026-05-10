import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Props for `SealSwitch`.
 *
 * Extends all Radix Switch Root attributes. The `onCheckedChange` callback is
 * simplified to always receive a `boolean` — the Radix signature is identical
 * but explicitly typed here for clarity.
 */
export interface SealSwitchProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  'onCheckedChange'
> {
  /**
   * Called when the user toggles the switch.
   *
   * If omitted, the switch is uncontrolled and manages its own state via
   * `defaultChecked`.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * Primary label rendered beside the control and linked via `htmlFor`.
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
 * Token-driven toggle switch with optional primary label and secondary sublabel.
 *
 * The track color transitions from `--seal-border-default` (off) to
 * `--seal-brand-primary` (on). The thumb uses `--seal-text-on-primary` to
 * remain legible against both track states.
 *
 * Forwards the `ref` to the underlying Radix Switch Root for form library
 * compatibility (e.g. React Hook Form).
 *
 * @example
 * <SealSwitch checked={enabled} onCheckedChange={setEnabled} label="Enable notifications" />
 * <SealSwitch
 *   checked={darkMode}
 *   onCheckedChange={setDarkMode}
 *   label="Dark mode"
 *   sublabel="Switch between dark and light themes"
 * />
 */
export const SealSwitch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SealSwitchProps
>(function SealSwitch(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    label,
    sublabel,
    id: externalId,
    className,
    ...restProps
  },
  ref,
) {
  const generatedId = React.useId()
  const switchId = externalId ?? generatedId

  const hasLabel = label != null
  const hasSublabel = sublabel != null

  return (
    <div className="flex items-start gap-[var(--seal-dimension-xs)]">
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        {...(checked !== undefined && { checked })}
        {...(defaultChecked !== undefined && { defaultChecked })}
        {...(onCheckedChange !== undefined && { onCheckedChange })}
        disabled={disabled}
        className={cn(
          'peer',
          'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center',
          'rounded-full border-2 border-transparent',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--seal-brand-primary)]',
          'focus-visible:ring-offset-2',
          'focus-visible:ring-offset-[var(--seal-surface-background)]',
          'disabled:cursor-not-allowed disabled:opacity-[var(--seal-state-disabled-opacity)]',
          'data-[state=unchecked]:bg-[var(--seal-border-default)]',
          'data-[state=checked]:bg-[var(--seal-brand-primary)]',
          className,
        )}
        {...restProps}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0',
            'transition-transform',
            'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
            'bg-[var(--seal-text-on-primary)]',
          )}
        />
      </SwitchPrimitive.Root>

      {(hasLabel || hasSublabel) && (
        <div className="flex flex-col gap-[var(--seal-dimension-xxxs)]">
          {hasLabel && (
            <label
              htmlFor={switchId}
              className={cn(
                'cursor-pointer select-none leading-none',
                disabled === true &&
                  'cursor-not-allowed opacity-[var(--seal-state-disabled-opacity)]',
              )}
              style={{
                fontSize: 'var(--seal-style-small-font-size)',
                fontWeight: 'var(--seal-style-small-font-weight)',
                color: 'var(--seal-text-primary)',
              }}
            >
              {label}
            </label>
          )}
          {hasSublabel && (
            <p
              style={{
                fontSize: 'var(--seal-style-caption-font-size)',
                fontWeight: 'var(--seal-style-caption-font-weight)',
                lineHeight: 'var(--seal-style-caption-line-height)',
                color: 'var(--seal-text-secondary)',
              }}
            >
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

SealSwitch.displayName = 'SealSwitch'
