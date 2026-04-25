import * as React from 'react'

import { cn } from '@/lib/utils'

// Animation constants matching Flutter's SealBouncingDots reference values.
const DEFAULT_SIZE = 6
const DEFAULT_SPACING = 4
const ANIMATION_DURATION = '1.2s'
// 15% of the 1.2s cycle per dot — matches Flutter's kDelayMultiplier.
const ANIMATION_DELAY_STEP = 0.18

/**
 * Props accepted by `SealBouncingDots`.
 *
 * Extends `<span>` attributes — all standard HTML span props are forwarded.
 */
export interface SealBouncingDotsProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'color'
> {
  /**
   * Fill color of each dot as a CSS color string.
   * When omitted, inherits the nearest ancestor's `color` via `currentColor`,
   * making it safe to compose inside buttons and other themed containers
   * without an explicit override.
   */
  color?: string | undefined
  /**
   * Diameter of each dot in pixels.
   * Matches Flutter's `kDefaultDotSize` default of `6`.
   */
  size?: number | undefined
  /**
   * Gap between adjacent dots in pixels.
   * Matches Flutter's `kDefaultDotSpacing` default of `4`.
   */
  spacing?: number | undefined
}

/**
 * Three-dot bouncing animation used as a loading or activity indicator.
 *
 * Each dot rises and falls in sequence using a sine-curve bounce derived from
 * the same constants as Flutter's `SealBouncingDots` — `1.2s` cycle, `15%`
 * delay between dots, `40%` active bounce fraction.
 *
 * When `color` is omitted the dots inherit `currentColor` from the nearest
 * ancestor, making theme-aware usage the default rather than the exception.
 *
 * @example
 * // Inherits text color from the parent — no explicit color needed
 * <SealBouncingDots />
 *
 * @example
 * // Explicit token color with a larger dot size
 * <SealBouncingDots color="var(--seal-brand-primary)" size={8} />
 *
 * @example
 * // Standalone page loader with full accessibility annotation
 * <SealBouncingDots role="status" aria-label="Loading" color="var(--seal-text-primary)" />
 */
export function SealBouncingDots({
  color,
  size = DEFAULT_SIZE,
  spacing = DEFAULT_SPACING,
  className,
  style,
  ...props
}: Readonly<SealBouncingDotsProps>) {
  const dotPx = `${String(size)}px`
  const gapPx = `${String(spacing)}px`

  return (
    <span
      className={cn('seal-bouncing-dots inline-flex items-center', className)}
      style={{ gap: gapPx, ...style }}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block flex-shrink-0 rounded-full"
          style={{
            width: dotPx,
            height: dotPx,
            backgroundColor: color ?? 'currentColor',
            animationName: 'seal-bounce-dot',
            animationDuration: ANIMATION_DURATION,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${(i * ANIMATION_DELAY_STEP).toFixed(2)}s`,
          }}
        />
      ))}
    </span>
  )
}
