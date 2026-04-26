import type { LucideIcon } from 'lucide-react'
import * as React from 'react'

import { ButtonContent, type SealButtonVariant } from '../shared'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Visual style variants for `SealFilledIconButton`. */
export type SealFilledIconButtonVariant = SealButtonVariant

/**
 * Props accepted by `SealFilledIconButton`.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealFilledIconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * - `primary`: brand color fill.
   * - `accent`: accent color fill.
   * - `accent-secondary`: secondary-accent fill.
   * - `gradient`: primary gradient background.
   * - `accent-gradient`: accent gradient background.
   * - `custom`: arbitrary color or CSS gradient; requires `color` or `gradient`.
   */
  variant?: SealFilledIconButtonVariant
  /**
   * Replaces button content with a spinner and suppresses interaction.
   * Button dimensions are preserved to prevent layout shift.
   */
  loading?: boolean
  /**
   * Lucide icon component to display.
   * Pass the component reference — the button controls its size using the
   * `--seal-constant-button-icon-size` token.
   * Hidden automatically when `loading` is `true`.
   */
  icon: LucideIcon
  /**
   * Solid CSS color for the `custom` variant.
   * Must be a valid CSS color string (e.g. `'#ff0000'`, `'rgb(255,0,0)'`).
   * Ignored for all other variants.
   */
  color?: string
  /**
   * CSS gradient string for the `custom` variant.
   * Must be a valid CSS gradient string (e.g. `'linear-gradient(to right, #f00, #00f)'`).
   * Ignored for all other variants.
   */
  gradient?: string
  /**
   * Optional tooltip text for accessibility and hover.
   * Maps internally to the standard HTML `title` attribute.
   * Strongly recommended for icon-only buttons to ensure screen-reader support.
   */
  tooltip?: string
}

const HOVER_ACTIVE = 'hover:opacity-[0.85] active:opacity-[0.75]'

function getVariantClass(variant: SealFilledIconButtonVariant): string {
  switch (variant) {
    case 'primary':
      return cn(
        'bg-[var(--seal-state-fill-active)] text-[var(--seal-text-on-primary)]',
        HOVER_ACTIVE,
      )
    case 'accent':
      return cn('bg-[var(--seal-accent-accent)] text-[var(--seal-accent-on-accent)]', HOVER_ACTIVE)
    case 'accent-secondary':
      return cn(
        'bg-[var(--seal-accent-accent-secondary)] text-[var(--seal-accent-on-accent)]',
        HOVER_ACTIVE,
      )
    case 'gradient':
      return cn('text-[var(--seal-text-on-primary)]', HOVER_ACTIVE)
    case 'accent-gradient':
      return cn('text-[var(--seal-accent-on-accent)]', HOVER_ACTIVE)
    case 'custom':
      return cn('text-[var(--seal-primitive-white)]', HOVER_ACTIVE)
  }
}

function resolveBackground(
  variant: SealFilledIconButtonVariant,
  color: string | undefined,
  gradient: string | undefined,
): React.CSSProperties {
  if (variant === 'gradient') return { background: 'var(--seal-gradient-primary)' }
  if (variant === 'accent-gradient') return { background: 'var(--seal-gradient-accent)' }
  if (variant === 'custom') {
    if (gradient) return { background: gradient }
    if (color) return { background: color }
  }
  return {}
}

/**
 * A compact icon-only button with a filled background.
 *
 * Built on shadcn's default button. Designed for prominent actions in toolbars,
 * app bars, and FAB-like contexts. Always provide a `tooltip` or `title` for accessibility.
 *
 * @example
 * <SealFilledIconButton variant="primary" icon={Plus} tooltip="Add item" onClick={handleAdd} />
 *
 * @example
 * <SealFilledIconButton variant="gradient" icon={Rocket} tooltip="Launch" />
 *
 * @example
 * <SealFilledIconButton variant="custom" color="#e53935" icon={Trash} tooltip="Delete" />
 */
export function SealFilledIconButton({
  variant = 'primary',
  loading = false,
  disabled,
  icon: IconEl,
  color,
  gradient,
  tooltip,
  title,
  className,
  style,
  ...props
}: Readonly<SealFilledIconButtonProps>) {
  const backgroundStyle = resolveBackground(variant, color, gradient)

  const finalTitle = title ?? tooltip

  return (
    <Button
      variant="default"
      disabled={(disabled ?? false) || loading}
      aria-busy={loading || undefined}
      title={finalTitle}
      aria-label={finalTitle}
      className={cn(
        // Icon buttons are sized tightly around their content
        'h-auto w-auto p-[var(--seal-dimension-sm)] rounded-[var(--seal-radius-sm)]',
        'disabled:opacity-[var(--seal-state-disabled-opacity)]',
        getVariantClass(variant),
        className,
      )}
      style={{ ...backgroundStyle, ...style }}
      {...props}
    >
      <ButtonContent loading={loading} iconEl={IconEl}>
        {null}
      </ButtonContent>
    </Button>
  )
}
