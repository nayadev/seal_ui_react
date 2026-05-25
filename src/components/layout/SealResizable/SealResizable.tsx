import { GripVertical } from 'lucide-react'
import { Group, Panel, Separator } from 'react-resizable-panels'
import type { GroupProps, PanelProps, SeparatorProps } from 'react-resizable-panels'

import { cn } from '@/lib/utils'

/** Props for the `SealResizable` panel group root. */
export type SealResizablePanelGroupProps = GroupProps

/** Props for `SealResizable.Panel`. */
export type SealResizablePanelProps = PanelProps

/** Props for `SealResizable.Handle`. */
export type SealResizableHandleProps = SeparatorProps & {
  /**
   * When `true`, renders a centered grip icon on the handle to make it
   * visually discoverable. Prefer `true` when users may not expect drag
   * affordances, `false` for minimal or space-constrained layouts.
   */
  withHandle?: boolean
}

function SealResizablePanelGroupImpl({
  className,
  ...props
}: Readonly<SealResizablePanelGroupProps>) {
  return (
    <Group
      // The Group aria-orientation reflects the group itself; flex-col is needed for vertical.
      // Note: Group does NOT set aria-orientation on itself — the Separator does (inverted).
      className={cn('flex h-full w-full', className)}
      {...props}
    />
  )
}

function SealResizablePanelImpl({ className, ...props }: Readonly<SealResizablePanelProps>) {
  return <Panel className={cn('flex flex-col', className)} {...props} />
}

function SealResizableHandleImpl({
  withHandle,
  className,
  children,
  ...props
}: Readonly<SealResizableHandleProps>) {
  return (
    /*
     * In react-resizable-panels v2 the Separator's aria-orientation reflects the
     * separator line itself, NOT the group direction:
     *   horizontal group → vertical separator line  → aria-orientation="vertical"
     *   vertical group   → horizontal separator line → aria-orientation="horizontal"
     *
     * Base classes handle the vertical-separator case (horizontal group).
     * aria-[orientation=horizontal]:* overrides for the horizontal-separator case (vertical group).
     */
    <Separator
      className={cn(
        'relative w-px bg-[var(--seal-border-default)]',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--seal-brand-primary)] focus-visible:ring-offset-1',
        'aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            // Absolutely centered on the separator line regardless of orientation
            'absolute left-1/2 top-1/2 z-10',
            '-translate-x-1/2 -translate-y-1/2',
            'flex h-dimension-lg w-constant-button-icon-size items-center justify-center',
            'rounded-sm',
            'border border-[var(--seal-border-default)]',
            'bg-[var(--seal-surface-surface-alt)]',
          )}
        >
          <GripVertical className="h-3.5 w-3.5 text-[var(--seal-text-secondary)]" />
        </div>
      )}
      {children}
    </Separator>
  )
}

SealResizablePanelImpl.displayName = 'SealResizable.Panel'
SealResizableHandleImpl.displayName = 'SealResizable.Handle'

/**
 * Token-driven resizable panel group built on `react-resizable-panels`.
 *
 * Compose with `SealResizable.Panel` and `SealResizable.Handle` to build
 * drag-to-resize layouts. Panel sizes are expressed as percentages (0–100) —
 * this differs from the Flutter reference which uses a 0–1 proportion.
 *
 * @example
 * <SealResizable orientation="horizontal" className="h-48 rounded-[var(--seal-radius-md)] border border-[var(--seal-border-default)]">
 *   <SealResizable.Panel defaultSize={30} minSize={20}>Sidebar</SealResizable.Panel>
 *   <SealResizable.Handle withHandle />
 *   <SealResizable.Panel defaultSize={70} minSize={30}>Content</SealResizable.Panel>
 * </SealResizable>
 */
export const SealResizable = Object.assign(SealResizablePanelGroupImpl, {
  Panel: SealResizablePanelImpl,
  Handle: SealResizableHandleImpl,
})
