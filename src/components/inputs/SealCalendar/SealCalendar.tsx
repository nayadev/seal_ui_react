import * as React from 'react'
import type { DateRange, DayButton, Matcher } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

export type { DateRange } from 'react-day-picker'

/**
 * Custom day button that applies Seal design tokens for all selection states.
 *
 * Replaces the shadcn CalendarDayButton to remove its dependency on
 * `bg-primary` Tailwind utilities (which are not mapped in the Seal token
 * system) and instead use `--seal-brand-primary` CSS variables directly.
 */
function SealCalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const isSelectedSingle =
    modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle

  const isRangeEndpoint = modifiers.range_start === true || modifiers.range_end === true

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelectedSingle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'flex aspect-square h-auto w-full min-w-[var(--cell-size)] items-center justify-center',
        'rounded-[var(--seal-radius-sm)] text-sm font-normal',
        'text-[var(--seal-text-primary)]',
        'cursor-pointer transition-colors',
        'hover:bg-[var(--seal-surface-surface-alt)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--seal-brand-primary)] focus-visible:ring-offset-0',
        'disabled:pointer-events-none disabled:opacity-[var(--seal-state-disabled-opacity)]',
        isSelectedSingle &&
          'bg-[var(--seal-brand-primary)] text-[var(--seal-text-on-primary)] hover:opacity-[0.85] hover:bg-[var(--seal-brand-primary)]',
        isRangeEndpoint &&
          'bg-[var(--seal-brand-primary)] text-[var(--seal-text-on-primary)] hover:opacity-[0.85] hover:bg-[var(--seal-brand-primary)]',
        modifiers.range_middle === true &&
          'text-[var(--seal-text-primary)] hover:bg-[var(--seal-surface-surface-alt)]',
        modifiers.today === true &&
          !modifiers.selected &&
          'bg-[var(--seal-surface-surface-alt)] font-semibold',
        modifiers.outside === true && 'opacity-30',
        className,
      )}
      {...props}
    />
  )
}

/** Shared styling props available on all SealCalendar variants. */
export interface SealCalendarSharedProps {
  /** Additional CSS class names for the calendar container. */
  className?: string | undefined
  /**
   * Whether days outside the current month are visible.
   * @default true
   */
  showOutsideDays?: boolean | undefined
  /**
   * Caption layout for the month header.
   * - `label` — static month/year label (default)
   * - `dropdown` — dropdowns for both month and year
   */
  captionLayout?: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years' | undefined
  /** Initial month shown when the calendar first renders. */
  defaultMonth?: Date | undefined
  /** Earliest month the user can navigate to. */
  fromMonth?: Date | undefined
  /** Latest month the user can navigate to. */
  toMonth?: Date | undefined
  /**
   * Number of months displayed side by side.
   * @default 1
   */
  numberOfMonths?: number | undefined
  /**
   * Days that cannot be selected. Accepts a date, array of dates, a
   * predicate, or any `Matcher` accepted by `react-day-picker`.
   */
  disabled?: Matcher | Matcher[] | undefined
}

/** Props for `SealCalendar.Single` — single-date selection mode. */
export interface SealCalendarSingleProps extends SealCalendarSharedProps {
  /** The currently selected date. Pass `undefined` to deselect. */
  selected?: Date | undefined
  /** Called when the user selects or deselects a date. */
  onSelect?: ((date: Date | undefined) => void) | undefined
}

/** Props for `SealCalendar.Multiple` — multiple independent date selection. */
export interface SealCalendarMultipleProps extends SealCalendarSharedProps {
  /** The currently selected dates. */
  selected?: Date[] | undefined
  /** Called when the selection changes. */
  onSelect?: ((dates: Date[] | undefined) => void) | undefined
  /** Minimum number of days that must be selected. */
  min?: number | undefined
  /** Maximum number of days that can be selected. */
  max?: number | undefined
}

/** Props for `SealCalendar.Range` — continuous date range selection. */
export interface SealCalendarRangeProps extends SealCalendarSharedProps {
  /** The currently selected date range. */
  selected?: DateRange | undefined
  /** Called when the range changes. */
  onSelect?: ((range: DateRange | undefined) => void) | undefined
  /** Minimum number of days that must span the range. */
  min?: number | undefined
  /** Maximum number of days that can span the range. */
  max?: number | undefined
}

const NAV_BUTTON_CLASSES = cn(
  'inline-flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center',
  'rounded-[var(--seal-radius-sm)] select-none p-0',
  'border border-[var(--seal-border-default)]',
  'text-[var(--seal-brand-primary)]',
  'opacity-50 hover:opacity-100 transition-opacity',
  'hover:bg-[var(--seal-surface-surface-alt)]',
  'aria-disabled:opacity-50',
)

const SEAL_CALENDAR_CLASSNAMES = {
  months: 'relative flex flex-col gap-4 md:flex-row',
  month: 'flex w-full flex-col gap-4',
  month_caption: cn(
    'flex h-[var(--cell-size)] w-full items-center justify-center px-[var(--cell-size)]',
    'text-[var(--seal-text-primary)] font-semibold',
  ),
  caption_label: 'select-none text-sm font-medium',
  nav: 'absolute inset-x-0 top-0 flex h-[var(--cell-size)] w-full items-center justify-between gap-1',
  button_previous: NAV_BUTTON_CLASSES,
  button_next: NAV_BUTTON_CLASSES,
  weekdays: 'flex',
  weekday: cn(
    'text-[var(--seal-text-secondary)]',
    'flex-1 min-w-[var(--cell-size)] select-none rounded-md text-xs font-normal',
  ),
  week: 'mt-2 flex w-full',
  day: cn(
    'group/day relative aspect-square h-full w-full min-w-[var(--cell-size)] select-none p-0 text-center',
    '[&:first-child[data-selected=true]_button]:rounded-l-[var(--seal-radius-sm)]',
    '[&:last-child[data-selected=true]_button]:rounded-r-[var(--seal-radius-sm)]',
  ),
  range_start:
    'bg-[color-mix(in_srgb,var(--seal-brand-primary)_15%,transparent)] rounded-l-[var(--seal-radius-sm)]',
  range_middle: 'bg-[color-mix(in_srgb,var(--seal-brand-primary)_15%,transparent)] rounded-none',
  range_end:
    'bg-[color-mix(in_srgb,var(--seal-brand-primary)_15%,transparent)] rounded-r-[var(--seal-radius-sm)]',
  outside: 'text-[var(--seal-text-secondary)]',
  disabled: 'opacity-[var(--seal-state-disabled-opacity)]',
  hidden: 'invisible',
} as const

function buildCalendarClassName(className?: string) {
  return cn(
    'border border-[var(--seal-border-default)]',
    'rounded-[var(--seal-radius-md)]',
    'bg-[var(--seal-surface-surface)]',
    'p-[var(--seal-dimension-sm)]',
    '[--cell-size:2.25rem]',
    className,
  )
}

function SealCalendarSingleImpl({
  className,
  showOutsideDays = true,
  selected,
  onSelect,
  captionLayout,
  defaultMonth,
  fromMonth,
  toMonth,
  numberOfMonths,
  disabled,
}: Readonly<SealCalendarSingleProps>) {
  return (
    <Calendar
      mode="single"
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      className={buildCalendarClassName(className)}
      classNames={SEAL_CALENDAR_CLASSNAMES}
      components={{ DayButton: SealCalendarDayButton }}
      {...(selected !== undefined && { selected })}
      {...(onSelect !== undefined && {
        onSelect: (date: Date | undefined) => {
          onSelect(date)
        },
      })}
      {...(captionLayout !== undefined && { captionLayout })}
      {...(defaultMonth !== undefined && { defaultMonth })}
      {...(fromMonth !== undefined && { fromMonth })}
      {...(toMonth !== undefined && { toMonth })}
      {...(numberOfMonths !== undefined && { numberOfMonths })}
      {...(disabled !== undefined && { disabled })}
    />
  )
}

function SealCalendarMultipleImpl({
  className,
  showOutsideDays = true,
  selected,
  onSelect,
  captionLayout,
  defaultMonth,
  fromMonth,
  toMonth,
  numberOfMonths,
  disabled,
  min,
  max,
}: Readonly<SealCalendarMultipleProps>) {
  return (
    <Calendar
      mode="multiple"
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      className={buildCalendarClassName(className)}
      classNames={SEAL_CALENDAR_CLASSNAMES}
      components={{ DayButton: SealCalendarDayButton }}
      {...(selected !== undefined && { selected })}
      {...(onSelect !== undefined && {
        onSelect: (dates: Date[] | undefined) => {
          onSelect(dates)
        },
      })}
      {...(captionLayout !== undefined && { captionLayout })}
      {...(defaultMonth !== undefined && { defaultMonth })}
      {...(fromMonth !== undefined && { fromMonth })}
      {...(toMonth !== undefined && { toMonth })}
      {...(numberOfMonths !== undefined && { numberOfMonths })}
      {...(disabled !== undefined && { disabled })}
      {...(min !== undefined && { min })}
      {...(max !== undefined && { max })}
    />
  )
}

function SealCalendarRangeImpl({
  className,
  showOutsideDays = true,
  selected,
  onSelect,
  captionLayout,
  defaultMonth,
  fromMonth,
  toMonth,
  numberOfMonths,
  disabled,
  min,
  max,
}: Readonly<SealCalendarRangeProps>) {
  return (
    <Calendar
      mode="range"
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      className={buildCalendarClassName(className)}
      classNames={SEAL_CALENDAR_CLASSNAMES}
      components={{ DayButton: SealCalendarDayButton }}
      {...(selected !== undefined && { selected })}
      {...(onSelect !== undefined && {
        onSelect: (range: DateRange | undefined) => {
          onSelect(range)
        },
      })}
      {...(captionLayout !== undefined && { captionLayout })}
      {...(defaultMonth !== undefined && { defaultMonth })}
      {...(fromMonth !== undefined && { fromMonth })}
      {...(toMonth !== undefined && { toMonth })}
      {...(numberOfMonths !== undefined && { numberOfMonths })}
      {...(disabled !== undefined && { disabled })}
      {...(min !== undefined && { min })}
      {...(max !== undefined && { max })}
    />
  )
}

const Single = (props: SealCalendarSingleProps) => <SealCalendarSingleImpl {...props} />
Single.displayName = 'SealCalendar.Single'

const Multiple = (props: SealCalendarMultipleProps) => <SealCalendarMultipleImpl {...props} />
Multiple.displayName = 'SealCalendar.Multiple'

const Range = (props: SealCalendarRangeProps) => <SealCalendarRangeImpl {...props} />
Range.displayName = 'SealCalendar.Range'

/**
 * Token-driven calendar picker supporting single, multiple, and range
 * date selection modes.
 *
 * Built on the shadcn `Calendar` primitive (react-day-picker). Use the
 * sub-components for a clear, type-safe API:
 *
 * - `SealCalendar.Single` — pick one date
 * - `SealCalendar.Multiple` — pick several independent dates
 * - `SealCalendar.Range` — pick a continuous date range
 *
 * All variants apply Seal brand tokens for selected states and borders.
 * Navigation chevrons and the month caption inherit `--seal-text-primary`.
 *
 * @example
 * // Single date
 * <SealCalendar.Single
 *   selected={date}
 *   onSelect={(d) => { setDate(d) }}
 * />
 *
 * // Range
 * <SealCalendar.Range
 *   selected={range}
 *   onSelect={(r) => { setRange(r) }}
 * />
 */
export const SealCalendar = Object.assign(SealCalendarSingleImpl, {
  Single,
  Multiple,
  Range,
})
