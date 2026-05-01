import * as React from 'react'

import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

/**
 * Props for `SealTextarea`.
 *
 * Extends all standard `<textarea>` attributes. The native `onChange` is
 * replaced by a simpler string-based callback to mirror the Flutter API.
 */
export interface SealTextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> {
  /** Label displayed above the field and linked to the textarea via `htmlFor`. */
  label?: string
  /**
   * Whether the user can drag the resize handle to change the field height.
   * Maps to CSS `resize: vertical` (true) or `resize: none` (false).
   * @defaultValue true
   */
  resizable?: boolean
  /**
   * Called with the raw string value on every keystroke.
   * Replaces the native `onChange` event handler to simplify consumption.
   */
  onChange?: (value: string) => void
}

/**
 * Token-driven multi-line text area with optional label and resize control.
 *
 * Suitable for longer freeform inputs such as descriptions, messages, or
 * comments. The field grows vertically by default; pass `resizable={false}`
 * to disable user-controlled resizing.
 *
 * Forwards the `ref` to the underlying `<textarea>` element for compatibility
 * with form libraries such as React Hook Form.
 *
 * @example
 * <SealTextarea label="Description" placeholder="Enter a description…" />
 * <SealTextarea label="Feedback" rows={6} resizable={false} />
 */
export const SealTextarea = React.forwardRef<HTMLTextAreaElement, SealTextareaProps>(
  function SealTextarea(
    {
      label,
      resizable = true,
      disabled,
      onChange,
      className,
      id: externalId,
      style: externalStyle,
      ...restProps
    },
    ref,
  ) {
    const generatedId = React.useId()
    const textareaId = externalId ?? generatedId

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value)
    }

    return (
      <div className="flex flex-col w-full" style={{ gap: 'var(--seal-dimension-xxs)' }}>
        {label !== undefined && (
          <label
            htmlFor={textareaId}
            style={{
              fontSize: 'var(--seal-style-small-font-size)',
              fontWeight: 'var(--seal-style-small-font-weight)',
              lineHeight: 'var(--seal-style-small-line-height)',
              color: 'var(--seal-text-secondary)',
            }}
          >
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          id={textareaId}
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
            resize: resizable ? 'vertical' : 'none',
          }}
          {...restProps}
        />
      </div>
    )
  },
)

SealTextarea.displayName = 'SealTextarea'
