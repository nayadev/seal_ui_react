import * as React from 'react'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

/**
 * A single radio option within a `SealRadioGroup`.
 *
 * Each item is identified by a string `value`. `label` and `sublabel` let you
 * describe the option inline. Setting `disabled` on an individual item prevents
 * that option from being interacted with regardless of the group's `disabled` state.
 */
export interface SealRadioItem {
  /** Unique string value submitted when this option is selected. */
  value: string
  /** Primary label rendered beside the radio button. */
  label?: React.ReactNode
  /** Secondary label rendered below `label`. */
  sublabel?: React.ReactNode
  /** Whether this individual radio button is interactive. */
  disabled?: boolean
}

/**
 * Props for `SealRadioGroup`.
 */
export interface SealRadioGroupProps {
  /** Radio options to display. */
  items: SealRadioItem[]
  /** The currently selected value (controlled). */
  value?: string
  /** Default selected value for uncontrolled usage. */
  defaultValue?: string
  /** Called when the user selects a different option. */
  onValueChange?: (value: string) => void
  /** Whether the entire group is interactive. Disables all items when `true`. */
  disabled?: boolean
  /**
   * Layout direction.
   * - `vertical`: items stacked vertically (default)
   * - `horizontal`: items in a single row
   */
  orientation?: 'vertical' | 'horizontal'
  /** Additional class names applied to the group root. */
  className?: string
  /** Accessible label for the radio group (forwarded to `aria-label`). */
  'aria-label'?: string
  /** Id of an element that labels this group (forwarded to `aria-labelledby`). */
  'aria-labelledby'?: string
}

/**
 * Token-driven radio group for mutually exclusive selections.
 *
 * Renders a list of `SealRadioItem` entries as styled radio buttons. Supports
 * both controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`)
 * usage. Individual items can be disabled independently from the group.
 *
 * The active radio color follows `--seal-brand-primary`. Disabled items respect
 * `--seal-state-disabled-opacity`.
 *
 * @example
 * <SealRadioGroup
 *   items={[
 *     { value: 'light', label: 'Light mode' },
 *     { value: 'dark', label: 'Dark mode', sublabel: 'Easier on the eyes at night' },
 *   ]}
 *   value={theme}
 *   onValueChange={setTheme}
 * />
 */
export const SealRadioGroup = React.forwardRef<HTMLDivElement, SealRadioGroupProps>(
  function SealRadioGroup(
    {
      items,
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      orientation = 'vertical',
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
    },
    ref,
  ) {
    return (
      <RadioGroup
        ref={ref}
        {...(value !== undefined && { value })}
        {...(defaultValue !== undefined && { defaultValue })}
        {...(onValueChange !== undefined && { onValueChange })}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={cn(
          orientation === 'horizontal'
            ? 'flex flex-row flex-wrap gap-[var(--seal-dimension-md)]'
            : 'flex flex-col gap-[var(--seal-dimension-xs)]',
          className,
        )}
      >
        {items.map((item) => {
          const isDisabled = disabled || (item.disabled ?? false)
          const itemId = `radio-${item.value}`

          return (
            <div key={item.value} className="flex items-start gap-[var(--seal-dimension-xs)]">
              <RadioGroupItem
                id={itemId}
                value={item.value}
                disabled={isDisabled}
                className={cn(
                  'mt-[var(--seal-dimension-xxxs)]',
                  'h-[var(--seal-dimension-md)] w-[var(--seal-dimension-md)]',
                  'rounded-[var(--seal-radius-full)]',
                  'border-[var(--seal-border-default)]',
                  'text-[var(--seal-brand-primary)]',
                  'focus-visible:ring-[var(--seal-brand-primary)]',
                  'focus-visible:ring-offset-0',
                  'disabled:opacity-[var(--seal-state-disabled-opacity)]',
                  'data-[state=checked]:border-[var(--seal-brand-primary)]',
                )}
              />
              {(item.label != null || item.sublabel != null) && (
                <div className="flex flex-col gap-[var(--seal-dimension-xxxs)]">
                  {item.label != null && (
                    <label
                      htmlFor={itemId}
                      className={cn(
                        'cursor-pointer select-none text-[length:var(--seal-constant-small-font-size)] leading-none text-[var(--seal-text-primary)]',
                        isDisabled &&
                          'cursor-not-allowed opacity-[var(--seal-state-disabled-opacity)]',
                      )}
                    >
                      {item.label}
                    </label>
                  )}
                  {item.sublabel != null && (
                    <span
                      className={cn(
                        'text-[length:var(--seal-style-caption-font-size)] text-[var(--seal-text-secondary)]',
                        isDisabled && 'opacity-[var(--seal-state-disabled-opacity)]',
                      )}
                    >
                      {item.sublabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </RadioGroup>
    )
  },
)
