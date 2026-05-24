import * as React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

/**
 * Props for `SealTable`. Accepts all props of the shadcn `Table` primitive,
 * including `className` and any native `<table>` attributes.
 */
export type SealTableProps = React.ComponentPropsWithoutRef<typeof Table>

function SealTableImpl({ className, ...props }: Readonly<SealTableProps>) {
  return <Table className={cn('text-[var(--seal-text-primary)]', className)} {...props} />
}

SealTableImpl.displayName = 'SealTable'

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

/**
 * Props for `SealTable.Header`. Wraps the `<thead>` element with a bottom
 * border using `--seal-border-default`.
 */
export type SealTableHeaderProps = React.ComponentPropsWithoutRef<typeof TableHeader>

function Header({ className, ...props }: Readonly<SealTableHeaderProps>) {
  return (
    <TableHeader
      className={cn('[&_tr]:border-b [&_tr]:border-[var(--seal-border-default)]', className)}
      {...props}
    />
  )
}
Header.displayName = 'SealTable.Header'

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

/**
 * Props for `SealTable.Body`. Wraps `<tbody>` and removes the trailing border
 * from the last row.
 */
export type SealTableBodyProps = React.ComponentPropsWithoutRef<typeof TableBody>

function Body({ className, ...props }: Readonly<SealTableBodyProps>) {
  return <TableBody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}
Body.displayName = 'SealTable.Body'

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

/**
 * Props for `SealTable.Footer`. Renders a `<tfoot>` with muted surface
 * background and medium-weight text.
 */
export type SealTableFooterProps = React.ComponentPropsWithoutRef<typeof TableFooter>

function Footer({ className, ...props }: Readonly<SealTableFooterProps>) {
  return (
    <TableFooter
      className={cn(
        'border-t border-[var(--seal-border-default)] bg-[var(--seal-surface-surface-alt)]',
        'font-medium text-[var(--seal-text-secondary)]',
        '[&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  )
}
Footer.displayName = 'SealTable.Footer'

// ---------------------------------------------------------------------------
// Row
// ---------------------------------------------------------------------------

/**
 * Props for `SealTable.Row`. Adds a bottom border and a hover background
 * using `--seal-surface-surface-alt`.
 */
export type SealTableRowProps = React.ComponentPropsWithoutRef<typeof TableRow>

function Row({ className, ...props }: Readonly<SealTableRowProps>) {
  return (
    <TableRow
      className={cn(
        'border-b border-[var(--seal-border-default)] transition-colors',
        'hover:bg-[var(--seal-surface-surface-alt)]',
        'data-[state=selected]:bg-[var(--seal-surface-surface-alt)]',
        className,
      )}
      {...props}
    />
  )
}
Row.displayName = 'SealTable.Row'

// ---------------------------------------------------------------------------
// Head
// ---------------------------------------------------------------------------

/**
 * Props for `SealTable.Head`. Renders a `<th>` cell with secondary muted
 * text and medium font weight — matches the Flutter `SealTableCell.header` style.
 */
export type SealTableHeadProps = React.ComponentPropsWithoutRef<typeof TableHead>

function Head({ className, ...props }: Readonly<SealTableHeadProps>) {
  return (
    <TableHead
      className={cn(
        'h-[var(--seal-dimension-xxl)] px-[var(--seal-dimension-md)]',
        'text-left align-middle text-sm font-medium',
        'text-[var(--seal-text-secondary)]',
        '[&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  )
}
Head.displayName = 'SealTable.Head'

// ---------------------------------------------------------------------------
// Cell
// ---------------------------------------------------------------------------

/**
 * Props for `SealTable.Cell`. Renders a `<td>` with standard body-text color
 * and consistent padding.
 */
export type SealTableCellProps = React.ComponentPropsWithoutRef<typeof TableCell>

function Cell({ className, ...props }: Readonly<SealTableCellProps>) {
  return (
    <TableCell
      className={cn(
        'px-[var(--seal-dimension-md)] py-[var(--seal-dimension-sm)]',
        'align-middle text-sm text-[var(--seal-text-primary)]',
        '[&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  )
}
Cell.displayName = 'SealTable.Cell'

// ---------------------------------------------------------------------------
// Caption
// ---------------------------------------------------------------------------

/**
 * Props for `SealTable.Caption`. Renders a `<caption>` below the table with
 * muted secondary text.
 */
export type SealTableCaptionProps = React.ComponentPropsWithoutRef<typeof TableCaption>

function Caption({ className, ...props }: Readonly<SealTableCaptionProps>) {
  return (
    <TableCaption
      className={cn(
        'mt-[var(--seal-dimension-md)] text-sm text-[var(--seal-text-secondary)]',
        className,
      )}
      {...props}
    />
  )
}
Caption.displayName = 'SealTable.Caption'

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Token-driven data table wrapping the shadcn `Table` primitive.
 *
 * Compose `SealTable` with its sub-components to build semantic, accessible
 * tables. All borders, colors, and spacing come from Seal design tokens.
 *
 * ```tsx
 * <SealTable>
 *   <SealTable.Caption>Team members</SealTable.Caption>
 *   <SealTable.Header>
 *     <SealTable.Row>
 *       <SealTable.Head>Name</SealTable.Head>
 *       <SealTable.Head>Role</SealTable.Head>
 *       <SealTable.Head>Status</SealTable.Head>
 *     </SealTable.Row>
 *   </SealTable.Header>
 *   <SealTable.Body>
 *     <SealTable.Row>
 *       <SealTable.Cell>Alice</SealTable.Cell>
 *       <SealTable.Cell>Admin</SealTable.Cell>
 *       <SealTable.Cell>Active</SealTable.Cell>
 *     </SealTable.Row>
 *   </SealTable.Body>
 *   <SealTable.Footer>
 *     <SealTable.Row>
 *       <SealTable.Cell colSpan={2}>Total</SealTable.Cell>
 *       <SealTable.Cell>1 active</SealTable.Cell>
 *     </SealTable.Row>
 *   </SealTable.Footer>
 * </SealTable>
 * ```
 */
export const SealTable = Object.assign(SealTableImpl, {
  Header,
  Body,
  Footer,
  Row,
  Head,
  Cell,
  Caption,
})
