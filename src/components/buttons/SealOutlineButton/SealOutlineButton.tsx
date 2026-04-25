import { constantButtonIconSize } from '@sealui/tokens'
import { type LucideIcon, Loader2 } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Visual style variants for `SealOutlineButton`. */
export type SealOutlineButtonVariant =
  | 'primary'
  | 'accent'
  | 'accent-secondary'
  | 'gradient'
  | 'accent-gradient'
  | 'custom'

/**
 * Props accepted by `SealOutlineButton`.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealOutlineButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * - `primary`: brand-color border and text — default secondary action.
   * - `accent`: accent-color border and text.
   * - `accent-secondary`: secondary-accent border and text.
   * - `gradient`: primary gradient text and matching semi-transparent border.
   * - `accent-gradient`: accent gradient text and matching border.
   * - `custom`: arbitrary color or CSS gradient; requires `color` or `gradient`.
   */
  variant?: SealOutlineButtonVariant
  /**
   * Replaces button content with a spinner and suppresses interaction.
   * Button dimensions are preserved to prevent layout shift.
   */
  loading?: boolean
  /**
   * Lucide icon component rendered as a leading icon before the label.
   * Pass the component reference — the button controls its size using the
   * `--seal-constant-button-icon-size` token.
   * Hidden automatically when `loading` is `true`.
   *
   * @example
   * import { Share2 } from 'lucide-react'
   * <SealOutlineButton icon={Share2}>Share</SealOutlineButton>
   */
  icon?: LucideIcon
  /**
   * Solid CSS color for the `custom` variant.
   * Must be a valid CSS color string (e.g. `'#ff0000'`, `'rgb(255,0,0)'`).
   * Ignored for all other variants.
   */
  color?: string
  /**
   * CSS gradient string for the `custom` variant.
   * Applied to the text via `background-clip: text`.
   * Ignored for all other variants.
   */
  gradient?: string
}

// Inline CSS variable for per-variant hover background color.
// Used as the value in `hover:bg-[var(--seal-ob-hover)]`.
const OB_HOVER = '--seal-ob-hover'
const OUTLINE_BASE = 'border bg-transparent'
const HOVER_ACTIVE = `hover:bg-[var(${OB_HOVER})] active:opacity-[0.75]`
const GRADIENT_HOVER = 'hover:opacity-[0.85] active:opacity-[0.75]'

interface OutlineVariantStyle {
  className: string
  style: React.CSSProperties
}

function buildSolidStyle(fg: string): OutlineVariantStyle {
  return {
    className: cn(OUTLINE_BASE, HOVER_ACTIVE),
    style: {
      color: fg,
      [OB_HOVER]: `color-mix(in srgb, ${fg} 8%, transparent)`,
      borderColor: `color-mix(in srgb, ${fg} 50%, transparent)`,
    } as React.CSSProperties,
  }
}

function getVariantStyle(
  variant: SealOutlineButtonVariant,
  color: string | undefined,
  gradient: string | undefined,
): OutlineVariantStyle {
  switch (variant) {
    case 'primary':
      return buildSolidStyle('var(--seal-state-foreground-active)')
    case 'accent':
      return buildSolidStyle('var(--seal-accent-accent)')
    case 'accent-secondary':
      return buildSolidStyle('var(--seal-accent-accent-secondary)')
    case 'gradient':
      return {
        className: cn(OUTLINE_BASE, GRADIENT_HOVER),
        style: {
          background: 'var(--seal-gradient-primary)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          borderColor: 'color-mix(in srgb, var(--seal-brand-primary) 50%, transparent)',
        },
      }
    case 'accent-gradient':
      return {
        className: cn(OUTLINE_BASE, GRADIENT_HOVER),
        style: {
          background: 'var(--seal-gradient-accent)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          borderColor: 'color-mix(in srgb, var(--seal-accent-accent) 50%, transparent)',
        },
      }
    case 'custom':
      if (gradient) {
        return {
          className: cn(OUTLINE_BASE, GRADIENT_HOVER),
          style: {
            background: gradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            borderColor: 'color-mix(in srgb, var(--seal-primitive-white) 50%, transparent)',
          },
        }
      }
      return buildSolidStyle(color ?? 'currentColor')
  }
}

function getSpinnerColor(variant: SealOutlineButtonVariant): string | undefined {
  if (variant === 'gradient') return 'var(--seal-brand-primary)'
  if (variant === 'accent-gradient') return 'var(--seal-accent-accent)'
  return undefined
}

/**
 * Outlined action button with token-driven border/text colors and gradient support.
 *
 * Wraps the shadcn `Button` primitive with Seal UI design tokens. The background
 * is always transparent; the foreground color controls the border and text.
 * Gradient variants apply the gradient to the text via CSS `background-clip: text`.
 *
 * @example
 * <SealOutlineButton variant="primary" onClick={handleCancel}>
 *   Cancel
 * </SealOutlineButton>
 *
 * @example
 * <SealOutlineButton variant="gradient" icon={Telescope}>
 *   Explore
 * </SealOutlineButton>
 *
 * @example
 * <SealOutlineButton variant="custom" color="#e53935" onClick={handleRetry}>
 *   Retry
 * </SealOutlineButton>
 */
export function SealOutlineButton({
  variant = 'primary',
  loading = false,
  disabled,
  icon: IconEl,
  color,
  gradient,
  children,
  className,
  style,
  ...props
}: Readonly<SealOutlineButtonProps>) {
  const { className: variantClass, style: variantStyle } = getVariantStyle(variant, color, gradient)
  const spinnerColor = getSpinnerColor(variant)

  return (
    <Button
      variant="outline"
      disabled={(disabled ?? false) || loading}
      aria-busy={loading || undefined}
      className={cn(
        'rounded-[var(--seal-radius-sm)] font-medium',
        'disabled:opacity-[var(--seal-state-disabled-opacity)]',
        variantClass,
        className,
      )}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      {loading ? (
        <span className="relative flex items-center justify-center">
          <span aria-hidden className="invisible flex items-center gap-2">
            {IconEl && <IconEl size={constantButtonIconSize} />}
            {children}
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2
              className="h-[1em] w-[1em] animate-spin"
              style={spinnerColor ? { color: spinnerColor } : undefined}
            />
          </span>
        </span>
      ) : (
        <>
          {IconEl && <IconEl size={constantButtonIconSize} />}
          {children}
        </>
      )}
    </Button>
  )
}
