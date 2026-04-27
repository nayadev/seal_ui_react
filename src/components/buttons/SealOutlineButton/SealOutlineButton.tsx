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
import type { SealIcon } from '@/types/icon'

/** Visual style variants for `SealOutlineButton`. */
export type SealOutlineButtonVariant = SealButtonVariant

/**
 * Props accepted by `SealOutlineButton` and its compound sub-components.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealOutlineButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * Prefer compound sub-components (`SealOutlineButton.Primary`, etc.) over this prop.
   */
  variant?: SealOutlineButtonVariant
  /**
   * Replaces button content with a spinner and suppresses interaction.
   * Button dimensions are preserved to prevent layout shift.
   */
  loading?: boolean
  /**
   * Icon component rendered as a leading icon before the label.
   * Pass the component reference — the button controls its size using the
   * `--seal-constant-button-icon-size` token.
   * Hidden automatically when `loading` is `true`.
   *
   * @example
   * import { Share2 } from 'lucide-react'
   * <SealOutlineButton.Primary icon={Share2}>Share</SealOutlineButton.Primary>
   */
  icon?: SealIcon
  /**
   * Solid CSS color for `SealOutlineButton.Custom`.
   * Must be a valid CSS color string (e.g. `'#ff0000'`, `'rgb(255,0,0)'`).
   */
  color?: string
  /**
   * CSS gradient string for `SealOutlineButton.Custom`.
   * Applied to both the border and text via CSS gradient techniques.
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

function SealOutlineButtonImpl({
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

SealOutlineButtonImpl.displayName = 'SealOutlineButton'

type BaseProps = Omit<SealOutlineButtonProps, 'variant' | 'color' | 'gradient'>
type CustomProps = Omit<SealOutlineButtonProps, 'variant'>

/** Outline button using the primary brand color. Default secondary action. */
function Primary(props: Readonly<BaseProps>) {
  return <SealOutlineButtonImpl variant="primary" {...props} />
}
Primary.displayName = 'SealOutlineButton.Primary'

/** Outline button using the accent color. */
function Accent(props: Readonly<BaseProps>) {
  return <SealOutlineButtonImpl variant="accent" {...props} />
}
Accent.displayName = 'SealOutlineButton.Accent'

/** Outline button using the secondary accent color. */
function AccentSecondary(props: Readonly<BaseProps>) {
  return <SealOutlineButtonImpl variant="accent-secondary" {...props} />
}
AccentSecondary.displayName = 'SealOutlineButton.AccentSecondary'

/** Outline button with primary gradient border and text. */
function Gradient(props: Readonly<BaseProps>) {
  return <SealOutlineButtonImpl variant="gradient" {...props} />
}
Gradient.displayName = 'SealOutlineButton.Gradient'

/** Outline button with accent gradient border and text. */
function AccentGradient(props: Readonly<BaseProps>) {
  return <SealOutlineButtonImpl variant="accent-gradient" {...props} />
}
AccentGradient.displayName = 'SealOutlineButton.AccentGradient'

/**
 * Outline button with an arbitrary color or gradient border and text.
 * Pass `color` for a solid color or `gradient` for a CSS gradient string.
 */
function Custom(props: Readonly<CustomProps>) {
  return <SealOutlineButtonImpl variant="custom" {...props} />
}
Custom.displayName = 'SealOutlineButton.Custom'

/**
 * Outlined action button with token-driven border/text colors and gradient support.
 *
 * Use compound sub-components to select the visual treatment:
 *
 * ```tsx
 * <SealOutlineButton.Primary onClick={handleCancel}>Cancel</SealOutlineButton.Primary>
 * <SealOutlineButton.Gradient icon={Telescope}>Explore</SealOutlineButton.Gradient>
 * <SealOutlineButton.Custom color="#e53935" onClick={handleRetry}>Retry</SealOutlineButton.Custom>
 * ```
 *
 * The root component also accepts a `variant` prop for programmatic selection.
 */
export const SealOutlineButton = Object.assign(SealOutlineButtonImpl, {
  Primary,
  Accent,
  AccentSecondary,
  Gradient,
  AccentGradient,
  Custom,
})
