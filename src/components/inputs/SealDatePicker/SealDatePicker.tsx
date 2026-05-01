import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import type { DateRange, Matcher } from 'react-day-picker'

import { SealCalendar } from '../SealCalendar/SealCalendar'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type { DateRange } from 'react-day-picker'

function formatDateDefault(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function formatRangeDefault(range: DateRange): string {
  const from = range.from ? formatDateDefault(range.from) : '...'
  const to = range.to ? formatDateDefault(range.to) : '...'
  if (!range.from) return '...'
  return `${from} – ${to}`
}

const TRIGGER_CLASSES = cn(
  'flex w-full items-center gap-[var(--seal-dimension-sm)]',
  'h-[calc(var(--seal-dimension-md)*2+var(--seal-dimension-xs))]',
  'rounded-[var(--seal-radius-sm)]',
  'border border-[var(--seal-border-default)]',
  'bg-[var(--seal-surface-surface-alt)]',
  'px-[var(--seal-dimension-sm)]',
  'text-[length:var(--seal-constant-small-font-size)] text-left',
  'cursor-pointer transition-colors',
  'hover:border-[var(--seal-brand-primary)]',
  'focus-visible:outline-none focus-visible:ring-1',
  'focus-visible:ring-[var(--seal-brand-primary)] focus-visible:ring-offset-0',
  'disabled:pointer-events-none disabled:opacity-[var(--seal-state-disabled-opacity)]',
)

/** Shared props for all SealDatePicker variants. */
export interface SealDatePickerSharedProps {
  /** Additional CSS class names for the trigger button. */
  className?: string
  /**
   * Text shown in the trigger when no date is selected.
   * @default 'Pick a date' for Single, 'Pick a date range' for Range
   */
  placeholder?: string
  /**
   * Closes the popover as soon as a valid selection is complete.
   * - Single: closes after any date is chosen. Defaults to `true`.
   * - Range: closes when both start and end dates are set. Defaults to `false`.
   */
  closeOnSelection?: boolean
  /** Month displayed when the calendar first opens. */
  defaultMonth?: Date
  /**
   * Number of months displayed side by side in the calendar.
   * @default 1
   */
  numberOfMonths?: number
  /** Earliest month the user can navigate to. */
  fromMonth?: Date
  /** Latest month the user can navigate to. */
  toMonth?: Date
  /**
   * Days that cannot be selected. Accepts any `Matcher` from `react-day-picker`:
   * a `Date`, an array of `Date`s, a `DateRange`, or a predicate function.
   */
  disabledDays?: Matcher | Matcher[]
  /** Disables the trigger button and prevents the calendar from opening. */
  disabled?: boolean
}

/** Props for `SealDatePicker.Single` — single-date selection mode. */
export interface SealDatePickerSingleProps extends SealDatePickerSharedProps {
  /** The currently selected date. Pass `undefined` to deselect. */
  selected?: Date | undefined
  /** Called when the user picks or deselects a date. */
  onSelect?: (date: Date | undefined) => void
  /**
   * Custom formatter for the trigger label.
   * @default Intl.DateTimeFormat 'MMM D, YYYY' (en-US)
   */
  formatDate?: (date: Date) => string
  /**
   * When `false`, clicking an already-selected day does not deselect it.
   * @default true (deselection allowed)
   */
  allowDeselection?: boolean
}

/** Props for `SealDatePicker.Range` — continuous date-range selection mode. */
export interface SealDatePickerRangeProps extends SealDatePickerSharedProps {
  /** The currently selected date range (`{ from, to }`). */
  selected?: DateRange | undefined
  /** Called when the range changes. */
  onSelect?: (range: DateRange | undefined) => void
  /**
   * Custom formatter for the trigger label when a range (or partial range) is selected.
   * @default 'MMM D, YYYY – MMM D, YYYY' (or '...' for the missing end)
   */
  formatDateRange?: (range: DateRange) => string
}

function SealDatePickerSingleImpl({
  className,
  selected,
  onSelect,
  formatDate = formatDateDefault,
  placeholder = 'Pick a date',
  closeOnSelection = true,
  allowDeselection,
  defaultMonth,
  numberOfMonths,
  fromMonth,
  toMonth,
  disabledDays,
  disabled,
}: Readonly<SealDatePickerSingleProps>) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = React.useCallback(
    (date: Date | undefined) => {
      if (date === undefined && allowDeselection === false) return
      onSelect?.(date)
      if (closeOnSelection && date !== undefined) setOpen(false)
    },
    [onSelect, closeOnSelection, allowDeselection],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="date-picker-trigger"
          disabled={disabled}
          className={cn(
            TRIGGER_CLASSES,
            selected === undefined && 'text-[var(--seal-text-secondary)]',
            selected !== undefined && 'text-[var(--seal-text-primary)]',
            className,
          )}
        >
          <CalendarIcon
            size={16}
            className="shrink-0 text-[var(--seal-text-secondary)]"
            aria-hidden
          />
          <span className="flex-1 truncate">
            {selected === undefined ? placeholder : formatDate(selected)}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto rounded-none border-0 bg-transparent p-0 shadow-none"
      >
        <SealCalendar.Single
          selected={selected}
          onSelect={handleSelect}
          {...(defaultMonth !== undefined && { defaultMonth })}
          {...(numberOfMonths !== undefined && { numberOfMonths })}
          {...(fromMonth !== undefined && { fromMonth })}
          {...(toMonth !== undefined && { toMonth })}
          {...(disabledDays !== undefined && { disabled: disabledDays })}
        />
      </PopoverContent>
    </Popover>
  )
}

function SealDatePickerRangeImpl({
  className,
  selected,
  onSelect,
  formatDateRange = formatRangeDefault,
  placeholder = 'Pick a date range',
  closeOnSelection = false,
  defaultMonth,
  numberOfMonths,
  fromMonth,
  toMonth,
  disabledDays,
  disabled,
}: Readonly<SealDatePickerRangeProps>) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = React.useCallback(
    (range: DateRange | undefined) => {
      onSelect?.(range)
      if (closeOnSelection && range?.from !== undefined && range.to !== undefined) {
        setOpen(false)
      }
    },
    [onSelect, closeOnSelection],
  )

  const displayText = selected?.from === undefined ? placeholder : formatDateRange(selected)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="date-picker-trigger"
          disabled={disabled}
          className={cn(
            TRIGGER_CLASSES,
            selected?.from === undefined && 'text-[var(--seal-text-secondary)]',
            selected?.from !== undefined && 'text-[var(--seal-text-primary)]',
            className,
          )}
        >
          <CalendarIcon
            size={16}
            className="shrink-0 text-[var(--seal-text-secondary)]"
            aria-hidden
          />
          <span className="flex-1 truncate">{displayText}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto rounded-none border-0 bg-transparent p-0 shadow-none"
      >
        <SealCalendar.Range
          selected={selected}
          onSelect={handleSelect}
          {...(defaultMonth !== undefined && { defaultMonth })}
          {...(numberOfMonths !== undefined && { numberOfMonths })}
          {...(fromMonth !== undefined && { fromMonth })}
          {...(toMonth !== undefined && { toMonth })}
          {...(disabledDays !== undefined && { disabled: disabledDays })}
        />
      </PopoverContent>
    </Popover>
  )
}

const Single = (props: SealDatePickerSingleProps) => <SealDatePickerSingleImpl {...props} />
Single.displayName = 'SealDatePicker.Single'

const Range = (props: SealDatePickerRangeProps) => <SealDatePickerRangeImpl {...props} />
Range.displayName = 'SealDatePicker.Range'

/**
 * Token-driven date picker supporting single and range date selection.
 *
 * Renders a trigger button that opens a popover calendar built on
 * `SealCalendar`. Use sub-components for a clear, type-safe API:
 *
 * - `SealDatePicker.Single` — pick one date (also the default when used directly)
 * - `SealDatePicker.Range` — pick a continuous date range
 *
 * All styling follows Seal brand tokens: the trigger inherits input-field
 * appearance and the calendar inside the popover uses `SealCalendar` tokens.
 *
 * @example
 * // Single date
 * <SealDatePicker.Single
 *   selected={date}
 *   onSelect={(d) => { setDate(d) }}
 * />
 *
 * // Range
 * <SealDatePicker.Range
 *   selected={range}
 *   onSelect={(r) => { setRange(r) }}
 * />
 */
export const SealDatePicker = Object.assign(SealDatePickerSingleImpl, {
  Single,
  Range,
})
