import type { LucideIcon } from 'lucide-react'
import * as React from 'react'
import { useId } from 'react'

import {
  ButtonContent,
  CURRENT_COLOR,
  renderIcon,
  type SealButtonVariant,
  TOKEN_ACCENT,
  TOKEN_ACCENT_SECONDARY,
  TOKEN_BRAND_PRIMARY,
  TOKEN_BRAND_SHADE,
  TOKEN_GRADIENT_ACCENT,
  TOKEN_GRADIENT_PRIMARY,
  VARIANT_ACCENT_GRADIENT,
  VARIANT_CUSTOM,
  VARIANT_GRADIENT,
} from '../shared'

import { parseGradientStopColors } from '@/components/buttons/gradientIcon'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Visual style variants for `SealOutlineButton`. */
export type SealOutlineButtonVariant = SealButtonVariant

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
   * - `gradient`: primary gradient text and matching gradient border.
   * - `accent-gradient`: accent gradient text and matching gradient border.
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
   * Applied to both the border and text via CSS gradient techniques.
   * Ignored for all other variants.
   */
  gradient?: string
}

const OB_HOVER = '--seal-ob-hover'
const OUTLINE_BASE = 'border bg-transparent'
const HOVER_ACTIVE = 'hover:bg-[var(--seal-ob-hover)] active:opacity-[0.75]'

const CLIP_TEXT: React.CSSProperties = {
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

interface OutlineVariantStyle {
  className: string
  style: React.CSSProperties
  labelStyle?: React.CSSProperties | undefined
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

// Gradient border via ::before mask-composite. Hover uses the first gradient stop at 8%
// opacity — same colour-mix formula as solid variants for visual consistency.
function buildGradientStyle(gradientValue: string, hoverColor: string): OutlineVariantStyle {
  return {
    className: cn('border-0 bg-transparent', HOVER_ACTIVE, 'seal-gradient-border'),
    style: {
      '--seal-gb-gradient': gradientValue,
      [OB_HOVER]: `color-mix(in srgb, ${hoverColor} 8%, transparent)`,
    } as React.CSSProperties,
    labelStyle: {
      background: gradientValue,
      ...CLIP_TEXT,
    },
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
      return buildSolidStyle(TOKEN_ACCENT)
    case 'accent-secondary':
      return buildSolidStyle(TOKEN_ACCENT_SECONDARY)
    case VARIANT_GRADIENT:
      return buildGradientStyle(TOKEN_GRADIENT_PRIMARY, TOKEN_BRAND_PRIMARY)
    case VARIANT_ACCENT_GRADIENT:
      return buildGradientStyle(TOKEN_GRADIENT_ACCENT, TOKEN_BRAND_SHADE)
    case VARIANT_CUSTOM: {
      if (gradient) {
        const [firstStop] = parseGradientStopColors(gradient)
        return buildGradientStyle(gradient, firstStop)
      }
      return buildSolidStyle(color ?? CURRENT_COLOR)
    }
  }
}

function getSpinnerColor(variant: SealOutlineButtonVariant): string | undefined {
  if (variant === VARIANT_GRADIENT) return TOKEN_BRAND_PRIMARY
  if (variant === VARIANT_ACCENT_GRADIENT) return TOKEN_ACCENT
  return undefined
}

/**
 * Outlined action button with token-driven border/text colors and gradient support.
 *
 * Wraps the shadcn `Button` primitive with Seal UI design tokens. The background
 * matches the surface; the border and text follow the active gradient token.
 * Gradient variants paint both the border and text with the same gradient.
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
  const {
    className: variantClass,
    style: variantStyle,
    labelStyle,
  } = getVariantStyle(variant, color, gradient)
  const spinnerColor = getSpinnerColor(variant)
  const uid = useId().replaceAll(':', '')

  const iconNode = renderIcon(IconEl, variant, gradient, uid, 'ob')
  const labelNode = labelStyle == null ? undefined : <span style={labelStyle}>{children}</span>

  return (
    <Button
      variant="outline"
      disabled={(disabled ?? false) || loading}
      aria-busy={loading || undefined}
      className={cn(
        'rounded-[var(--seal-radius-sm)] font-style-small',
        'disabled:opacity-[var(--seal-state-disabled-opacity)]',
        variantClass,
        className,
      )}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      <ButtonContent
        loading={loading}
        iconNode={iconNode}
        iconEl={IconEl}
        spinnerColor={spinnerColor}
        labelNode={labelNode}
      >
        {children}
      </ButtonContent>
    </Button>
  )
}
