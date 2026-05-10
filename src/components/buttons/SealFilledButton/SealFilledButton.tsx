import * as React from 'react'

import { ButtonContent, type SealButtonVariant } from '../shared'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SealIcon } from '@/types/icon'

/** Visual style variants for `SealFilledButton`. */
export type SealFilledButtonVariant = SealButtonVariant

/**
 * Props accepted by `SealFilledButton` and its compound sub-components.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealFilledButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * Prefer compound sub-components (`SealFilledButton.Primary`, etc.) over this prop.
   */
  variant?: SealFilledButtonVariant
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
   * import { Rocket } from 'lucide-react'
   * <SealFilledButton.Gradient icon={Rocket}>Launch</SealFilledButton.Gradient>
   */
  icon?: SealIcon
  /**
   * Solid CSS color for `SealFilledButton.Custom`.
   * Must be a valid CSS color string (e.g. `'#ff0000'`, `'rgb(255,0,0)'`).
   */
  color?: string
  /**
   * CSS gradient string for `SealFilledButton.Custom`.
   * Must be a valid CSS gradient (e.g. `'linear-gradient(to right, #f00, #00f)'`).
   */
  gradient?: string
}

const HOVER_ACTIVE = 'hover:opacity-[0.85] active:opacity-[0.75]'

function getVariantClass(variant: SealFilledButtonVariant): string {
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
  variant: SealFilledButtonVariant,
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

function SealFilledButtonImpl({
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
}: Readonly<SealFilledButtonProps>) {
  const backgroundStyle = resolveBackground(variant, color, gradient)

  return (
    <Button
      variant="default"
      disabled={(disabled ?? false) || loading}
      aria-busy={loading || undefined}
      className={cn(
        'rounded-[var(--seal-radius-sm)] font-style-small',
        'disabled:opacity-[var(--seal-state-disabled-opacity)]',
        getVariantClass(variant),
        className,
      )}
      style={{ ...backgroundStyle, ...style }}
      {...props}
    >
      <ButtonContent loading={loading} iconEl={IconEl}>
        {children}
      </ButtonContent>
    </Button>
  )
}

SealFilledButtonImpl.displayName = 'SealFilledButton'

type BaseProps = Omit<SealFilledButtonProps, 'variant' | 'color' | 'gradient'>
type CustomProps = Omit<SealFilledButtonProps, 'variant'>

/** Filled button using the primary brand color. Default for most actions. */
function Primary(props: Readonly<BaseProps>) {
  return <SealFilledButtonImpl variant="primary" {...props} />
}
Primary.displayName = 'SealFilledButton.Primary'

/** Filled button using the accent color. For secondary calls-to-action. */
function Accent(props: Readonly<BaseProps>) {
  return <SealFilledButtonImpl variant="accent" {...props} />
}
Accent.displayName = 'SealFilledButton.Accent'

/** Filled button using the secondary accent color. Softer visual emphasis. */
function AccentSecondary(props: Readonly<BaseProps>) {
  return <SealFilledButtonImpl variant="accent-secondary" {...props} />
}
AccentSecondary.displayName = 'SealFilledButton.AccentSecondary'

/** Filled button with primary gradient background. High visual weight — use sparingly. */
function Gradient(props: Readonly<BaseProps>) {
  return <SealFilledButtonImpl variant="gradient" {...props} />
}
Gradient.displayName = 'SealFilledButton.Gradient'

/** Filled button with accent gradient background. */
function AccentGradient(props: Readonly<BaseProps>) {
  return <SealFilledButtonImpl variant="accent-gradient" {...props} />
}
AccentGradient.displayName = 'SealFilledButton.AccentGradient'

/**
 * Filled button with an arbitrary fill color or gradient.
 * Pass `color` for a solid fill or `gradient` for a CSS gradient string.
 */
function Custom(props: Readonly<CustomProps>) {
  return <SealFilledButtonImpl variant="custom" {...props} />
}
Custom.displayName = 'SealFilledButton.Custom'

/**
 * Filled action button with token-driven color fills and gradient support.
 *
 * Use compound sub-components to select the visual treatment:
 *
 * ```tsx
 * <SealFilledButton.Primary onClick={handleSubmit}>Confirm</SealFilledButton.Primary>
 * <SealFilledButton.Gradient loading={isPending} icon={Rocket}>Launch</SealFilledButton.Gradient>
 * <SealFilledButton.Custom color="#e53935" onClick={handleDelete}>Delete</SealFilledButton.Custom>
 * ```
 *
 * The root component also accepts a `variant` prop for programmatic selection.
 */
export const SealFilledButton = Object.assign(SealFilledButtonImpl, {
  Primary,
  Accent,
  AccentSecondary,
  Gradient,
  AccentGradient,
  Custom,
})
