import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '@/lib/utils'

/** Color variant for the filled indicator track. */
export type SealProgressVariant = 'primary' | 'accent'

/**
 * Props accepted by `SealProgress` and its compound sub-components.
 *
 * Extends Radix `ProgressPrimitive.Root` — all standard progress props are forwarded.
 */
export interface SealProgressProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  'value'
> {
  /**
   * Progress value from `0` to `100`.
   *
   * When `undefined` or `null`, the bar plays a continuous sliding animation
   * to indicate an operation of unknown duration.
   */
  value?: number | null
  /**
   * Color variant for the filled indicator track.
   * - `primary`: uses the active theme's brand primary color (default)
   * - `accent`: uses the active theme's accent color
   */
  variant?: SealProgressVariant
  /**
   * Accessible label announced by screen readers.
   * Defaults to `"Progress"` when not provided.
   */
  'aria-label'?: string
}

const VARIANT_COLOR: Record<SealProgressVariant, string> = {
  primary: 'var(--seal-brand-primary)',
  accent: 'var(--seal-accent-accent)',
}

function SealProgressImpl({
  value,
  variant = 'primary',
  className,
  'aria-label': ariaLabel = 'Progress',
  ...props
}: Readonly<SealProgressProps>) {
  const isIndeterminate = value === undefined || value === null
  const indicatorColor = VARIANT_COLOR[variant]

  return (
    <ProgressPrimitive.Root
      value={isIndeterminate ? null : value}
      max={100}
      aria-label={ariaLabel}
      className={cn(
        'relative h-[8px] w-full overflow-hidden rounded-[var(--seal-radius-full)]',
        'bg-[var(--seal-border-default)]',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full rounded-[var(--seal-radius-full)]',
          isIndeterminate
            ? 'absolute inset-y-0 w-[40%]'
            : 'w-full transition-transform duration-300 ease-in-out',
        )}
        style={{
          background: indicatorColor,
          ...(isIndeterminate
            ? { animation: 'seal-progress-indeterminate 1.5s ease-in-out infinite' }
            : { transform: `translateX(-${String(100 - value)}%)` }),
        }}
      />
    </ProgressPrimitive.Root>
  )
}

SealProgressImpl.displayName = 'SealProgress'

type BaseProps = Omit<SealProgressProps, 'variant'>

function Primary(props: Readonly<BaseProps>) {
  return <SealProgressImpl variant="primary" {...props} />
}
Primary.displayName = 'SealProgress.Primary'

function Accent(props: Readonly<BaseProps>) {
  return <SealProgressImpl variant="accent" {...props} />
}
Accent.displayName = 'SealProgress.Accent'

/**
 * Linear progress bar styled with Seal UI tokens.
 *
 * Pass `value` between `0` and `100` for a determinate bar. Omit `value` (or
 * pass `null`) to show an indeterminate sliding animation for operations of
 * unknown duration — matching the Flutter `SealProgress` reference.
 *
 * Use compound sub-components for the preferred API:
 *
 * ```tsx
 * // Determinate — 60%
 * <SealProgress.Primary value={60} />
 *
 * // Indeterminate
 * <SealProgress.Accent />
 * ```
 *
 * The track height is fixed at 8 px and the radius uses `--seal-radius-full`
 * to match the Flutter reference constants.
 */
export const SealProgress = Object.assign(SealProgressImpl, {
  Primary,
  Accent,
})
