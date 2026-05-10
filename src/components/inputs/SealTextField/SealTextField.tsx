import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { SealIcon } from '@/types/icon'

const ICON_SIZE = 20
const SECONDARY_COLOR = 'var(--seal-text-secondary)'
// Padding that accommodates the icon width (20px) plus gaps on each side.
const ICON_SLOT_PADDING = 'calc(var(--seal-dimension-sm) + 20px + var(--seal-dimension-xs))'

/**
 * Props for `SealTextField`.
 *
 * Extends all standard `<input>` attributes. The native `onChange` is replaced
 * by a simpler string-based callback to mirror the Flutter API.
 */
export interface SealTextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  /** Label displayed above the field and linked to the input via `htmlFor`. */
  label?: string
  /**
   * Icon rendered at the start of the field.
   * Accepts any `SealIcon`-compatible component reference.
   */
  leadingIcon?: SealIcon
  /**
   * Icon rendered at the end of the field.
   * Ignored when `obscureText` is `true` — the visibility toggle takes precedence.
   */
  trailingIcon?: SealIcon
  /**
   * Obscures input text for password fields.
   * Automatically adds a keyboard-accessible visibility-toggle button to the
   * trailing slot. Any `trailingIcon` is ignored when this is `true`.
   */
  obscureText?: boolean
  /**
   * Called with the raw string value on every keystroke.
   * Replaces the native `onChange` event handler to simplify consumption.
   */
  onChange?: (value: string) => void
}

function resolveInputType(
  obscureText: boolean,
  isObscured: boolean,
  typeProp: string | undefined,
): string {
  if (!obscureText) return typeProp ?? 'text'
  return isObscured ? 'password' : 'text'
}

/**
 * Token-driven text field with optional label, icon slots, and password toggle.
 *
 * Use `leadingIcon` and `trailingIcon` to place decorative icons inside the
 * field. When `obscureText` is `true`, a visibility-toggle button replaces the
 * `trailingIcon` and lets users reveal or hide their input.
 *
 * Forwards the `ref` to the underlying `<input>` element for compatibility
 * with form libraries such as React Hook Form.
 *
 * @example
 * <SealTextField label="Email" placeholder="you@example.com" leadingIcon={Mail} />
 * <SealTextField label="Password" placeholder="••••••••" obscureText leadingIcon={Lock} />
 */
export const SealTextField = React.forwardRef<HTMLInputElement, SealTextFieldProps>(
  function SealTextField(
    {
      label,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      obscureText = false,
      disabled,
      onChange,
      className,
      id: externalId,
      type: typeProp,
      style: externalStyle,
      ...restProps
    },
    ref,
  ) {
    const [isObscured, setIsObscured] = React.useState(obscureText)
    const generatedId = React.useId()
    const inputId = externalId ?? generatedId

    React.useEffect(() => {
      setIsObscured(obscureText)
    }, [obscureText])

    const hasLeading = Boolean(LeadingIcon)
    const hasTrailing = obscureText || Boolean(TrailingIcon)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    const inputType = resolveInputType(obscureText, isObscured, typeProp)
    const VisibilityIcon = isObscured ? EyeOff : Eye

    return (
      <div className="flex flex-col w-full" style={{ gap: 'var(--seal-dimension-xxs)' }}>
        {label !== undefined && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: 'var(--seal-style-small-font-size)',
              fontWeight: 'var(--seal-style-small-font-weight)',
              lineHeight: 'var(--seal-style-small-line-height)',
              color: SECONDARY_COLOR,
            }}
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          {LeadingIcon !== undefined && (
            <span
              className="absolute left-[var(--seal-dimension-sm)] top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
              style={{ color: SECONDARY_COLOR }}
            >
              <LeadingIcon size={ICON_SIZE} />
            </span>
          )}
          <Input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            onChange={handleChange}
            className={cn(
              'rounded-[var(--seal-radius-sm)]',
              'bg-[var(--seal-surface-surface-alt)]',
              'border-[var(--seal-border-default)]',
              'text-[var(--seal-text-primary)]',
              'placeholder:text-[var(--seal-text-secondary)]',
              'focus-visible:ring-[var(--seal-brand-primary)]',
              'focus-visible:ring-offset-0',
              'disabled:opacity-[var(--seal-state-disabled-opacity)]',
              'disabled:cursor-not-allowed',
              className,
            )}
            style={{
              ...externalStyle,
              // Icon-adjusted padding ensures text never overlaps the icon slots.
              ...(hasLeading && { paddingLeft: ICON_SLOT_PADDING }),
              ...(hasTrailing && { paddingRight: ICON_SLOT_PADDING }),
            }}
            {...restProps}
          />
          {obscureText && (
            <button
              type="button"
              onClick={() => {
                setIsObscured((v) => !v)
              }}
              aria-label={isObscured ? 'Show password' : 'Hide password'}
              className="absolute right-[var(--seal-dimension-sm)] top-1/2 -translate-y-1/2 flex items-center bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seal-brand-primary)] rounded-[var(--seal-radius-xs)]"
              style={{ color: SECONDARY_COLOR }}
            >
              <VisibilityIcon size={ICON_SIZE} aria-hidden="true" />
            </button>
          )}
          {!obscureText && TrailingIcon !== undefined && (
            <span
              className="absolute right-[var(--seal-dimension-sm)] top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
              style={{ color: SECONDARY_COLOR }}
            >
              <TrailingIcon size={ICON_SIZE} />
            </span>
          )}
        </div>
      </div>
    )
  },
)

SealTextField.displayName = 'SealTextField'
