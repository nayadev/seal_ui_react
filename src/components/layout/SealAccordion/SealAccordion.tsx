import * as React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

/** Data model for a single collapsible section within a `SealAccordion`. */
export interface SealAccordionItemData {
  /** Unique identifier for this item within the accordion. */
  value: string
  /** Content rendered in the always-visible header row. */
  title: React.ReactNode
  /** Content revealed when the item is expanded. */
  content: React.ReactNode
  /** When `true`, the item cannot be expanded or collapsed. */
  disabled?: boolean
}

/**
 * Props accepted by `SealAccordion` (single-open mode).
 */
export interface SealAccordionProps {
  /** The accordion item definitions. */
  items: SealAccordionItemData[]
  /**
   * Value of the item expanded by default (uncontrolled).
   * Only one item can be open at a time in single mode.
   */
  defaultValue?: string
  /** Controlled open value. Requires `onValueChange`. */
  value?: string
  /** Called when the expanded item changes. */
  onValueChange?: (value: string) => void
  /**
   * Whether the expanded item can be collapsed by clicking its trigger again.
   * Defaults to `true`.
   */
  collapsible?: boolean
  /** Additional CSS classes applied to the accordion root. */
  className?: string
}

/**
 * Props accepted by `SealAccordion.Multiple`.
 */
export interface SealAccordionMultipleProps {
  /** The accordion item definitions. */
  items: SealAccordionItemData[]
  /**
   * Values of items expanded by default (uncontrolled).
   * Any number of items can be open simultaneously.
   */
  defaultValue?: string[]
  /** Controlled open values. Requires `onValueChange`. */
  value?: string[]
  /** Called when the set of expanded items changes. */
  onValueChange?: (value: string[]) => void
  /** Additional CSS classes applied to the accordion root. */
  className?: string
}

function buildItems(items: SealAccordionItemData[]) {
  return items.map((item) => (
    <AccordionItem
      key={item.value}
      value={item.value}
      {...(item.disabled === undefined ? {} : { disabled: item.disabled })}
      className="border-b border-[var(--seal-border-default)] last:border-b-0"
    >
      <AccordionTrigger
        className={cn(
          'flex flex-1 items-center justify-between gap-[var(--seal-dimension-sm)]',
          'py-[var(--seal-dimension-md)] text-left',
          'font-style-small font-medium text-[var(--seal-text-primary)]',
          'hover:no-underline',
          '[&[data-state=open]>svg]:rotate-180',
          '[&>svg]:text-[var(--seal-text-secondary)] [&>svg]:shrink-0',
          'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
          'transition-none',
        )}
      >
        {item.title}
      </AccordionTrigger>
      <AccordionContent
        className={cn(
          'text-[var(--seal-text-secondary)] font-style-small',
          'pb-[var(--seal-dimension-md)] pt-0',
        )}
      >
        {item.content}
      </AccordionContent>
    </AccordionItem>
  ))
}

function SealAccordionImpl({
  items,
  defaultValue,
  value,
  onValueChange,
  collapsible = true,
  className,
}: Readonly<SealAccordionProps>) {
  return (
    <Accordion
      type="single"
      collapsible={collapsible}
      {...(defaultValue === undefined ? {} : { defaultValue })}
      {...(value === undefined ? {} : { value })}
      {...(onValueChange === undefined ? {} : { onValueChange })}
      className={cn('w-full', className)}
    >
      {buildItems(items)}
    </Accordion>
  )
}

SealAccordionImpl.displayName = 'SealAccordion'

/**
 * Multi-open accordion — any number of items can be expanded simultaneously.
 *
 * @example
 * <SealAccordion.Multiple
 *   defaultValue={['q1', 'q3']}
 *   items={[
 *     { value: 'q1', title: 'Typography', content: 'Uses Inter via Google Fonts.' },
 *     { value: 'q2', title: 'Colors', content: 'Each theme defines its own palette.' },
 *     { value: 'q3', title: 'Spacing', content: 'Named dimension tokens from xs to xxxl.' },
 *   ]}
 * />
 */
function Multiple({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
}: Readonly<SealAccordionMultipleProps>) {
  return (
    <Accordion
      type="multiple"
      {...(defaultValue === undefined ? {} : { defaultValue })}
      {...(value === undefined ? {} : { value })}
      {...(onValueChange === undefined ? {} : { onValueChange })}
      className={cn('w-full', className)}
    >
      {buildItems(items)}
    </Accordion>
  )
}

Multiple.displayName = 'SealAccordion.Multiple'

/**
 * Collapsible sections for organizing content under expandable headers.
 *
 * By default only one item can be open at a time (`type="single"`). Use
 * `SealAccordion.Multiple` to allow several items open simultaneously.
 *
 * Supports both controlled and uncontrolled modes via `value`/`defaultValue`.
 *
 * @example
 * <SealAccordion
 *   items={[
 *     { value: 'q1', title: 'What is Seal UI?', content: 'A token-driven design system.' },
 *     { value: 'q2', title: 'How do I install it?', content: 'Add the package to your project.' },
 *   ]}
 * />
 *
 * @example
 * <SealAccordion defaultValue="q1" items={faqs} />
 */
export const SealAccordion = Object.assign(SealAccordionImpl, { Multiple })
