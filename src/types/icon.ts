import type React from 'react'

/**
 * A generic icon component type compatible with lucide-react, phosphor,
 * heroicons, and any library that accepts `size` and `className` props.
 *
 * Prefer this over library-specific types (e.g. `LucideIcon`) to keep
 * the component API decoupled from the icon library in use.
 */
export type SealIcon = React.ComponentType<{ size?: number | string; className?: string }>
