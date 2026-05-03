import * as React from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

/** Positioning side of the tooltip relative to its trigger. */
export type SealTooltipSide = 'top' | 'bottom' | 'left' | 'right'

/** Alignment of the tooltip popup along the trigger's axis. */
export type SealTooltipAlign = 'start' | 'center' | 'end'

/**
 * Props accepted by `SealTooltip`.
 */
export interface SealTooltipProps {
  /** Element that triggers the tooltip on hover or keyboard focus. */
  children: React.ReactElement
  /** Content rendered inside the tooltip popup. Accepts plain text or rich React nodes. */
  content: React.ReactNode
  /**
   * Side of the trigger where the tooltip appears.
   * Defaults to `"top"`, matching the Flutter reference default anchor.
   */
  side?: SealTooltipSide
  /** Alignment of the popup along the trigger's cross-axis. Defaults to `"center"`. */
  align?: SealTooltipAlign
  /**
   * Milliseconds to wait after the pointer enters before showing the tooltip.
   * Defaults to `200`. Set to `0` for instant feedback.
   */
  delayDuration?: number
  /**
   * Gap in pixels between the tooltip edge and the trigger.
   * Defaults to `8` — matches the Flutter `dimension.xs` offset.
   */
  sideOffset?: number
  /**
   * Controls the open state in controlled mode.
   * Omit for uncontrolled behavior driven by hover and focus.
   */
  open?: boolean
  /** Called when the open state changes. Required when `open` is provided. */
  onOpenChange?: (open: boolean) => void
  /** Additional CSS classes applied to the tooltip content element. */
  className?: string
}

/**
 * Floating label that appears when the user hovers or focuses the trigger element.
 *
 * Wraps the Radix Tooltip primitive with Seal UI token-based styling. Accepts any
 * React node as content, suitable for plain-text tips and richer layouts alike.
 *
 * @example
 * <SealTooltip content="Delete item">
 *   <SealIconButton.Outline icon={Trash2} tooltip="Delete" />
 * </SealTooltip>
 *
 * @example
 * <SealTooltip content={<span>Keyboard shortcut: <kbd>⌘K</kbd></span>} side="right">
 *   <button>Open palette</button>
 * </SealTooltip>
 */
export function SealTooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  delayDuration = 200,
  sideOffset = 8,
  open,
  onOpenChange,
  className,
}: Readonly<SealTooltipProps>) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip
        {...(open === undefined ? {} : { open })}
        {...(onOpenChange === undefined ? {} : { onOpenChange })}
      >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'bg-[var(--seal-surface-surface)] border border-[var(--seal-border-default)]',
            'rounded-[var(--seal-radius-sm)]',
            'px-[var(--seal-dimension-sm)] py-[var(--seal-dimension-xxs)]',
            'text-[var(--seal-text-primary)] font-style-small',
            'shadow-none',
            className,
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
