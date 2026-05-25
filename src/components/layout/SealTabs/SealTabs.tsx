import * as React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

/**
 * Props accepted by `SealTabs`. Forwards all Radix Tabs root props including
 * `defaultValue`, `value`, `onValueChange`, and `orientation`.
 */
export type SealTabsProps = React.ComponentPropsWithoutRef<typeof Tabs>

function SealTabsImpl({ className, ...props }: Readonly<SealTabsProps>) {
  return <Tabs className={cn('w-full', className)} {...props} />
}

SealTabsImpl.displayName = 'SealTabs'

// ---------------------------------------------------------------------------
// List
// ---------------------------------------------------------------------------

/**
 * Props for `SealTabs.List`. Accepts all props of the shadcn `TabsList` primitive.
 */
export type SealTabsListProps = React.ComponentPropsWithoutRef<typeof TabsList>

function List({ className, ...props }: Readonly<SealTabsListProps>) {
  return (
    <TabsList
      className={cn(
        'inline-flex items-center justify-start',
        'rounded-md',
        'bg-[var(--seal-surface-surface-alt)]',
        'p-dimension-xxs',
        'gap-dimension-xxs',
        className,
      )}
      {...props}
    />
  )
}

List.displayName = 'SealTabs.List'

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

/**
 * Props for `SealTabs.Trigger`. Accepts all props of the shadcn `TabsTrigger`
 * primitive including `value` and `disabled`.
 */
export type SealTabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsTrigger>

function Trigger({ className, ...props }: Readonly<SealTabsTriggerProps>) {
  return (
    <TabsTrigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap',
        'rounded-sm',
        'px-dimension-md py-dimension-xs',
        'text-style-small font-style-small',
        'text-[var(--seal-text-secondary)]',
        'transition-all',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--seal-brand-primary)]',
        'focus-visible:ring-offset-1',
        'focus-visible:ring-offset-[var(--seal-surface-surface-alt)]',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-[var(--seal-surface-surface)]',
        'data-[state=active]:text-[var(--seal-text-primary)]',
        'data-[state=active]:shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

Trigger.displayName = 'SealTabs.Trigger'

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

/**
 * Props for `SealTabs.Content`. Accepts all props of the shadcn `TabsContent`
 * primitive including `value`, `forceMount`, and `asChild`.
 */
export type SealTabsContentProps = React.ComponentPropsWithoutRef<typeof TabsContent>

function Content({ className, ...props }: Readonly<SealTabsContentProps>) {
  return (
    <TabsContent
      className={cn(
        'mt-dimension-md',
        'text-[var(--seal-text-primary)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--seal-brand-primary)]',
        'focus-visible:ring-offset-1',
        'focus-visible:ring-offset-[var(--seal-surface-background)]',
        className,
      )}
      {...props}
    />
  )
}

Content.displayName = 'SealTabs.Content'

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

/**
 * Token-driven tabs component wrapping the shadcn `Tabs` primitive.
 *
 * Uses the compound component pattern — compose with `SealTabs.List`,
 * `SealTabs.Trigger`, and `SealTabs.Content` for a declarative API:
 *
 * ```tsx
 * <SealTabs defaultValue="account">
 *   <SealTabs.List>
 *     <SealTabs.Trigger value="account">Account</SealTabs.Trigger>
 *     <SealTabs.Trigger value="security">Security</SealTabs.Trigger>
 *   </SealTabs.List>
 *   <SealTabs.Content value="account">Account settings…</SealTabs.Content>
 *   <SealTabs.Content value="security">Security settings…</SealTabs.Content>
 * </SealTabs>
 * ```
 *
 * For controlled usage, provide both `value` and `onValueChange`.
 */
export const SealTabs = Object.assign(SealTabsImpl, {
  List,
  Trigger,
  Content,
})
