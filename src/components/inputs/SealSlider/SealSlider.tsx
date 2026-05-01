import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Props for `SealSlider`.
 *
 * Supports both controlled (`value` + `onValueChange`) and uncontrolled
 * (`defaultValue`) patterns. Only one of `value` or `defaultValue` should be
 * provided at a time; providing `value` makes the component fully controlled.
 */
export interface SealSliderProps {
  /**
   * Controlled thumb position. When provided, the parent component owns the
   * value and must update it via `onValueChange` to reflect user interaction.
   */
  value?: number
  /**
   * Initial thumb position for uncontrolled usage.
   * Ignored when `value` is provided.
   */
  defaultValue?: number
  /** Minimum selectable value. Defaults to `0`. */
  min?: number
  /** Maximum selectable value. Defaults to `100`. */
  max?: number
  /**
   * Snap interval between valid thumb positions.
   *
   * `undefined` means continuous movement. Set to `1` for integer-only
   * positions, or any positive number for discrete steps.
   */
  step?: number
  /** Whether the slider accepts user interaction. */
  disabled?: boolean
  /**
   * Called continuously as the user drags the thumb or moves it via keyboard.
   * Fires on every position change, including programmatic updates.
   */
  onValueChange?: (value: number) => void
  /**
   * Called once when the user releases the thumb or presses Enter/Space after
   * a keyboard move. Use this instead of `onValueChange` when only the final
   * committed value matters (e.g. triggering a network request).
   */
  onValueCommit?: (value: number) => void
  /** Additional class names applied to the slider root element. */
  className?: string
  /** Forwarded to the underlying Radix Root for form identification. */
  id?: string
  /** Forwarded to the hidden input so the value is submitted with a form. */
  name?: string
  /**
   * Accessible label when no visible label element describes the slider.
   * Applied to the thumb, which carries the WAI-ARIA `slider` role.
   */
  'aria-label'?: string
  /**
   * ID of an external element that labels this slider.
   * Takes precedence over `aria-label` when both are present.
   */
  'aria-labelledby'?: string
  /**
   * Human-readable text representation of the current value shown to screen
   * readers instead of the raw number (e.g. `"50%"` or `"medium"`).
   */
  'aria-valuetext'?: string
}

/**
 * Token-driven range slider wrapping the Radix Slider primitive.
 *
 * Uses `--seal-brand-primary` for the active track fill and thumb border,
 * `--seal-border-default` for the inactive track, and
 * `--seal-surface-background` for the thumb fill. Disabled state switches
 * the active track and thumb border to `--seal-state-fill-disabled`.
 *
 * Keyboard interaction follows the WAI-ARIA Slider pattern:
 * Arrow keys move by `step` (defaults to Radix's internal `1`), and
 * Home/End jump to `min`/`max`.
 *
 * @example
 * // Uncontrolled with discrete steps
 * <SealSlider defaultValue={50} min={0} max={100} step={5} aria-label="Volume" />
 *
 * // Controlled
 * <SealSlider value={gain} onValueChange={setGain} min={0} max={1} aria-label="Gain" />
 */
export const SealSlider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SealSliderProps
>(function SealSlider(
  {
    value,
    defaultValue,
    min = 0,
    max = 100,
    step,
    disabled,
    onValueChange,
    onValueCommit,
    className,
    id,
    name,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-valuetext': ariaValueText,
  },
  ref,
) {
  const radixValue = value === undefined ? undefined : [value]
  const radixDefault = defaultValue === undefined ? undefined : [defaultValue]

  return (
    <SliderPrimitive.Root
      ref={ref}
      {...(id !== undefined && { id })}
      {...(name !== undefined && { name })}
      {...(radixValue !== undefined && { value: radixValue })}
      {...(radixDefault !== undefined && { defaultValue: radixDefault })}
      min={min}
      max={max}
      {...(step !== undefined && { step })}
      {...(disabled !== undefined && { disabled })}
      {...(onValueChange !== undefined && {
        onValueChange: (values: number[]) => {
          onValueChange(values[0] ?? min)
        },
      })}
      {...(onValueCommit !== undefined && {
        onValueCommit: (values: number[]) => {
          onValueCommit(values[0] ?? min)
        },
      })}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        'h-[var(--seal-dimension-md)]',
        disabled && 'cursor-not-allowed',
        className,
      )}
    >
      <SliderPrimitive.Track
        className={cn(
          'relative grow overflow-hidden rounded-full',
          'h-[var(--seal-dimension-xs)]',
          'bg-[var(--seal-border-default)]',
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            'absolute h-full',
            disabled ? 'bg-[var(--seal-state-fill-disabled)]' : 'bg-[var(--seal-brand-primary)]',
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-valuetext={ariaValueText}
        className={cn(
          'block rounded-full',
          'h-[var(--seal-dimension-md)] w-[var(--seal-dimension-md)]',
          'border-[var(--seal-dimension-xxxs)]',
          'bg-[var(--seal-surface-background)]',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--seal-brand-primary)]',
          'focus-visible:ring-offset-2',
          'focus-visible:ring-offset-[var(--seal-surface-background)]',
          disabled
            ? 'border-[var(--seal-state-fill-disabled)] pointer-events-none opacity-50'
            : 'border-[var(--seal-brand-primary)]',
        )}
      />
    </SliderPrimitive.Root>
  )
})
