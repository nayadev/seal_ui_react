import * as React from 'react'

import { cn } from '@/lib/utils'

/** A time-of-day value used by `SealTimePicker`. */
export interface SealTimeValue {
  /** Hour component (0–23 for 24h, 1–12 for period mode). */
  hour: number
  /** Minute component (0–59). */
  minute: number
  /** Second component (0–59). */
  second: number
}

/** AM/PM period used by `SealTimePicker.Period`. */
export type SealDayPeriod = 'am' | 'pm'

interface TimeFieldProps {
  label: string
  value: number
  min: number
  max: number
  disabled?: boolean
  onChange: (value: number) => void
}

interface PeriodToggleProps {
  value: SealDayPeriod
  disabled?: boolean
  onChange: (period: SealDayPeriod) => void
}

interface FieldDef {
  key: keyof SealTimeValue
  label: string
  min: number
  max: number
}

/** Shared props available on all `SealTimePicker` variants. */
export interface SealTimePickerSharedProps {
  /**
   * Controlled time value. When provided, the component becomes fully
   * controlled and you must update it via `onChanged`.
   */
  value?: SealTimeValue
  /**
   * Initial time shown when the component first renders (uncontrolled).
   * Ignored when `value` is provided.
   */
  defaultValue?: SealTimeValue
  /** Called whenever the user changes any field. */
  onChanged?: (time: SealTimeValue) => void
  /**
   * Whether the hours field is visible.
   * @default true
   */
  showHours?: boolean
  /**
   * Whether the minutes field is visible.
   * @default true
   */
  showMinutes?: boolean
  /**
   * Whether the seconds field is visible.
   * @default true
   */
  showSeconds?: boolean
  /** Disables all interaction when `true`. */
  disabled?: boolean
  /** Additional CSS class names for the container. */
  className?: string
}

/** Props for `SealTimePicker.Period` — 12-hour format with AM/PM toggle. */
export interface SealTimePickerPeriodProps extends SealTimePickerSharedProps {
  /**
   * Controlled AM/PM period. When provided, you must update it via
   * `onPeriodChange` to keep the component in sync.
   */
  period?: SealDayPeriod
  /**
   * Initial period shown when the component first renders (uncontrolled).
   * Ignored when `period` is provided.
   * @default 'am'
   */
  defaultPeriod?: SealDayPeriod
  /** Called when the user toggles AM/PM. */
  onPeriodChange?: (period: SealDayPeriod) => void
}

const DEFAULT_24H: SealTimeValue = { hour: 0, minute: 0, second: 0 }
const DEFAULT_12H: SealTimeValue = { hour: 12, minute: 0, second: 0 }

const FIELDS_24H: FieldDef[] = [
  { key: 'hour', label: 'hour', min: 0, max: 23 },
  { key: 'minute', label: 'min', min: 0, max: 59 },
  { key: 'second', label: 'sec', min: 0, max: 59 },
]

const FIELDS_12H: FieldDef[] = [
  { key: 'hour', label: 'hour', min: 1, max: 12 },
  { key: 'minute', label: 'min', min: 0, max: 59 },
  { key: 'second', label: 'sec', min: 0, max: 59 },
]

function useTimeState(
  valueProp: SealTimeValue | undefined,
  defaultValue: SealTimeValue,
  onChanged?: (time: SealTimeValue) => void,
) {
  const [internalTime, setInternalTime] = React.useState<SealTimeValue>(defaultValue)
  const isControlled = valueProp !== undefined
  const current = isControlled ? valueProp : internalTime

  function handleFieldChange(field: keyof SealTimeValue, v: number) {
    const next = { ...current, [field]: v }
    if (!isControlled) setInternalTime(next)
    onChanged?.(next)
  }

  return { current, handleFieldChange }
}

function buildVisibleFields(
  allFields: FieldDef[],
  showHours: boolean,
  showMinutes: boolean,
  showSeconds: boolean,
): FieldDef[] {
  const visibilityMap: Record<keyof SealTimeValue, boolean> = {
    hour: showHours,
    minute: showMinutes,
    second: showSeconds,
  }
  return allFields.filter((f) => visibilityMap[f.key])
}

const FIELD_CLASSES = cn(
  'w-[var(--seal-dimension-xxl)] h-[calc(var(--seal-dimension-md)*2+var(--seal-dimension-xs))]',
  'rounded-[var(--seal-radius-md)]',
  'border border-[var(--seal-border-default)]',
  'bg-[var(--seal-surface-surface)]',
  'text-center text-sm font-medium',
  'text-[var(--seal-text-primary)]',
  'transition-colors',
  'focus:outline-none focus:ring-1 focus:ring-[var(--seal-brand-primary)]',
  // Remove native number spinners — keyboard arrows are handled manually.
  '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
)

function TimeField({ label, value, min, max, disabled, onChange }: Readonly<TimeFieldProps>) {
  const displayValue = String(value).padStart(2, '0')

  function clamp(v: number): number {
    if (v > max) return min
    if (v < min) return max
    return v
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onChange(clamp(value + 1))
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onChange(clamp(value - 1))
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '')
    if (raw === '') return
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed)
    }
  }

  return (
    <div className="flex flex-col items-center gap-[var(--seal-dimension-xxs)]">
      <span className="select-none text-xs text-[var(--seal-text-secondary)]">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={displayValue}
        disabled={disabled}
        aria-label={label}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={FIELD_CLASSES}
      />
    </div>
  )
}

function ColonSeparator() {
  return (
    <span
      aria-hidden="true"
      className="mt-[1.1rem] select-none text-sm font-semibold text-[var(--seal-text-secondary)]"
    >
      :
    </span>
  )
}

function PeriodToggle({ value, disabled, onChange }: Readonly<PeriodToggleProps>) {
  return (
    <div
      className={cn(
        'ml-[var(--seal-dimension-xxs)] mt-[1.1rem]',
        'flex flex-col overflow-hidden',
        'rounded-[var(--seal-radius-md)]',
        'border border-[var(--seal-border-default)]',
      )}
    >
      {(['am', 'pm'] as const).map((p) => (
        <button
          key={p}
          type="button"
          disabled={disabled}
          aria-pressed={p === value}
          onClick={() => {
            onChange(p)
          }}
          className={cn(
            'px-[var(--seal-dimension-xs)] py-[var(--seal-dimension-xxs)]',
            'text-xs font-semibold uppercase',
            'transition-colors',
            'disabled:pointer-events-none',
            p === value
              ? 'bg-[var(--seal-brand-primary)] text-[var(--seal-text-on-primary)]'
              : 'text-[var(--seal-text-secondary)] hover:bg-[var(--seal-surface-surface-alt)]',
          )}
        >
          {p.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function SealTimePickerImpl({
  value,
  defaultValue,
  onChanged,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  disabled,
  className,
}: Readonly<SealTimePickerSharedProps>) {
  const { current, handleFieldChange } = useTimeState(value, defaultValue ?? DEFAULT_24H, onChanged)
  const visibleFields = buildVisibleFields(FIELDS_24H, showHours, showMinutes, showSeconds)

  return (
    <div
      data-slot="time-picker"
      data-disabled={disabled ?? undefined}
      className={cn(
        'inline-flex items-center gap-[var(--seal-dimension-xxs)]',
        disabled === true && 'pointer-events-none opacity-[var(--seal-state-disabled-opacity)]',
        className,
      )}
    >
      {visibleFields.map((field, index) => (
        <React.Fragment key={field.key}>
          {index > 0 && <ColonSeparator />}
          <TimeField
            label={field.label}
            value={current[field.key]}
            min={field.min}
            max={field.max}
            disabled={disabled === true}
            onChange={(v) => {
              handleFieldChange(field.key, v)
            }}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

function SealTimePickerPeriodImpl({
  value,
  defaultValue,
  onChanged,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  disabled,
  period: periodProp,
  defaultPeriod,
  onPeriodChange,
  className,
}: Readonly<SealTimePickerPeriodProps>) {
  const { current, handleFieldChange } = useTimeState(value, defaultValue ?? DEFAULT_12H, onChanged)
  const [internalPeriod, setInternalPeriod] = React.useState<SealDayPeriod>(defaultPeriod ?? 'am')

  const isPeriodControlled = periodProp !== undefined
  const activePeriod = isPeriodControlled ? periodProp : internalPeriod

  function handlePeriodChange(p: SealDayPeriod) {
    if (!isPeriodControlled) setInternalPeriod(p)
    onPeriodChange?.(p)
  }

  const visibleFields = buildVisibleFields(FIELDS_12H, showHours, showMinutes, showSeconds)

  return (
    <div
      data-slot="time-picker"
      data-disabled={disabled ?? undefined}
      className={cn(
        'inline-flex items-center gap-[var(--seal-dimension-xxs)]',
        disabled === true && 'pointer-events-none opacity-[var(--seal-state-disabled-opacity)]',
        className,
      )}
    >
      {visibleFields.map((field, index) => (
        <React.Fragment key={field.key}>
          {index > 0 && <ColonSeparator />}
          <TimeField
            label={field.label}
            value={current[field.key]}
            min={field.min}
            max={field.max}
            disabled={disabled === true}
            onChange={(v) => {
              handleFieldChange(field.key, v)
            }}
          />
        </React.Fragment>
      ))}
      <PeriodToggle
        value={activePeriod}
        disabled={disabled === true}
        onChange={handlePeriodChange}
      />
    </div>
  )
}

SealTimePickerPeriodImpl.displayName = 'SealTimePicker.Period'

/**
 * Token-driven time picker with 24-hour and 12-hour (AM/PM) variants.
 *
 * Use `SealTimePicker` for 24-hour format and `SealTimePicker.Period` for
 * 12-hour format with an AM/PM toggle.
 *
 * Each time field supports keyboard navigation (↑/↓ arrows wrap around) and
 * direct numeric input. Fields can be individually hidden via `showHours`,
 * `showMinutes`, and `showSeconds`.
 *
 * Both variants support controlled (`value` + `onChanged`) and uncontrolled
 * (`defaultValue`) usage.
 *
 * @example
 * // 24-hour controlled
 * const [time, setTime] = React.useState<SealTimeValue>({ hour: 14, minute: 30, second: 0 })
 * <SealTimePicker value={time} onChanged={setTime} />
 *
 * @example
 * // 12-hour with AM/PM, no seconds
 * <SealTimePicker.Period showSeconds={false} defaultPeriod="pm" />
 */
export const SealTimePicker = Object.assign(SealTimePickerImpl, {
  Period: SealTimePickerPeriodImpl,
})
