import * as React from 'react'
import { Toaster } from 'sonner'

import { ThemeContext } from '@/theme/ThemeProvider'

/** Screen position where the toast stack appears. */
export type SealSonnerPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

/**
 * Props accepted by `SealSonner`.
 */
export interface SealSonnerProps {
  /**
   * Optional subtree to render alongside the toast container.
   * Mirrors the Flutter `SealSonner` wrapper pattern.
   */
  children?: React.ReactNode
  /**
   * Screen position for the toast stack.
   * Defaults to `"bottom-right"`, matching Flutter's `Alignment.bottomRight`.
   */
  position?: SealSonnerPosition
  /**
   * Offset in pixels from the edge of the screen.
   * Accepts a number (px) or a CSS string (e.g. `"1rem"`).
   */
  offset?: string | number
  /**
   * Maximum number of toasts visible simultaneously.
   * Defaults to `3`, matching Flutter's default.
   */
  visibleToasts?: number
}

/**
 * Token-driven Sonner toast container for SealUI apps.
 *
 * Place `<SealSonner>` anywhere in the component tree — typically at the app
 * root alongside `ThemeProvider`. Once mounted, call any `SealToast.*` method
 * to display toasts.
 *
 * ```tsx
 * <ThemeProvider theme="nebula" mode="dark">
 *   <App />
 *   <SealSonner />
 * </ThemeProvider>
 * ```
 *
 * The component reads `ThemeContext` to synchronise the sonner `theme` prop
 * with the active SealUI mode, falling back to `"dark"` when no provider is
 * present.
 */
export function SealSonner({
  children,
  position = 'bottom-right',
  offset,
  visibleToasts = 3,
}: Readonly<SealSonnerProps>) {
  const themeCtx = React.useContext(ThemeContext)
  const resolvedTheme = themeCtx?.mode ?? 'dark'

  return (
    <>
      <Toaster
        theme={resolvedTheme}
        position={position}
        {...(offset !== undefined ? { offset } : {})}
        visibleToasts={visibleToasts}
        toastOptions={{
          style: {
            background: 'var(--seal-surface-surface-alt)',
            border: '1px solid var(--seal-border-default)',
            color: 'var(--seal-text-primary)',
            borderRadius: 'var(--seal-radius-sm)',
          },
          classNames: {
            description: 'text-[var(--seal-text-secondary)]',
            actionButton:
              'bg-transparent! text-[var(--seal-brand-primary)] hover:opacity-[0.85] border-none! underline p-0! h-auto!',
            title: 'text-[var(--seal-text-primary)] font-semibold text-sm',
          },
        }}
      />
      {children}
    </>
  )
}
