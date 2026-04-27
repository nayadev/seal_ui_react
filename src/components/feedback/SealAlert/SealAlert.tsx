import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'
import * as React from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

/** Semantic variant that controls color, icon, and accessible role of the alert. */
export type SealAlertVariant = 'info' | 'success' | 'warning' | 'error'

/**
 * Props accepted by `SealAlert` and its compound sub-components.
 */
export interface SealAlertProps {
  /**
   * Semantic meaning of the alert.
   * Prefer compound sub-components (`SealAlert.Info`, `SealAlert.Error`, etc.) over this prop.
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

function SealAlertImpl({ variant, title, description, className }: Readonly<SealAlertProps>) {
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

SealAlertImpl.displayName = 'SealAlert'

type BaseProps = Omit<SealAlertProps, 'variant'>

/** Informational alert — neutral message for tips and guidance. */
function InfoAlert(props: Readonly<BaseProps>) {
  return <SealAlertImpl variant="info" {...props} />
}
InfoAlert.displayName = 'SealAlert.Info'

/** Success alert — confirms a completed action. */
function Success(props: Readonly<BaseProps>) {
  return <SealAlertImpl variant="success" {...props} />
}
Success.displayName = 'SealAlert.Success'

/** Warning alert — non-critical issue requiring attention. */
function Warning(props: Readonly<BaseProps>) {
  return <SealAlertImpl variant="warning" {...props} />
}
Warning.displayName = 'SealAlert.Warning'

/** Error alert — failure or blocking error. Uses `aria-live="assertive"` to interrupt screen readers. */
function ErrorAlert(props: Readonly<BaseProps>) {
  return <SealAlertImpl variant="error" {...props} />
}
ErrorAlert.displayName = 'SealAlert.Error'

/**
 * Inline alert banner for contextual feedback, styled with Seal UI semantic tokens.
 *
 * Use compound sub-components to select the semantic variant:
 *
 * ```tsx
 * <SealAlert.Info title="Heads up!" description="You can add components via the CLI." />
 * <SealAlert.Success title="Profile updated" description="Your changes were saved." />
 * <SealAlert.Error description="Upload failed. Please try again." />
 * ```
 *
 * Background and border opacity follow the Flutter reference constants
 * (8% and 35%), applied via CSS `color-mix` against the semantic token.
 * The root component also accepts a `variant` prop for programmatic selection.
 */
export const SealAlert = Object.assign(SealAlertImpl, {
  Info: InfoAlert,
  Success,
  Warning,
  Error: ErrorAlert,
})
