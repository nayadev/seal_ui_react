import type { LucideIcon } from 'lucide-react'
import * as React from 'react'

import { ButtonContent, type SealButtonVariant } from '../shared'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Visual style variants for `SealFilledButton`. */
export type SealFilledButtonVariant = SealButtonVariant

/**
 * Props accepted by `SealFilledButton`.
 *
 * Extends `<button>` attributes — all standard HTML button props are forwarded.
 */
export interface SealFilledButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> {
  /**
   * Visual style of the button.
   * - `primary`: brand color fill — default for most actions.
   * - `accent`: accent color fill — for secondary calls-to-action.
   * - `accent-secondary`: softer secondary accent.
   * - `gradient`: primary gradient background — high visual weight, use sparingly.
   * - `accent-gradient`: accent gradient background.
   * - `custom`: arbitrary fill; requires `color` (solid) or `gradient` (CSS gradient string).
   */
  variant?: SealFilledButtonVariant
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
   * import { Rocket } from 'lucide-react'
   * <SealFilledButton icon={Rocket}>Launch</SealFilledButton>
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
   * Must be a valid CSS gradient (e.g. `'linear-gradient(to right, #f00, #00f)'`).
   * Ignored for all other variants.
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
      return cn('text-white', HOVER_ACTIVE)
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

/**
 * Filled action button with token-driven color fills and gradient support.
 *
 * Wraps the shadcn `Button` primitive with Seal UI design tokens. Use the
 * `variant` prop to select the visual treatment; use `loading` to show an
 * inline spinner while an async action is pending without changing button size.
 *
 * @example
 * <SealFilledButton variant="primary" onClick={handleSubmit}>
 *   Confirm
 * </SealFilledButton>
 *
 * @example
 * <SealFilledButton variant="gradient" loading={isPending} icon={Rocket}>
 *   Launch
 * </SealFilledButton>
 *
 * @example
 * <SealFilledButton variant="custom" color="#e53935" onClick={handleDelete}>
 *   Delete
 * </SealFilledButton>
 */
export function SealFilledButton({
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
        'rounded-[var(--seal-radius-sm)] font-medium',
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
