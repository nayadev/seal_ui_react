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
  TOKEN_PRIMITIVE_WHITE,
  VARIANT_ACCENT_GRADIENT,
  VARIANT_CUSTOM,
  VARIANT_GRADIENT,
} from '../shared'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SealIcon } from '@/types/icon'

/** Visual style variants for `SealIconButton`. */
export type SealIconButtonVariant = SealButtonVariant

/**
 * Props accepted by `SealIconButton` and its compound sub-components.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealIconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * Prefer compound sub-components (`SealIconButton.Primary`, etc.) over this prop.
   */
  variant?: SealIconButtonVariant
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
   * Solid CSS color for `SealIconButton.Custom`.
   * Must be a valid CSS color string (e.g. `'#ff0000'`, `'rgb(255,0,0)'`).
   */
  color?: string
  /**
   * CSS gradient string for `SealIconButton.Custom`.
   * Must be a valid CSS gradient string (e.g. `'linear-gradient(to right, #f00, #00f)'`).
   */
  gradient?: string
  /**
   * Optional tooltip text for accessibility and hover.
   * Maps internally to the standard HTML `title` attribute.
   * Strongly recommended for icon-only buttons to ensure screen-reader support.
   */
  tooltip?: string
}

// CSS variable for the per-variant hover background color.
const IB_HOVER = '--seal-ib-hover'

interface IconVariantStyle {
  className: string
  buttonStyle: React.CSSProperties
}

function buildSolidStyle(fg: string): IconVariantStyle {
  return {
    className: 'hover:bg-[var(--seal-ib-hover)] active:opacity-[0.75]',
    buttonStyle: {
      color: fg,
      [IB_HOVER]: `color-mix(in srgb, ${fg} 8%, transparent)`,
    } as React.CSSProperties,
  }
}

function buildGradientVariantStyle(): IconVariantStyle {
  return {
    // White overlay with 8% opacity for hover interaction feedback.
    className: 'hover:bg-primitive-white/[0.08] active:opacity-[0.75]',
    buttonStyle: {
      color: TOKEN_PRIMITIVE_WHITE,
    },
  }
}

function getVariantStyle(
  variant: SealIconButtonVariant,
  color: string | undefined,
  gradient: string | undefined,
): IconVariantStyle {
  switch (variant) {
    case 'primary':
      return buildSolidStyle('var(--seal-state-foreground-active)')
    case 'accent':
      return buildSolidStyle(TOKEN_ACCENT)
    case 'accent-secondary':
      return buildSolidStyle(TOKEN_ACCENT_SECONDARY)
    case VARIANT_GRADIENT:
    case VARIANT_ACCENT_GRADIENT:
      return buildGradientVariantStyle()
    case VARIANT_CUSTOM:
      if (gradient) return buildGradientVariantStyle()
      return buildSolidStyle(color ?? CURRENT_COLOR)
  }
}

function getSpinnerColor(variant: SealIconButtonVariant): string | undefined {
  if (variant === VARIANT_GRADIENT) return TOKEN_BRAND_PRIMARY
  if (variant === VARIANT_ACCENT_GRADIENT) return TOKEN_ACCENT
  return undefined
}

function SealIconButtonImpl({
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
}: Readonly<SealIconButtonProps>) {
  const { className: variantClass, buttonStyle } = getVariantStyle(variant, color, gradient)
  const spinnerColor = getSpinnerColor(variant)
  const uid = useId().replaceAll(':', '')

  const iconNode = renderIcon(IconEl, variant, gradient, uid, 'ib')

  const finalTitle = title ?? tooltip

  return (
    <Button
      variant="ghost"
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
      style={{ ...buttonStyle, ...style }}
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

SealIconButtonImpl.displayName = 'SealIconButton'

type BaseProps = Omit<SealIconButtonProps, 'variant' | 'color' | 'gradient'>
type CustomProps = Omit<SealIconButtonProps, 'variant'>

/** Ghost icon button using the primary brand color. Default for toolbar actions. */
function Primary(props: Readonly<BaseProps>) {
  return <SealIconButtonImpl variant="primary" {...props} />
}
Primary.displayName = 'SealIconButton.Primary'

/** Ghost icon button using the accent color. */
function Accent(props: Readonly<BaseProps>) {
  return <SealIconButtonImpl variant="accent" {...props} />
}
Accent.displayName = 'SealIconButton.Accent'

/** Ghost icon button using the secondary accent color. */
function AccentSecondary(props: Readonly<BaseProps>) {
  return <SealIconButtonImpl variant="accent-secondary" {...props} />
}
AccentSecondary.displayName = 'SealIconButton.AccentSecondary'

/** Ghost icon button with primary gradient icon. */
function Gradient(props: Readonly<BaseProps>) {
  return <SealIconButtonImpl variant="gradient" {...props} />
}
Gradient.displayName = 'SealIconButton.Gradient'

/** Ghost icon button with accent gradient icon. */
function AccentGradient(props: Readonly<BaseProps>) {
  return <SealIconButtonImpl variant="accent-gradient" {...props} />
}
AccentGradient.displayName = 'SealIconButton.AccentGradient'

/**
 * Ghost icon button with an arbitrary color or gradient icon.
 * Pass `color` for a solid color or `gradient` for a CSS gradient string.
 */
function Custom(props: Readonly<CustomProps>) {
  return <SealIconButtonImpl variant="custom" {...props} />
}
Custom.displayName = 'SealIconButton.Custom'

/**
 * Compact ghost icon-only button — no background, no border.
 *
 * Use compound sub-components to select the visual treatment:
 *
 * ```tsx
 * <SealIconButton.Primary icon={X} tooltip="Close" onClick={handleClose} />
 * <SealIconButton.Gradient icon={Sparkles} tooltip="Enhance" />
 * <SealIconButton.Custom color="#e53935" icon={Trash} tooltip="Delete" />
 * ```
 *
 * Always provide `tooltip` or `title` for screen-reader accessibility.
 * The root component also accepts a `variant` prop for programmatic selection.
 */
export const SealIconButton = Object.assign(SealIconButtonImpl, {
  Primary,
  Accent,
  AccentSecondary,
  Gradient,
  AccentGradient,
  Custom,
})
