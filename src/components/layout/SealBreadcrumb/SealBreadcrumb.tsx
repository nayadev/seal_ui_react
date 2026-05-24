import * as React from 'react'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

/**
 * Props for the root `SealBreadcrumb` nav container.
 */
export type SealBreadcrumbProps = React.ComponentPropsWithoutRef<'nav'>

/**
 * Props for `SealBreadcrumb.Item` — a single breadcrumb slot in the list.
 */
export type SealBreadcrumbItemProps = React.ComponentPropsWithoutRef<'li'>

/**
 * Props for `SealBreadcrumb.Link` — a navigable breadcrumb step.
 */
export interface SealBreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * When `true`, renders the child element directly via Radix `Slot`,
   * allowing any element (e.g. a router `<Link>`) to receive the breadcrumb
   * link styles.
   */
  asChild?: boolean
}

/**
 * Props for `SealBreadcrumb.Page` — the non-interactive current-page label.
 */
export type SealBreadcrumbPageProps = React.ComponentPropsWithoutRef<'span'>

/**
 * Props for `SealBreadcrumb.Separator`.
 */
export interface SealBreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<'li'> {
  /** Custom separator content. Defaults to a `ChevronRight` icon. */
  children?: React.ReactNode
}

/**
 * Props for `SealBreadcrumb.Dropdown` — a popover that reveals hidden
 * breadcrumb levels when navigating a deeply nested hierarchy.
 */
export interface SealBreadcrumbDropdownProps {
  /**
   * The hidden items to display in the dropdown.
   * Prefer `SealBreadcrumb.DropMenuItem` for each entry.
   */
  children: React.ReactNode
}

/**
 * Props for `SealBreadcrumb.DropMenuItem` — a single item inside a
 * `SealBreadcrumb.Dropdown`.
 */
export interface SealBreadcrumbDropMenuItemProps {
  /** The item label. */
  children: React.ReactNode
  /** Called when the item is clicked. */
  onClick?: () => void
  /** Additional CSS classes. */
  className?: string
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

function SealBreadcrumbImpl({ children, className, ...props }: Readonly<SealBreadcrumbProps>) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList
        className={cn(
          'flex flex-wrap items-center gap-[var(--seal-dimension-xs)] text-sm',
          className,
        )}
      >
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

SealBreadcrumbImpl.displayName = 'SealBreadcrumb'

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

function Item({ children, className, ...props }: Readonly<SealBreadcrumbItemProps>) {
  return (
    <BreadcrumbItem
      className={cn('inline-flex items-center gap-[var(--seal-dimension-xs)]', className)}
      {...props}
    >
      {children}
    </BreadcrumbItem>
  )
}

Item.displayName = 'SealBreadcrumb.Item'

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------

function Link({ children, className, asChild, ...props }: Readonly<SealBreadcrumbLinkProps>) {
  return (
    <BreadcrumbLink
      {...(asChild === true && { asChild })}
      className={cn(
        'text-[var(--seal-text-secondary)] transition-colors hover:text-[var(--seal-text-primary)]',
        className,
      )}
      {...props}
    >
      {children}
    </BreadcrumbLink>
  )
}

Link.displayName = 'SealBreadcrumb.Link'

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function Page({ children, className, ...props }: Readonly<SealBreadcrumbPageProps>) {
  return (
    <BreadcrumbPage
      className={cn('font-normal text-[var(--seal-text-primary)]', className)}
      {...props}
    >
      {children}
    </BreadcrumbPage>
  )
}

Page.displayName = 'SealBreadcrumb.Page'

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

function Separator({ children, className, ...props }: Readonly<SealBreadcrumbSeparatorProps>) {
  return (
    <BreadcrumbSeparator
      className={cn('text-[var(--seal-text-secondary)] [&>svg]:size-3.5', className)}
      {...props}
    >
      {children}
    </BreadcrumbSeparator>
  )
}

Separator.displayName = 'SealBreadcrumb.Separator'

// ---------------------------------------------------------------------------
// Ellipsis
// ---------------------------------------------------------------------------

function Ellipsis({ className, ...props }: Readonly<React.ComponentPropsWithoutRef<'span'>>) {
  return (
    <BreadcrumbEllipsis
      className={cn(
        'flex size-9 items-center justify-center text-[var(--seal-text-secondary)]',
        className,
      )}
      {...props}
    />
  )
}

Ellipsis.displayName = 'SealBreadcrumb.Ellipsis'

// ---------------------------------------------------------------------------
// Dropdown
// ---------------------------------------------------------------------------

function Dropdown({ children }: Readonly<SealBreadcrumbDropdownProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" aria-label="Show more breadcrumb items">
          <Ellipsis />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className={cn(
          'w-auto min-w-[10rem] p-[var(--seal-dimension-xxs)]',
          'rounded-[var(--seal-radius-md)] border border-[var(--seal-border-default)]',
          'bg-[var(--seal-surface-surface)] shadow-md',
        )}
      >
        <div className="flex flex-col">{children}</div>
      </PopoverContent>
    </Popover>
  )
}

Dropdown.displayName = 'SealBreadcrumb.Dropdown'

// ---------------------------------------------------------------------------
// DropMenuItem
// ---------------------------------------------------------------------------

function DropMenuItem({ children, onClick, className }: Readonly<SealBreadcrumbDropMenuItemProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-[var(--seal-radius-xs)] px-[var(--seal-dimension-md)] py-[var(--seal-dimension-xs)]',
        'text-left text-sm text-[var(--seal-text-primary)]',
        'transition-colors hover:bg-[var(--seal-surface-surface-alt)]',
        className,
      )}
    >
      {children}
    </button>
  )
}

DropMenuItem.displayName = 'SealBreadcrumb.DropMenuItem'

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Token-styled breadcrumb navigation built on shadcn/ui's `Breadcrumb` primitives.
 *
 * Compose with sub-components to build any breadcrumb layout:
 *
 * ```tsx
 * <SealBreadcrumb>
 *   <SealBreadcrumb.Item>
 *     <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
 *   </SealBreadcrumb.Item>
 *   <SealBreadcrumb.Separator />
 *   <SealBreadcrumb.Item>
 *     <SealBreadcrumb.Link href="/components">Components</SealBreadcrumb.Link>
 *   </SealBreadcrumb.Item>
 *   <SealBreadcrumb.Separator />
 *   <SealBreadcrumb.Item>
 *     <SealBreadcrumb.Page>Breadcrumb</SealBreadcrumb.Page>
 *   </SealBreadcrumb.Item>
 * </SealBreadcrumb>
 * ```
 *
 * For deep hierarchies, use `SealBreadcrumb.Dropdown` with
 * `SealBreadcrumb.DropMenuItem` to collapse hidden levels:
 *
 * ```tsx
 * <SealBreadcrumb.Item>
 *   <SealBreadcrumb.Dropdown>
 *     <SealBreadcrumb.DropMenuItem onClick={() => navigate('/docs')}>
 *       Documentation
 *     </SealBreadcrumb.DropMenuItem>
 *   </SealBreadcrumb.Dropdown>
 * </SealBreadcrumb.Item>
 * ```
 *
 * Non-active links use `--seal-text-secondary`; the active page and hover
 * state use `--seal-text-primary`, matching the Flutter reference.
 */
export const SealBreadcrumb = Object.assign(SealBreadcrumbImpl, {
  Item,
  Link,
  Page,
  Separator,
  Ellipsis,
  Dropdown,
  DropMenuItem,
})
