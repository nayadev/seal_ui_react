import * as React from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/** Visual style variant for `SealCard`. */
export type SealCardVariant = 'default' | 'gradient'

/**
 * Props accepted by `SealCard` and its compound sub-components.
 *
 * At least one of `header`, `body`, or `footer` should be provided.
 */
export interface SealCardProps {
  /** Content displayed in the header area. */
  header?: React.ReactNode
  /**
   * Primary card content.
   * When both `header` and `body` are provided, a horizontal rule separates them.
   */
  body?: React.ReactNode
  /** Content displayed below the body with additional top spacing. */
  footer?: React.ReactNode
  /**
   * Visual style of the card.
   * - `default`: surface background (`--seal-surface-surface`)
   * - `gradient`: semi-transparent surface gradient (`--seal-gradient-surface`)
   */
  variant?: SealCardVariant
  /**
   * Whether to render a border around the card.
   * @defaultValue true
   */
  showBorder?: boolean
  /**
   * Drop-shadow depth. Maps to Tailwind shadow utilities.
   * Pass `0` to render the card flat with no shadow.
   * @defaultValue 2
   */
  elevation?: 0 | 2 | 4 | 8
  /** Fixed width. Accepts a pixel number or any valid CSS length string. */
  width?: number | string
  /**
   * Makes the card interactive.
   * Adds a pointer cursor, hover/active opacity transitions, and keyboard
   * support (`Enter` / `Space`) with a visible focus ring.
   */
  onClick?: () => void
  /** Additional CSS classes applied to the card root element. */
  className?: string
}

const ELEVATION_SHADOW: Record<number, string> = {
  0: 'shadow-none',
  2: 'shadow-sm',
  4: 'shadow-md',
  8: 'shadow-lg',
}

function SealCardImpl({
  header,
  body,
  footer,
  variant = 'default',
  showBorder = true,
  elevation = 2,
  width,
  onClick,
  className,
}: Readonly<SealCardProps>) {
  const shadowClass = ELEVATION_SHADOW[elevation] ?? 'shadow-sm'
  const hasHeader = header !== undefined
  const hasBody = body !== undefined
  const hasDivider = hasHeader && hasBody

  const style: React.CSSProperties = {
    background:
      variant === 'gradient' ? 'var(--seal-gradient-surface)' : 'var(--seal-surface-surface)',
    borderColor: showBorder ? 'var(--seal-border-default)' : 'transparent',
    ...(width !== undefined && {
      width: typeof width === 'number' ? String(width) + 'px' : width,
    }),
  }

  return (
    <Card
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') onClick()
            }
          : undefined
      }
      className={cn(
        'rounded-[var(--seal-radius-lg)] text-[var(--seal-text-primary)]',
        shadowClass,
        onClick &&
          'cursor-pointer transition-opacity hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seal-brand-primary)] focus-visible:ring-offset-2',
        className,
      )}
      style={style}
    >
      <div className="p-[var(--seal-dimension-lg)]">
        {hasHeader && <div>{header}</div>}
        {hasDivider && (
          <div
            className="my-[var(--seal-dimension-sm)]"
            style={{ borderTop: '1px solid var(--seal-border-default)' }}
            role="separator"
            aria-hidden="true"
          />
        )}
        {hasBody && <div>{body}</div>}
        {footer !== undefined && <div className="mt-[var(--seal-dimension-md)]">{footer}</div>}
      </div>
    </Card>
  )
}

SealCardImpl.displayName = 'SealCard'

type BaseProps = Omit<SealCardProps, 'variant'>

/** Standard surface card. The default and most common card style. */
function Default(props: Readonly<BaseProps>) {
  return <SealCardImpl variant="default" {...props} />
}
Default.displayName = 'SealCard.Default'

/**
 * Card with a semi-transparent gradient background (`--seal-gradient-surface`).
 * Border is hidden by default to let the gradient breathe.
 */
function Gradient(props: Readonly<BaseProps>) {
  return <SealCardImpl variant="gradient" showBorder={false} {...props} />
}
Gradient.displayName = 'SealCard.Gradient'

/**
 * Themed card with optional header, body, and footer sections.
 *
 * Uses Seal tokens for background color, border, border-radius, and shadow.
 * The `gradient` variant applies `--seal-gradient-surface` as the card background.
 *
 * ```tsx
 * <SealCard.Default
 *   header={<h3>Title</h3>}
 *   body={<p>Content goes here</p>}
 *   footer={<div><SealFilledButton.Primary>OK</SealFilledButton.Primary></div>}
 * />
 *
 * <SealCard.Gradient header={<h3>Gradient Card</h3>} body={<p>…</p>} />
 *
 * <SealCard.Default body={<p>Click me</p>} onClick={() => console.log('tapped')} />
 * ```
 *
 * When `onClick` is provided the card becomes an interactive region with
 * keyboard support (`Enter` / `Space`), hover/active opacity transitions, and
 * a focus ring using `--seal-brand-primary`.
 */
export const SealCard = Object.assign(SealCardImpl, {
  Default,
  Gradient,
})
