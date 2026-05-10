import * as React from 'react'

import { ButtonContent, type SealButtonVariant } from '../shared'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SealIcon } from '@/types/icon'

/** Visual style variants for `SealFilledIconButton`. */
export type SealFilledIconButtonVariant = SealButtonVariant

/**
 * Props accepted by `SealFilledIconButton` and its compound sub-components.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealFilledIconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * Prefer compound sub-components (`SealFilledIconButton.Primary`, etc.) over this prop.
   */
  variant?: SealFilledIconButtonVariant
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
   * Solid CSS color for `SealFilledIconButton.Custom`.
   * Must be a valid CSS color string (e.g. `'#ff0000'`, `'rgb(255,0,0)'`).
   */
  color?: string
  /**
   * CSS gradient string for `SealFilledIconButton.Custom`.
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

function SealFilledIconButtonImpl({
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

SealFilledIconButtonImpl.displayName = 'SealFilledIconButton'

type BaseProps = Omit<SealFilledIconButtonProps, 'variant' | 'color' | 'gradient'>
type CustomProps = Omit<SealFilledIconButtonProps, 'variant'>

/** Filled icon button using the primary brand color. */
function Primary(props: Readonly<BaseProps>) {
  return <SealFilledIconButtonImpl variant="primary" {...props} />
}
Primary.displayName = 'SealFilledIconButton.Primary'

/** Filled icon button using the accent color. */
function Accent(props: Readonly<BaseProps>) {
  return <SealFilledIconButtonImpl variant="accent" {...props} />
}
Accent.displayName = 'SealFilledIconButton.Accent'

/** Filled icon button using the secondary accent color. */
function AccentSecondary(props: Readonly<BaseProps>) {
  return <SealFilledIconButtonImpl variant="accent-secondary" {...props} />
}
AccentSecondary.displayName = 'SealFilledIconButton.AccentSecondary'

/** Filled icon button with primary gradient background. */
function Gradient(props: Readonly<BaseProps>) {
  return <SealFilledIconButtonImpl variant="gradient" {...props} />
}
Gradient.displayName = 'SealFilledIconButton.Gradient'

/** Filled icon button with accent gradient background. */
function AccentGradient(props: Readonly<BaseProps>) {
  return <SealFilledIconButtonImpl variant="accent-gradient" {...props} />
}
AccentGradient.displayName = 'SealFilledIconButton.AccentGradient'

/**
 * Filled icon button with an arbitrary fill color or gradient.
 * Pass `color` for a solid fill or `gradient` for a CSS gradient string.
 */
function Custom(props: Readonly<CustomProps>) {
  return <SealFilledIconButtonImpl variant="custom" {...props} />
}
Custom.displayName = 'SealFilledIconButton.Custom'

/**
 * Compact icon-only button with a filled background.
 *
 * Use compound sub-components to select the visual treatment:
 *
 * ```tsx
 * <SealFilledIconButton.Primary icon={Plus} tooltip="Add item" onClick={handleAdd} />
 * <SealFilledIconButton.Gradient icon={Rocket} tooltip="Launch" />
 * <SealFilledIconButton.Custom color="#e53935" icon={Trash} tooltip="Delete" />
 * ```
 *
 * Always provide `tooltip` or `title` for screen-reader accessibility.
 * The root component also accepts a `variant` prop for programmatic selection.
 */
export const SealFilledIconButton = Object.assign(SealFilledIconButtonImpl, {
  Primary,
  Accent,
  AccentSecondary,
  Gradient,
  AccentGradient,
  Custom,
})
