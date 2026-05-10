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

/** Visual style variants for `SealOutlineIconButton`. */
export type SealOutlineIconButtonVariant = SealButtonVariant

/**
 * Props accepted by `SealOutlineIconButton` and its compound sub-components.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealOutlineIconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * Prefer compound sub-components (`SealOutlineIconButton.Primary`, etc.) over this prop.
   */
  variant?: SealOutlineIconButtonVariant
  /**
   * Replaces button content with a spinner and suppresses interaction.
   * Button dimensions are preserved to prevent layout shift.
   */
  loading?: boolean
  /**
   * Icon component to display.
   * Pass the component reference — the button controls its size using the
   * `--seal-constant-button-icon-size` token.
   * Hidden automatically when `loading` is `true`.
   */
  icon: SealIcon
  /**
   * Solid CSS color for `SealOutlineIconButton.Custom`.
   * Must be a valid CSS color string (e.g. `'#ff0000'`, `'rgb(255,0,0)'`).
   */
  color?: string
  /**
   * CSS gradient string for `SealOutlineIconButton.Custom`.
   * Applied to both the icon via SVG gradient and the border.
   */
  gradient?: string
  /**
   * Optional tooltip text for accessibility and hover.
   * Maps internally to the standard HTML `title` attribute.
   * Strongly recommended for icon-only buttons to ensure screen-reader support.
   */
  tooltip?: string
}

const OIB_HOVER = '--seal-oib-hover'
const OUTLINE_BASE = 'border bg-transparent'
const HOVER_ACTIVE = 'hover:bg-[var(--seal-oib-hover)] active:opacity-[0.75]'

interface OutlineIconVariantStyle {
  className: string
  style: React.CSSProperties
}

function buildSolidStyle(fg: string): OutlineIconVariantStyle {
  return {
    className: cn(OUTLINE_BASE, HOVER_ACTIVE),
    style: {
      color: fg,
      [OIB_HOVER]: `color-mix(in srgb, ${fg} 8%, transparent)`,
      borderColor: `color-mix(in srgb, ${fg} 50%, transparent)`,
    } as React.CSSProperties,
  }
}

// Gradient border via ::before mask-composite. Hover uses the first gradient stop at 8%
// opacity — same colour-mix formula as solid variants for visual consistency.
function buildGradientBorderStyle(
  gradientValue: string,
  hoverColor: string,
): OutlineIconVariantStyle {
  return {
    className: cn('border-0 bg-transparent', HOVER_ACTIVE, 'seal-gradient-border'),
    style: {
      '--seal-gb-gradient': gradientValue,
      [OIB_HOVER]: `color-mix(in srgb, ${hoverColor} 8%, transparent)`,
    } as React.CSSProperties,
  }
}

function getVariantStyle(
  variant: SealOutlineIconButtonVariant,
  color: string | undefined,
  gradient: string | undefined,
): OutlineIconVariantStyle {
  switch (variant) {
    case 'primary':
      return buildSolidStyle('var(--seal-state-foreground-active)')
    case 'accent':
      return buildSolidStyle(TOKEN_ACCENT)
    case 'accent-secondary':
      return buildSolidStyle(TOKEN_ACCENT_SECONDARY)
    case VARIANT_GRADIENT:
      return buildGradientBorderStyle(TOKEN_GRADIENT_PRIMARY, TOKEN_BRAND_PRIMARY)
    case VARIANT_ACCENT_GRADIENT:
      return buildGradientBorderStyle(TOKEN_GRADIENT_ACCENT, TOKEN_BRAND_SHADE)
    case VARIANT_CUSTOM: {
      if (gradient) {
        const [firstStop] = parseGradientStopColors(gradient)
        return buildGradientBorderStyle(gradient, firstStop)
      }
      return buildSolidStyle(color ?? CURRENT_COLOR)
    }
  }
}

function getSpinnerColor(variant: SealOutlineIconButtonVariant): string | undefined {
  if (variant === VARIANT_GRADIENT) return TOKEN_BRAND_PRIMARY
  if (variant === VARIANT_ACCENT_GRADIENT) return TOKEN_ACCENT
  return undefined
}

function SealOutlineIconButtonImpl({
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
}: Readonly<SealOutlineIconButtonProps>) {
  const { className: variantClass, style: variantStyle } = getVariantStyle(variant, color, gradient)
  const spinnerColor = getSpinnerColor(variant)
  const uid = useId().replaceAll(':', '')

  const iconNode = renderIcon(IconEl, variant, gradient, uid, 'oib')

  const finalTitle = title ?? tooltip

  return (
    <Button
      variant="outline"
      disabled={(disabled ?? false) || loading}
      aria-busy={loading || undefined}
      title={finalTitle}
      aria-label={finalTitle}
      className={cn(
        // Icon buttons are sized tightly around their content
        'h-auto w-auto p-[var(--seal-dimension-sm)] rounded-[var(--seal-radius-sm)]',
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
      >
        {null}
      </ButtonContent>
    </Button>
  )
}

SealOutlineIconButtonImpl.displayName = 'SealOutlineIconButton'

type BaseProps = Omit<SealOutlineIconButtonProps, 'variant' | 'color' | 'gradient'>
type CustomProps = Omit<SealOutlineIconButtonProps, 'variant'>

/** Outline icon button using the primary brand color. */
function Primary(props: Readonly<BaseProps>) {
  return <SealOutlineIconButtonImpl variant="primary" {...props} />
}
Primary.displayName = 'SealOutlineIconButton.Primary'

/** Outline icon button using the accent color. */
function Accent(props: Readonly<BaseProps>) {
  return <SealOutlineIconButtonImpl variant="accent" {...props} />
}
Accent.displayName = 'SealOutlineIconButton.Accent'

/** Outline icon button using the secondary accent color. */
function AccentSecondary(props: Readonly<BaseProps>) {
  return <SealOutlineIconButtonImpl variant="accent-secondary" {...props} />
}
AccentSecondary.displayName = 'SealOutlineIconButton.AccentSecondary'

/** Outline icon button with primary gradient icon and matching gradient border. */
function Gradient(props: Readonly<BaseProps>) {
  return <SealOutlineIconButtonImpl variant="gradient" {...props} />
}
Gradient.displayName = 'SealOutlineIconButton.Gradient'

/** Outline icon button with accent gradient icon and matching gradient border. */
function AccentGradient(props: Readonly<BaseProps>) {
  return <SealOutlineIconButtonImpl variant="accent-gradient" {...props} />
}
AccentGradient.displayName = 'SealOutlineIconButton.AccentGradient'

/**
 * Outline icon button with an arbitrary color or gradient.
 * Pass `color` for a solid color or `gradient` for a CSS gradient string.
 */
function Custom(props: Readonly<CustomProps>) {
  return <SealOutlineIconButtonImpl variant="custom" {...props} />
}
Custom.displayName = 'SealOutlineIconButton.Custom'

/**
 * Compact icon-only button with a transparent background and colored border.
 *
 * Use compound sub-components to select the visual treatment:
 *
 * ```tsx
 * <SealOutlineIconButton.Primary icon={Share2} tooltip="Share" onClick={handleShare} />
 * <SealOutlineIconButton.Gradient icon={Sparkles} tooltip="Magic" />
 * <SealOutlineIconButton.Custom color="#e53935" icon={TriangleAlert} tooltip="Warning" />
 * ```
 *
 * Always provide `tooltip` or `title` for screen-reader accessibility.
 * The root component also accepts a `variant` prop for programmatic selection.
 */
export const SealOutlineIconButton = Object.assign(SealOutlineIconButtonImpl, {
  Primary,
  Accent,
  AccentSecondary,
  Gradient,
  AccentGradient,
  Custom,
})
