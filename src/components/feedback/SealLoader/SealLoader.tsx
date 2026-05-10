import * as React from 'react'

import { cn } from '@/lib/utils'

/** Visual size of the loader indicator. */
export type SealLoaderSize = 'small' | 'medium' | 'large'

// Pixel dimensions from the Flutter reference (SealLoaderSize enum).
const SIZE_PX: Record<SealLoaderSize, number> = {
  small: 16,
  medium: 24,
  large: 40,
}

// Stroke widths from Flutter reference (_kStrokeWidthDefault / _kStrokeWidthLarge).
const STROKE_PX: Record<SealLoaderSize, number> = {
  small: 2.5,
  medium: 2.5,
  large: 3,
}

// Arc spans 270° (¾ of the circle), matching Flutter's _kSweep = math.pi * 1.5.
const ARC_FRACTION = 0.75

// Animation duration matches Flutter's 1200 ms rotation cycle.
const SPIN_DURATION = '1.2s'

/**
 * Props accepted by `SealLoader`.
 *
 * Extends `<output>` attributes — all standard HTML output props are forwarded
 * to the container element.
 */
export interface SealLoaderProps extends Omit<React.HTMLAttributes<HTMLOutputElement>, 'color'> {
  /**
   * Size preset for the indicator.
   * - `small`: 16 × 16 px
   * - `medium`: 24 × 24 px (default)
   * - `large`: 40 × 40 px
   */
  size?: SealLoaderSize
  /**
   * Fill color for the arc as any CSS color string.
   * Defaults to `var(--seal-brand-primary)` — the active theme's primary brand color.
   */
  color?: string
  /**
   * Custom stroke width in pixels.
   * When omitted, defaults to `2.5` for `small` and `medium`, `3.0` for `large`,
   * matching Flutter's reference constants.
   */
  strokeWidth?: number
  /**
   * Optional text label rendered below the spinner.
   * Uses caption typography and secondary text color to match the Flutter reference.
   */
  label?: string
  /**
   * Accessible label announced by screen readers.
   * Defaults to `"Loading"` when not provided.
   */
  'aria-label'?: string
}

/**
 * Spinning arc loading indicator styled with Seal UI tokens.
 *
 * Renders a 270° SVG arc that rotates continuously at 1.2 s per cycle —
 * matching the Flutter `SealLoader` reference implementation. No external
 * dependencies; the animation relies on the `seal-loader-spin` keyframe
 * defined in `src/index.css`.
 *
 * @example
 * <SealLoader />
 *
 * @example
 * <SealLoader size="large" label="Syncing…" />
 *
 * @example
 * <SealLoader color="var(--seal-semantic-success)" size="small" />
 */
export function SealLoader({
  size = 'medium',
  color = 'var(--seal-brand-primary)',
  strokeWidth,
  label,
  className,
  style,
  'aria-label': ariaLabel = 'Loading',
  ...props
}: Readonly<SealLoaderProps>) {
  const sizePx = SIZE_PX[size]
  const sw = strokeWidth ?? STROKE_PX[size]
  const r = (sizePx - sw) / 2
  const circumference = 2 * Math.PI * r
  const dashArray = ARC_FRACTION * circumference
  const center = sizePx / 2

  const spinner = (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox={`0 0 ${String(sizePx)} ${String(sizePx)}`}
      aria-hidden="true"
      style={{
        animation: `seal-loader-spin ${SPIN_DURATION} linear infinite`,
        transformBox: 'fill-box',
        transformOrigin: 'center',
      }}
    >
      <circle
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={`${String(dashArray)} ${String(circumference - dashArray)}`}
      />
    </svg>
  )

  return (
    <output
      aria-label={ariaLabel}
      className={cn('inline-flex flex-col items-center gap-[var(--seal-dimension-sm)]', className)}
      style={style}
      {...props}
    >
      {spinner}
      {label !== undefined && (
        <span
          className="text-[var(--seal-text-secondary)]"
          style={{
            fontSize: 'var(--seal-style-caption-font-size)',
            fontWeight: 'var(--seal-style-caption-font-weight)',
            lineHeight: 'var(--seal-style-caption-line-height)',
          }}
        >
          {label}
        </span>
      )}
    </output>
  )
}
