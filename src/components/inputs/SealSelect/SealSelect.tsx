import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const TEXT_PRIMARY = 'text-[var(--seal-text-primary)]'
const ROUNDED_SM = 'rounded-[var(--seal-radius-sm)]'
const BORDER_DEFAULT = 'border-[var(--seal-border-default)]'

/**
 * A single option available within a `SealSelect` dropdown.
 */
export interface SealSelectOption {
  /** Unique string value submitted when this option is chosen. */
  value: string
  /** Human-readable label shown in the dropdown and in the trigger when selected. */
  label: string
  /** Whether this option is non-interactive. */
  disabled?: boolean
}

/**
 * Props for `SealSelect`.
 */
export interface SealSelectProps {
  /** Options to display in the dropdown. */
  options: SealSelectOption[]
  /** The currently selected value (controlled). */
  value?: string
  /** Default selected value for uncontrolled usage. */
  defaultValue?: string
  /** Called when the user selects a different option. */
  onValueChange?: (value: string) => void
  /** Text shown in the trigger when no option is selected. */
  placeholder?: string
  /** Optional label rendered above the trigger and linked via `htmlFor`. */
  label?: string
  /** Whether the control is interactive. */
  disabled?: boolean
  /** Additional class names applied to the trigger element. */
  className?: string
  /** Forwarded to the underlying Radix Select Root `name` attribute for form submission. */
  name?: string
  /** Accessible label for the trigger (forwarded to `aria-label`). */
  'aria-label'?: string
}

/**
 * Token-driven dropdown select for single-value selection.
 *
 * Renders a list of `SealSelectOption` entries inside a styled dropdown.
 * Supports both controlled (`value` + `onValueChange`) and uncontrolled
 * (`defaultValue`) usage. An optional `label` is rendered above the trigger
 * and linked to it via `htmlFor` for accessibility.
 *
 * The trigger color and border follow the Seal token system. The dropdown
 * surface uses `--seal-surface-surface` and the selected item is highlighted
 * with `--seal-brand-primary`.
 *
 * @example
 * <SealSelect
 *   label="Theme"
 *   placeholder="Choose a theme"
 *   options={[
 *     { value: 'nebula', label: 'Nebula' },
 *     { value: 'arctic', label: 'Arctic' },
 *   ]}
 *   value={theme}
 *   onValueChange={setTheme}
 * />
 */
export const SealSelect = React.forwardRef<HTMLButtonElement, SealSelectProps>(function SealSelect(
  {
    options,
    value,
    defaultValue,
    onValueChange,
    placeholder,
    label,
    disabled = false,
    className,
    name,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const generatedId = React.useId()
  const triggerId = generatedId

  return (
    <div className="flex flex-col gap-[var(--seal-dimension-xs)]">
      {label != null && (
        <label
          htmlFor={triggerId}
          className={cn(
            'text-[length:var(--seal-constant-small-font-size)] font-[var(--seal-style-small-font-weight)] leading-none text-[var(--seal-text-secondary)]',
            disabled && 'cursor-not-allowed opacity-[var(--seal-state-disabled-opacity)]',
          )}
        >
          {label}
        </label>
      )}
      <Select
        {...(value != null && { value })}
        {...(defaultValue != null && { defaultValue })}
        {...(onValueChange != null && { onValueChange })}
        {...(name != null && { name })}
        disabled={disabled}
      >
        <SelectTrigger
          id={triggerId}
          ref={ref}
          aria-label={ariaLabel}
          className={cn(
            'h-[calc(var(--seal-dimension-md)*2+var(--seal-dimension-xs))]',
            ROUNDED_SM,
            BORDER_DEFAULT,
            'bg-[var(--seal-surface-surface)]',
            'px-[var(--seal-dimension-sm)]',
            'text-[length:var(--seal-constant-small-font-size)]',
            TEXT_PRIMARY,
            'ring-offset-transparent',
            'placeholder:text-[var(--seal-text-secondary)]',
            'data-[placeholder]:text-[var(--seal-text-secondary)]',
            'focus:border-[var(--seal-brand-primary)]',
            'focus:ring-[var(--seal-brand-primary)]',
            'focus:ring-1',
            'focus:ring-offset-0',
            'disabled:opacity-[var(--seal-state-disabled-opacity)]',
            'hover:border-[var(--seal-brand-primary)]',
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className={cn(
            ROUNDED_SM,
            BORDER_DEFAULT,
            'bg-[var(--seal-surface-surface)]',
            TEXT_PRIMARY,
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled ?? false}
              className={cn(
                'text-[length:var(--seal-constant-small-font-size)]',
                TEXT_PRIMARY,
                'rounded-[var(--seal-radius-xs)]',
                'focus:bg-[var(--seal-surface-surface-alt)]',
                'focus:text-[var(--seal-text-primary)]',
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
})
