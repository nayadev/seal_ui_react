import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/** Visual style variant for `SealBadge`. */
export type SealBadgeVariant =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'error'

/**
 * Props accepted by `SealBadge` and its compound sub-components.
 */
export interface SealBadgeProps {
  /**
   * Visual style of the badge.
   * Prefer compound sub-components (`SealBadge.Primary`, etc.) over this prop.
   */
  variant?: SealBadgeVariant
  /**
   * Makes the badge interactive. When provided, renders as a `<button>` element
   * for correct keyboard and screen-reader behavior.
   */
  onClick?: () => void
  /** Badge label or content. */
  children: React.ReactNode
  /** Additional CSS classes applied to the badge. */
  className?: string
}

// Matches Flutter's SealBadge._kSemanticBgOpacity = 0.15.
const SEMANTIC_BG_OPACITY = '15'

const VARIANT_STYLE: Record<SealBadgeVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--seal-state-fill-active)',
    color: 'var(--seal-text-on-primary)',
    borderColor: 'transparent',
  },
  accent: {
    background: 'var(--seal-accent-accent)',
    color: 'var(--seal-accent-on-accent)',
    borderColor: 'transparent',
  },
  secondary: {
    background: 'var(--seal-surface-surface-alt)',
    color: 'var(--seal-text-secondary)',
    borderColor: 'transparent',
  },
  outline: {
    background: 'transparent',
    color: 'var(--seal-text-primary)',
    borderColor: 'var(--seal-text-secondary)',
  },
  success: {
    background: `color-mix(in srgb, var(--seal-semantic-success) ${SEMANTIC_BG_OPACITY}%, transparent)`,
    color: 'var(--seal-semantic-success)',
    borderColor: 'transparent',
  },
  warning: {
    background: `color-mix(in srgb, var(--seal-semantic-warning) ${SEMANTIC_BG_OPACITY}%, transparent)`,
    color: 'var(--seal-semantic-warning)',
    borderColor: 'transparent',
  },
  error: {
    background: `color-mix(in srgb, var(--seal-semantic-error) ${SEMANTIC_BG_OPACITY}%, transparent)`,
    color: 'var(--seal-semantic-error)',
    borderColor: 'transparent',
  },
}

const BASE_CLASS =
  'inline-flex items-center border rounded-full ' +
  'px-dimension-xs py-dimension-xxxs ' +
  'text-style-small font-style-small select-none'

const INTERACTIVE_CLASS =
  'cursor-pointer transition-opacity hover:opacity-[0.85] active:opacity-[0.75]'

function SealBadgeImpl({
  variant = 'primary',
  onClick,
  children,
  className,
}: Readonly<SealBadgeProps>) {
  const style = VARIANT_STYLE[variant]
  const resolvedClass = cn(BASE_CLASS, onClick !== undefined && INTERACTIVE_CLASS, className)

  if (onClick !== undefined) {
    return (
      <button type="button" onClick={onClick} className={resolvedClass} style={style}>
        {children}
      </button>
    )
  }

  return (
    <Badge className={resolvedClass} style={style}>
      {children}
    </Badge>
  )
}

SealBadgeImpl.displayName = 'SealBadge'

type BaseProps = Omit<SealBadgeProps, 'variant'>

/** Badge with the primary brand color. Default for general-purpose status labels. */
function Primary(props: Readonly<BaseProps>) {
  return <SealBadgeImpl variant="primary" {...props} />
}
Primary.displayName = 'SealBadge.Primary'

/** Badge with the accent color. */
function Accent(props: Readonly<BaseProps>) {
  return <SealBadgeImpl variant="accent" {...props} />
}
Accent.displayName = 'SealBadge.Accent'

/** Badge with a muted secondary surface. Use for draft or neutral states. */
function Secondary(props: Readonly<BaseProps>) {
  return <SealBadgeImpl variant="secondary" {...props} />
}
Secondary.displayName = 'SealBadge.Secondary'

/** Badge with a transparent background and a visible border. */
function Outline(props: Readonly<BaseProps>) {
  return <SealBadgeImpl variant="outline" {...props} />
}
Outline.displayName = 'SealBadge.Outline'

/** Badge for success states — uses a low-opacity green background. */
function Success(props: Readonly<BaseProps>) {
  return <SealBadgeImpl variant="success" {...props} />
}
Success.displayName = 'SealBadge.Success'

/** Badge for warning states — uses a low-opacity amber background. */
function Warning(props: Readonly<BaseProps>) {
  return <SealBadgeImpl variant="warning" {...props} />
}
Warning.displayName = 'SealBadge.Warning'

/** Badge for error or destructive states — uses a low-opacity red background. */
function BadgeError(props: Readonly<BaseProps>) {
  return <SealBadgeImpl variant="error" {...props} />
}
BadgeError.displayName = 'SealBadge.Error'

/**
 * Compact pill-shaped label styled with Seal UI tokens.
 *
 * Use compound sub-components to select the visual variant:
 *
 * ```tsx
 * <SealBadge.Primary>New</SealBadge.Primary>
 * <SealBadge.Success>Active</SealBadge.Success>
 * <SealBadge.Error onClick={handleDismiss}>Expired</SealBadge.Error>
 * ```
 *
 * Semantic variants (success, warning, error) use a 15% opacity background
 * matching Flutter's `_kSemanticBgOpacity`, applied via CSS `color-mix`.
 *
 * When `onClick` is provided the badge renders as a `<button>` element
 * for correct keyboard and screen-reader interaction.
 */
export const SealBadge = Object.assign(SealBadgeImpl, {
  Primary,
  Accent,
  Secondary,
  Outline,
  Success,
  Warning,
  Error: BadgeError,
})
