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
  TOKEN_GRADIENT_ACCENT,
  TOKEN_GRADIENT_PRIMARY,
  TOKEN_PRIMITIVE_WHITE,
  VARIANT_ACCENT_GRADIENT,
  VARIANT_CUSTOM,
  VARIANT_GRADIENT,
} from '../shared'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SealIcon } from '@/types/icon'

/** Visual style variants for `SealTextButton`. */
export type SealTextButtonVariant = SealButtonVariant

/**
 * Props accepted by `SealTextButton` and its compound sub-components.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealTextButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * Prefer compound sub-components (`SealTextButton.Primary`, etc.) over this prop.
   */
  variant?: SealTextButtonVariant
  /**
   * Replaces button content with a spinner and suppresses interaction.
   * Button dimensions are preserved to prevent layout shift.
   * The text underline is hidden during loading to avoid visual noise.
   */
  loading?: boolean
  /**
   * Icon component rendered as a leading icon before the label.
   * Pass the component reference — the button controls its size using the
   * `--seal-constant-button-icon-size` token.
   * Hidden automatically when `loading` is `true`.
   *
   * @example
   * import { ArrowRight } from 'lucide-react'
   * <SealTextButton.Primary icon={ArrowRight}>Learn more</SealTextButton.Primary>
   */
  icon?: SealIcon
  /**
   * Solid CSS color for `SealTextButton.Custom`.
   * Must be a valid CSS color string (e.g. `'#ff0000'`, `'rgb(255,0,0)'`).
   */
  color?: string
  /**
   * CSS gradient string for `SealTextButton.Custom`.
   * Applied to text via `background-clip: text` and as a gradient underline.
   * Must be a valid CSS gradient string (e.g. `'linear-gradient(to right, #f00, #00f)'`).
   */
  gradient?: string
}

// CSS variable for the per-variant hover background color.
const TB_HOVER = '--seal-tb-hover'
const HOVER_ACTIVE = 'hover:bg-[var(--seal-tb-hover)] active:opacity-[0.75]'

// The gradient underline is built from two background layers on a <span>:
// - layer 0: covers the text (background-clip: text)
// - layer 1: a 1 px line anchored to the bottom of the content box
// -webkit-text-fill-color: transparent makes the text transparent so layer 0 shows.
function buildGradientUnderlineStyle(gradient: string, hide: boolean): React.CSSProperties {
  if (hide) {
    return {
      background: gradient,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }
  }
  return {
    // Two comma-separated background layers.
    background: `${gradient}, ${gradient}`,
    backgroundSize: 'auto, 100% 1px',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: '0 0, 0 100%',
    // First layer clips to text glyph shapes; second stays within the padding box to form the line.
    WebkitBackgroundClip: 'text, padding-box',
    backgroundClip: 'text, padding-box',
    WebkitTextFillColor: 'transparent',
    paddingBottom: 'var(--seal-dimension-xxxs)',
  }
}

interface TextVariantStyle {
  className: string
  wrapperStyle: React.CSSProperties | null
  buttonStyle: React.CSSProperties
}

function buildSolidStyle(fg: string): TextVariantStyle {
  return {
    className: cn(HOVER_ACTIVE),
    wrapperStyle: null,
    buttonStyle: {
      color: fg,
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      [TB_HOVER]: `color-mix(in srgb, ${fg} 8%, transparent)`,
    } as React.CSSProperties,
  }
}

function buildGradientVariantStyle(gradient: string, isLoading: boolean): TextVariantStyle {
  return {
    // Flutter uses white.withValues(alpha: 0.08) as the hover background overlay.
    className: 'hover:bg-primitive-white/[0.08] active:opacity-[0.75]',
    wrapperStyle: buildGradientUnderlineStyle(gradient, isLoading),
    buttonStyle: {
      // Keep the button background transparent — the gradient is applied only
      // to the text via background-clip: text on the wrapper span.
      color: TOKEN_PRIMITIVE_WHITE,
    },
  }
}

function getVariantStyle(
  variant: SealTextButtonVariant,
  color: string | undefined,
  gradient: string | undefined,
  isLoading: boolean,
): TextVariantStyle {
  switch (variant) {
    case 'primary':
      return buildSolidStyle('var(--seal-state-foreground-active)')
    case 'accent':
      return buildSolidStyle(TOKEN_ACCENT)
    case 'accent-secondary':
      return buildSolidStyle(TOKEN_ACCENT_SECONDARY)
    case VARIANT_GRADIENT:
      return buildGradientVariantStyle(TOKEN_GRADIENT_PRIMARY, isLoading)
    case VARIANT_ACCENT_GRADIENT:
      return buildGradientVariantStyle(TOKEN_GRADIENT_ACCENT, isLoading)
    case VARIANT_CUSTOM:
      if (gradient) return buildGradientVariantStyle(gradient, isLoading)
      return buildSolidStyle(color ?? CURRENT_COLOR)
  }
}

function getSpinnerColor(variant: SealTextButtonVariant): string | undefined {
  if (variant === VARIANT_GRADIENT) return TOKEN_BRAND_PRIMARY
  if (variant === VARIANT_ACCENT_GRADIENT) return TOKEN_ACCENT
  return undefined
}

function SealTextButtonImpl({
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
}: Readonly<SealTextButtonProps>) {
  const {
    className: variantClass,
    wrapperStyle,
    buttonStyle,
  } = getVariantStyle(variant, color, gradient, loading)
  const spinnerColor = getSpinnerColor(variant)
  const uid = useId().replaceAll(':', '')

  const iconNode = renderIcon(IconEl, variant, gradient, uid, 'tb')

  const labelNode = wrapperStyle ? <span style={wrapperStyle}>{children}</span> : children

  return (
    <Button
      variant="ghost"
      disabled={(disabled ?? false) || loading}
      aria-busy={loading || undefined}
      className={cn(
        'rounded-[var(--seal-radius-sm)] font-style-small',
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
        labelNode={labelNode}
        spinnerColor={spinnerColor}
      >
        {children}
      </ButtonContent>
    </Button>
  )
}

SealTextButtonImpl.displayName = 'SealTextButton'

type BaseProps = Omit<SealTextButtonProps, 'variant' | 'color' | 'gradient'>
type CustomProps = Omit<SealTextButtonProps, 'variant'>

/** Text button using the primary brand color. Default for tertiary actions. */
function Primary(props: Readonly<BaseProps>) {
  return <SealTextButtonImpl variant="primary" {...props} />
}
Primary.displayName = 'SealTextButton.Primary'

/** Text button using the accent color. */
function Accent(props: Readonly<BaseProps>) {
  return <SealTextButtonImpl variant="accent" {...props} />
}
Accent.displayName = 'SealTextButton.Accent'

/** Text button using the secondary accent color. */
function AccentSecondary(props: Readonly<BaseProps>) {
  return <SealTextButtonImpl variant="accent-secondary" {...props} />
}
AccentSecondary.displayName = 'SealTextButton.AccentSecondary'

/** Text button with primary gradient text and matching gradient underline. */
function Gradient(props: Readonly<BaseProps>) {
  return <SealTextButtonImpl variant="gradient" {...props} />
}
Gradient.displayName = 'SealTextButton.Gradient'

/** Text button with accent gradient text and matching gradient underline. */
function AccentGradient(props: Readonly<BaseProps>) {
  return <SealTextButtonImpl variant="accent-gradient" {...props} />
}
AccentGradient.displayName = 'SealTextButton.AccentGradient'

/**
 * Text button with an arbitrary color or gradient.
 * Pass `color` for a solid color or `gradient` for a CSS gradient string.
 */
function Custom(props: Readonly<CustomProps>) {
  return <SealTextButtonImpl variant="custom" {...props} />
}
Custom.displayName = 'SealTextButton.Custom'

/**
 * Borderless, background-less button that highlights with text color and a subtle underline.
 *
 * Use compound sub-components to select the visual treatment:
 *
 * ```tsx
 * <SealTextButton.Primary onClick={handleLearnMore}>Learn more</SealTextButton.Primary>
 * <SealTextButton.Gradient icon={ArrowRight}>Discover</SealTextButton.Gradient>
 * <SealTextButton.Custom color="#e53935" onClick={handleRetry}>Retry</SealTextButton.Custom>
 * ```
 *
 * The root component also accepts a `variant` prop for programmatic selection.
 */
export const SealTextButton = Object.assign(SealTextButtonImpl, {
  Primary,
  Accent,
  AccentSecondary,
  Gradient,
  AccentGradient,
  Custom,
})
