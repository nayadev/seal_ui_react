import * as React from 'react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

/**
 * Props for `SealSeparator`. Accepts all props of the underlying shadcn
 * `Separator` primitive, including `orientation`, `decorative`, and `className`.
 */
export type SealSeparatorProps = React.ComponentPropsWithoutRef<typeof Separator>

function SealSeparatorImpl({
  orientation = 'horizontal',
  decorative = true,
  className,
  ...props
}: Readonly<SealSeparatorProps>) {
  return (
    <Separator
      orientation={orientation}
      decorative={decorative}
      className={cn('bg-[var(--seal-border-default)]', className)}
      {...props}
    />
  )
}

type OrientationFixedProps = Omit<SealSeparatorProps, 'orientation'>

const Horizontal = (props: Readonly<OrientationFixedProps>) => (
  <SealSeparatorImpl orientation="horizontal" {...props} />
)
Horizontal.displayName = 'SealSeparator.Horizontal'

const Vertical = (props: Readonly<OrientationFixedProps>) => (
  <SealSeparatorImpl orientation="vertical" {...props} />
)
Vertical.displayName = 'SealSeparator.Vertical'

/**
 * Token-driven separator line wrapping the shadcn `Separator` primitive.
 *
 * Renders a 1 px rule using `--seal-border-default`. Defaults to horizontal;
 * use `SealSeparator.Vertical` or `orientation="vertical"` for column layouts.
 *
 * When used purely as a visual divider (no semantic meaning in the document
 * outline), keep `decorative={true}` (the default) so screen readers skip it.
 *
 * ```tsx
 * // Horizontal (default)
 * <SealSeparator />
 *
 * // Vertical — must be inside a flex/grid row with a defined height
 * <SealSeparator.Vertical className="h-6" />
 * ```
 */
export const SealSeparator = Object.assign(SealSeparatorImpl, {
  Horizontal,
  Vertical,
})
