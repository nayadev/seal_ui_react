import { constantButtonIconSize } from '@sealui/tokens'
import { type LucideIcon, Loader2 } from 'lucide-react'
import * as React from 'react'
import { useEffect, useId, useState } from 'react'

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

/**
 * Renders a Lucide icon with its stroke painted by an SVG linearGradient.
 * This mirrors Flutter's ShaderMask approach, which covers both text and icon
 * with the same gradient shader.
 */
interface GradientIconProps {
  readonly icon: LucideIcon
  readonly size: string | number
  readonly gradientId: string
  readonly colorStart: string
  readonly colorEnd: string
  /** CSS gradient variable (e.g. `var(--seal-gradient-primary)`) or raw gradient string.
   * Used at runtime to resolve the direction so the SVG coords always match the token. */
  readonly gradientSource: string
}

const VIEWBOX_SIZE = 24

// Coords representing a top-left→bottom-right diagonal — matches the direction
// of all current gradient tokens. Used as the initial value before the CSS
// variable is resolved (JSDOM / first render before theme class is applied).
const FALLBACK_COORDS = { x1: '0', y1: '0', x2: '24', y2: '24' }

// Converts direction keywords ("to bottom right", "to right", etc.)
// to a CSS gradient angle in degrees (0° = up, clockwise).
function keywordsToAngle(d: string): number {
  const b = d.includes('bottom')
  const t = d.includes('top')
  const r = d.includes('right')
  const l = d.includes('left')
  if (b && r) return 135
  if (b && l) return 225
  if (t && r) return 45
  if (t && l) return 315
  if (r) return 90
  if (l) return 270
  if (b) return 180
  return 0
}

function parseSvgGradientCoords(gradientStr: string): typeof FALLBACK_COORDS {
  // [^,)]+ is greedy and possessive — no backtracking risk.
  const match = /linear-gradient\(([^,)]+)/.exec(gradientStr)
  if (!match?.[1]) return FALLBACK_COORDS
  const d = match[1].toLowerCase().trim()
  const angleDeg = d.includes('deg') ? Number.parseFloat(d) : keywordsToAngle(d)
  const rad = (angleDeg * Math.PI) / 180
  const half = VIEWBOX_SIZE / 2
  return {
    x1: String(half - Math.sin(rad) * half),
    y1: String(half + Math.cos(rad) * half),
    x2: String(half + Math.sin(rad) * half),
    y2: String(half - Math.cos(rad) * half),
  }
}

function resolveGradientCoords(gradientSource: string): typeof FALLBACK_COORDS {
  const str = gradientSource.startsWith('var(')
    ? getComputedStyle(document.documentElement)
        .getPropertyValue(gradientSource.slice(4, -1).trim())
        .trim()
    : gradientSource
  if (!str) return FALLBACK_COORDS
  return parseSvgGradientCoords(str)
}

const CLIP_TEXT: React.CSSProperties = {
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}
const TOKEN_BRAND_PRIMARY = 'var(--seal-brand-primary)'
const TOKEN_BRAND_SHADE = 'var(--seal-brand-primary-shade)'
const TOKEN_ACCENT = 'var(--seal-accent-accent)'
const TOKEN_ACCENT_SECONDARY = 'var(--seal-accent-accent-secondary)'
const TOKEN_PRIMITIVE_WHITE = 'var(--seal-primitive-white)'
const TOKEN_GRADIENT_PRIMARY = 'var(--seal-gradient-primary)'
const TOKEN_GRADIENT_ACCENT = 'var(--seal-gradient-accent)'
const VARIANT_GRADIENT = 'gradient' as const
const VARIANT_ACCENT_GRADIENT = 'accent-gradient' as const
const VARIANT_CUSTOM = 'custom' as const
const CURRENT_COLOR = 'currentColor'

function GradientIcon({
  icon: IconEl,
  size,
  gradientId,
  colorStart,
  colorEnd,
  gradientSource,
}: GradientIconProps) {
  // For raw gradient strings (custom variant), resolve on the spot during render.
  // For CSS variable references, start with FALLBACK_COORDS and let the
  // MutationObserver update coords once ThemeProvider applies the theme class.
  const [coords, setCoords] = useState(() =>
    gradientSource.startsWith('var(') ? FALLBACK_COORDS : resolveGradientCoords(gradientSource),
  )

  useEffect(() => {
    // Re-read the CSS variable whenever the theme class on <html> changes.
    // Calling setCoords inside a MutationObserver callback is an external system
    // trigger — not synchronous in the effect body — so it avoids cascading-render
    // concerns and aligns with React’s model for external state synchronization.
    const readCoords = () => {
      setCoords(resolveGradientCoords(gradientSource))
    }
    const observer = new MutationObserver(readCoords)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      observer.disconnect()
    }
  }, [gradientSource])

  return (
    <span aria-hidden style={{ display: 'inline-flex' }}>
      <IconEl size={size} stroke={`url(#${gradientId})`}>
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
          >
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
      </IconEl>
    </span>
  )
}

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

function buildGradientStyle(gradient: string, borderBase: string): OutlineVariantStyle {
  return {
    className: cn(OUTLINE_BASE, GRADIENT_HOVER),
    style: {
      background: gradient,
      ...CLIP_TEXT,
      borderColor: `color-mix(in srgb, ${borderBase} 50%, transparent)`,
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
      return buildGradientStyle(TOKEN_GRADIENT_ACCENT, TOKEN_ACCENT)
    case VARIANT_CUSTOM:
      if (gradient) {
        return buildGradientStyle(gradient, TOKEN_PRIMITIVE_WHITE)
      }
      return buildSolidStyle(color ?? CURRENT_COLOR)
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
  const uid = useId().replaceAll(':', '')

  const isGradientVariant =
    variant === VARIANT_GRADIENT ||
    variant === VARIANT_ACCENT_GRADIENT ||
    (variant === VARIANT_CUSTOM && !!gradient)

  // Resolve gradient stop colors from CSS variables for SVG linearGradient.
  let iconColorStart = CURRENT_COLOR
  let iconColorEnd = CURRENT_COLOR
  let iconGradientSource = TOKEN_GRADIENT_PRIMARY
  if (variant === VARIANT_GRADIENT) {
    iconColorStart = TOKEN_BRAND_PRIMARY
    iconColorEnd = TOKEN_ACCENT_SECONDARY
    iconGradientSource = TOKEN_GRADIENT_PRIMARY
  } else if (variant === VARIANT_ACCENT_GRADIENT) {
    iconColorStart = TOKEN_BRAND_SHADE
    iconColorEnd = TOKEN_ACCENT
    iconGradientSource = TOKEN_GRADIENT_ACCENT
  } else if (variant === VARIANT_CUSTOM && gradient) {
    // For custom gradients, parse direction directly from the user-supplied string.
    iconGradientSource = gradient
  }

  const gradientIconId = `seal-ob-grad-${uid}`

  let iconNode: React.ReactNode = null
  if (IconEl && isGradientVariant) {
    iconNode = (
      <GradientIcon
        icon={IconEl}
        size={constantButtonIconSize}
        gradientId={gradientIconId}
        colorStart={iconColorStart}
        colorEnd={iconColorEnd}
        gradientSource={iconGradientSource}
      />
    )
  } else if (IconEl) {
    iconNode = <IconEl size={constantButtonIconSize} />
  }

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
          {iconNode}
          {children}
        </>
      )}
    </Button>
  )
}
