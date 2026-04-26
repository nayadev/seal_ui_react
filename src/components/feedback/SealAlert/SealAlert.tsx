import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'
import * as React from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

/** Semantic variant that controls color, icon, and accessible role of the alert. */
export type SealAlertVariant = 'info' | 'success' | 'warning' | 'error'

/**
 * Props accepted by `SealAlert`.
 */
export interface SealAlertProps {
  /**
   * Semantic meaning of the alert.
   * - `info`: neutral informational message
   * - `success`: confirmation of a completed action
   * - `warning`: non-critical issue requiring attention
   * - `error`: failure or blocking error
   */
  variant: SealAlertVariant
  /**
   * Optional bold title rendered above the description.
   * When omitted, the description is rendered with primary text color
   * instead of secondary.
   */
  title?: string
  /** Primary descriptive message shown in the alert body. */
  description: string
  /** Additional CSS classes applied to the alert container. */
  className?: string
}

const VARIANT_TOKEN: Record<SealAlertVariant, string> = {
  info: 'var(--seal-semantic-info)',
  success: 'var(--seal-semantic-success)',
  warning: 'var(--seal-semantic-warning)',
  error: 'var(--seal-semantic-error)',
}

type AlertIcon = React.ComponentType<React.SVGAttributes<SVGElement> & { size?: number }>

const VARIANT_ICON: Record<SealAlertVariant, AlertIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
}

const ICON_SIZE = 16

/**
 * Inline alert banner for contextual feedback, styled with Seal UI semantic tokens.
 *
 * Renders as a static element inside the layout — stays visible until dismissed
 * by state change. For transient, auto-dismissing notifications use `SealSonner`
 * instead.
 *
 * Background and border opacity follow the Flutter reference constants
 * (8% and 35%), applied via CSS `color-mix` against the semantic token.
 *
 * @example
 * <SealAlert variant="success" title="Profile updated" description="Your changes were saved." />
 *
 * @example
 * <SealAlert variant="error" description="Upload failed. Please try again." />
 */
export function SealAlert({ variant, title, description, className }: Readonly<SealAlertProps>) {
  const accentColor = VARIANT_TOKEN[variant]
  const IconComponent = VARIANT_ICON[variant]

  return (
    <Alert
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={cn('rounded-[var(--seal-radius-sm)] border font-style-small', className)}
      style={{
        background: `color-mix(in srgb, ${accentColor} 8%, transparent)`,
        borderColor: `color-mix(in srgb, ${accentColor} 35%, transparent)`,
      }}
    >
      <IconComponent
        size={ICON_SIZE}
        className="text-[var(--seal-semantic-inherit)]"
        style={{ color: accentColor }}
        aria-hidden
      />
      {title !== undefined && (
        <AlertTitle className="text-[var(--seal-text-primary)] font-semibold">{title}</AlertTitle>
      )}
      <AlertDescription
        className={cn(
          title === undefined
            ? 'text-[var(--seal-text-primary)]'
            : 'text-[var(--seal-text-secondary)]',
        )}
      >
        {description}
      </AlertDescription>
    </Alert>
  )
}
