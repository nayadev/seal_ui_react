import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Props for `SealContainer`.
 */
export interface SealContainerProps {
  /** Container content. */
  children: React.ReactNode
  /**
   * CSS padding value.
   * @defaultValue `var(--seal-dimension-md)`
   */
  padding?: React.CSSProperties['padding']
  /** CSS margin value. */
  margin?: React.CSSProperties['margin']
  /**
   * CSS border-radius value.
   * @defaultValue `var(--seal-radius-md)`
   */
  borderRadius?: React.CSSProperties['borderRadius']
  /**
   * Background color. Accepts any valid CSS color string.
   * Ignored when `gradient` is provided.
   * @defaultValue `var(--seal-surface-surface)`
   */
  color?: string
  /**
   * Whether to render a subtle border using `--seal-border-default`.
   * @defaultValue true
   */
  showBorder?: boolean
  /** Fixed width. Accepts a pixel number or any valid CSS length string. */
  width?: number | string
  /** Fixed height. Accepts a pixel number or any valid CSS length string. */
  height?: number | string
  /**
   * CSS gradient string (e.g. `linear-gradient(...)`).
   * When set, overrides the solid `color` background.
   */
  gradient?: string
  /** Additional CSS classes applied to the root element. */
  className?: string
}

/**
 * Generic surface container with token-driven background, border, padding, and
 * border-radius.
 *
 * Use this component when you need a padded, styled box without the structured
 * header/body/footer layout of `SealCard`. Accepts children freely and exposes
 * overrides for every visual property via token-aligned props.
 *
 * ```tsx
 * <SealContainer>
 *   <p>Hello, Seal!</p>
 * </SealContainer>
 *
 * <SealContainer gradient="var(--seal-gradient-surface)" showBorder={false}>
 *   <p>Gradient surface</p>
 * </SealContainer>
 * ```
 */
export function SealContainer({
  children,
  padding = 'var(--seal-dimension-md)',
  margin,
  borderRadius = 'var(--seal-radius-md)',
  color,
  showBorder = true,
  width,
  height,
  gradient,
  className,
}: Readonly<SealContainerProps>) {
  const style: React.CSSProperties = {
    padding,
    borderRadius,
    background: gradient ?? color ?? 'var(--seal-surface-surface)',
    borderColor: showBorder ? 'var(--seal-border-default)' : 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    ...(margin !== undefined && { margin }),
    ...(width !== undefined && { width: typeof width === 'number' ? `${String(width)}px` : width }),
    ...(height !== undefined && {
      height: typeof height === 'number' ? `${String(height)}px` : height,
    }),
  }

  return (
    <div className={cn(className)} style={style}>
      {children}
    </div>
  )
}
