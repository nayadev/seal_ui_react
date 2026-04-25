import { constantButtonIconSize } from '@sealui/tokens'
import type { LucideIcon } from 'lucide-react'
import * as React from 'react'

import { BouncingDots } from '@/components/buttons/bouncing-dots'
import { GradientIcon } from '@/components/buttons/gradient-icon'

/** Common button variants for SealUI buttons. */
export type SealButtonVariant =
  | 'primary'
  | 'accent'
  | 'accent-secondary'
  | 'gradient'
  | 'accent-gradient'
  | 'custom'

export const TOKEN_BRAND_PRIMARY = 'var(--seal-brand-primary)'
export const TOKEN_BRAND_SHADE = 'var(--seal-brand-primary-shade)'
export const TOKEN_ACCENT = 'var(--seal-accent-accent)'
export const TOKEN_ACCENT_SECONDARY = 'var(--seal-accent-accent-secondary)'
export const TOKEN_PRIMITIVE_WHITE = 'var(--seal-primitive-white)'
export const TOKEN_GRADIENT_PRIMARY = 'var(--seal-gradient-primary)'
export const TOKEN_GRADIENT_ACCENT = 'var(--seal-gradient-accent)'
export const VARIANT_GRADIENT = 'gradient' as const
export const VARIANT_ACCENT_GRADIENT = 'accent-gradient' as const
export const VARIANT_CUSTOM = 'custom' as const
export const CURRENT_COLOR = 'currentColor'

/** Resolves the gradient stop colors for SVG linearGradient based on variant. */
export function resolveIconGradientInfo(variant: string, gradient?: string) {
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
    iconGradientSource = gradient
  }

  return { iconColorStart, iconColorEnd, iconGradientSource }
}

/** Resolves and renders the appropriate icon node for the button variant. */
export function renderIcon(
  IconEl: LucideIcon | undefined,
  variant: string,
  gradient: string | undefined,
  uid: string,
  prefix: string,
) {
  const isGradientVariant =
    variant === VARIANT_GRADIENT ||
    variant === VARIANT_ACCENT_GRADIENT ||
    (variant === VARIANT_CUSTOM && !!gradient)

  if (IconEl && isGradientVariant) {
    const { iconColorStart, iconColorEnd, iconGradientSource } = resolveIconGradientInfo(
      variant,
      gradient,
    )
    return (
      <GradientIcon
        icon={IconEl}
        size={constantButtonIconSize}
        gradientId={`seal-${prefix}-grad-${uid}`}
        colorStart={iconColorStart}
        colorEnd={iconColorEnd}
        gradientSource={iconGradientSource}
      />
    )
  }

  if (IconEl) {
    return <IconEl size={constantButtonIconSize} />
  }

  return null
}

/** Props for the internal ButtonContent wrapper. */
export interface ButtonContentProps {
  loading: boolean
  iconNode?: React.ReactNode | undefined
  iconEl?: LucideIcon | undefined
  children: React.ReactNode
  labelNode?: React.ReactNode | undefined
  spinnerColor?: string | undefined
}

/** Internal button content wrapper that handles the loading spinner and icon layout. */
export function ButtonContent({
  loading,
  iconNode,
  iconEl: IconEl,
  children,
  labelNode,
  spinnerColor,
}: Readonly<ButtonContentProps>) {
  if (loading) {
    return (
      <span className="relative flex items-center justify-center">
        <span aria-hidden className="invisible flex items-center gap-2">
          {IconEl && <IconEl size={constantButtonIconSize} />}
          {children}
        </span>
        <span className="absolute inset-0 flex items-center justify-center">
          <BouncingDots color={spinnerColor} />
        </span>
      </span>
    )
  }

  return (
    <>
      {iconNode ?? (IconEl && <IconEl size={constantButtonIconSize} />)}
      {labelNode ?? children}
    </>
  )
}
