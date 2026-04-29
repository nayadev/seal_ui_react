import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'
import type React from 'react'
import { toast } from 'sonner'

import type { SealIcon } from '@/types/icon'

/** Semantic variant for a `SealToast` notification. */
export type SealToastVariant = 'info' | 'success' | 'warning' | 'error'

/**
 * Options shared by all `SealToast` variant methods.
 */
export interface SealToastParams {
  /** Primary message displayed in the toast body. */
  message: string
  /**
   * Optional bold title shown above `message`.
   * When omitted, `message` is used as the title.
   */
  title?: string
  /**
   * How long (in ms) the toast stays visible.
   * Defaults to `5000` (5 seconds).
   */
  duration?: number
  /**
   * Optional action button rendered inside the toast.
   * Requires both `label` and `onClick` to appear.
   */
  action?: { label: string; onClick: () => void }
}

/**
 * Options for `SealToast.custom` — extends base params with icon and color overrides.
 */
export interface SealToastCustomParams extends SealToastParams {
  /**
   * Icon component displayed next to the title.
   * Accepts any `SealIcon`-compatible component reference.
   */
  icon?: SealIcon
  /**
   * Accent color applied to the icon.
   * Defaults to `var(--seal-brand-primary)`.
   */
  color?: string
}

type InternalIcon = React.ComponentType<React.SVGAttributes<SVGElement> & { size?: number }>

const VARIANT_COLOR: Record<SealToastVariant, string> = {
  info: 'var(--seal-semantic-info)',
  success: 'var(--seal-semantic-success)',
  warning: 'var(--seal-semantic-warning)',
  error: 'var(--seal-semantic-error)',
}

const VARIANT_ICON: Record<SealToastVariant, InternalIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
}

const VARIANT_FN = {
  info: toast.info,
  success: toast.success,
  warning: toast.warning,
  error: toast.error,
} as const

function buildStyle(): React.CSSProperties {
  return {
    background: 'var(--seal-surface-surface-alt)',
    border: '1px solid var(--seal-border-default)',
    color: 'var(--seal-text-primary)',
  }
}

function buildOptions(params: SealToastParams, accentColor: string) {
  const { message, title, duration = 5000, action } = params
  return {
    ...(title === undefined ? {} : { description: message }),
    duration,
    ...(action === undefined
      ? {}
      : {
          action: { label: action.label, onClick: action.onClick },
          // Action button color matches the icon, mirroring Flutter's SealTextButton.custom(color: accentColor)
          actionButtonStyle: { color: accentColor } as React.CSSProperties,
        }),
    style: buildStyle(),
    descriptionClassName: 'text-[var(--seal-text-secondary)]',
  }
}

function showVariant(variant: SealToastVariant, params: SealToastParams) {
  const color = VARIANT_COLOR[variant]
  const IconComp = VARIANT_ICON[variant]
  const icon = <IconComp size={16} style={{ color }} aria-hidden />
  const toastTitle = params.title ?? params.message
  return VARIANT_FN[variant](toastTitle, { ...buildOptions(params, color), icon })
}

/**
 * Imperative toast API styled with Seal UI tokens.
 *
 * Requires a `<SealSonner>` ancestor in the component tree to render toasts.
 *
 * Use variant methods for semantic feedback:
 *
 * ```tsx
 * SealToast.success({ message: 'Profile saved.' })
 *
 * SealToast.error({
 *   message: 'Upload failed.',
 *   title: 'Error',
 *   action: { label: 'Retry', onClick: handleRetry },
 * })
 *
 * SealToast.custom({ message: 'Synced.', icon: RefreshCw, color: '#00BCD4' })
 * ```
 *
 * Each method returns the toast ID, which can be passed to `SealToast.dismiss`
 * to remove the toast programmatically.
 */
export const SealToast = {
  /** Shows an informational toast with the semantic info color. */
  info: (params: SealToastParams) => showVariant('info', params),

  /** Shows a success toast confirming a completed action. */
  success: (params: SealToastParams) => showVariant('success', params),

  /** Shows a warning toast for non-critical issues. */
  warning: (params: SealToastParams) => showVariant('warning', params),

  /** Shows an error toast for failures or blocking errors. */
  error: (params: SealToastParams) => showVariant('error', params),

  /**
   * Shows a custom toast with an optional icon and accent color.
   *
   * When `icon` is omitted, no icon is shown.
   * When `color` is omitted, the icon defaults to `var(--seal-brand-primary)`.
   */
  custom: ({
    icon: IconComp,
    color = 'var(--seal-brand-primary)',
    ...params
  }: SealToastCustomParams) => {
    const icon = IconComp ? (
      // Wrap in a span to apply the color without widening SealIcon's prop contract
      <span style={{ color, display: 'contents' }} aria-hidden>
        <IconComp size={16} />
      </span>
    ) : undefined
    const toastTitle = params.title ?? params.message
    return toast(toastTitle, {
      ...buildOptions(params, color),
      ...(icon === undefined ? {} : { icon }),
    })
  },

  /**
   * Dismisses a toast by ID, or all toasts when no ID is provided.
   *
   * @param id - The ID returned by a previous `SealToast.*` call.
   */
  dismiss: (id?: string | number) => toast.dismiss(id),
}
