import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealTimePicker } from './SealTimePicker'
import type { SealTimeValue } from './SealTimePicker'

const RENDERS_WITHOUT_ERROR = 'renders without error'
const SPINBUTTON = 'spinbutton'
const TIME_PICKER_SLOT = '[data-slot="time-picker"]'
const FIELD_HOUR = 'hour'
const FIELD_MIN = 'min'
const FIELD_SEC = 'sec'
const BTN_AM = 'AM'
const BTN_PM = 'PM'
const ARIA_PRESSED = 'aria-pressed'

describe('SealTimePicker (24h)', () => {
  it(RENDERS_WITHOUT_ERROR, () => {
    renderWithTheme(<SealTimePicker />)
    expect(document.querySelector(TIME_PICKER_SLOT)).toBeInTheDocument()
  })

  it('renders hour, minute and second fields by default', () => {
    renderWithTheme(<SealTimePicker />)
    expect(screen.getByRole(SPINBUTTON, { name: FIELD_HOUR })).toBeInTheDocument()
    expect(screen.getByRole(SPINBUTTON, { name: FIELD_MIN })).toBeInTheDocument()
    expect(screen.getByRole(SPINBUTTON, { name: FIELD_SEC })).toBeInTheDocument()
  })

  it('renders with a default value', () => {
    const defaultValue: SealTimeValue = { hour: 14, minute: 30, second: 45 }
    renderWithTheme(<SealTimePicker defaultValue={defaultValue} />)
    const hourInput = screen.getByRole(SPINBUTTON, { name: FIELD_HOUR })
    expect(hourInput).toHaveValue(14)
  })

  it('renders with a controlled value', () => {
    const value: SealTimeValue = { hour: 9, minute: 15, second: 0 }
    renderWithTheme(<SealTimePicker value={value} />)
    expect(screen.getByRole(SPINBUTTON, { name: FIELD_HOUR })).toHaveValue(9)
    expect(screen.getByRole(SPINBUTTON, { name: FIELD_MIN })).toHaveValue(15)
  })

  it('calls onChanged when a field value changes', () => {
    const handleChange = vi.fn()
    renderWithTheme(<SealTimePicker onChanged={handleChange} />)
    const hourInput = screen.getByRole(SPINBUTTON, { name: FIELD_HOUR })
    fireEvent.change(hourInput, { target: { value: '10' } })
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ hour: 10 }))
  })

  it('increments hour with ArrowUp and wraps from 23 to 0', () => {
    const handleChange = vi.fn()
    const value: SealTimeValue = { hour: 23, minute: 0, second: 0 }
    renderWithTheme(<SealTimePicker value={value} onChanged={handleChange} />)
    const hourInput = screen.getByRole(SPINBUTTON, { name: FIELD_HOUR })
    fireEvent.keyDown(hourInput, { key: 'ArrowUp' })
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ hour: 0 }))
  })

  it('decrements minute with ArrowDown and wraps from 0 to 59', () => {
    const handleChange = vi.fn()
    const value: SealTimeValue = { hour: 0, minute: 0, second: 0 }
    renderWithTheme(<SealTimePicker value={value} onChanged={handleChange} />)
    const minInput = screen.getByRole(SPINBUTTON, { name: FIELD_MIN })
    fireEvent.keyDown(minInput, { key: 'ArrowDown' })
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ minute: 59 }))
  })

  it('hides seconds when showSeconds is false', () => {
    renderWithTheme(<SealTimePicker showSeconds={false} />)
    expect(screen.queryByRole(SPINBUTTON, { name: FIELD_SEC })).not.toBeInTheDocument()
  })

  it('hides hours when showHours is false', () => {
    renderWithTheme(<SealTimePicker showHours={false} />)
    expect(screen.queryByRole(SPINBUTTON, { name: FIELD_HOUR })).not.toBeInTheDocument()
  })

  it('hides minutes when showMinutes is false', () => {
    renderWithTheme(<SealTimePicker showMinutes={false} />)
    expect(screen.queryByRole(SPINBUTTON, { name: FIELD_MIN })).not.toBeInTheDocument()
  })

  it('renders in disabled state', () => {
    renderWithTheme(<SealTimePicker disabled />)
    const container = document.querySelector(TIME_PICKER_SLOT)
    expect(container).toHaveAttribute('data-disabled')
    const hourInput = screen.getByRole(SPINBUTTON, { name: FIELD_HOUR })
    expect(hourInput).toBeDisabled()
  })

  it('accepts additional className', () => {
    renderWithTheme(<SealTimePicker className="extra-class" />)
    const container = document.querySelector(TIME_PICKER_SLOT)
    expect(container?.className ?? '').toMatch(/extra-class/)
  })

  it('applies seal token class to fields', () => {
    renderWithTheme(<SealTimePicker />)
    const hourInput = screen.getByRole(SPINBUTTON, { name: FIELD_HOUR })
    expect(hourInput.className).toMatch(/seal-border-default/)
  })
})

describe('SealTimePicker.Period (12h)', () => {
  it(RENDERS_WITHOUT_ERROR, () => {
    renderWithTheme(<SealTimePicker.Period />)
    expect(document.querySelector(TIME_PICKER_SLOT)).toBeInTheDocument()
  })

  it('renders AM and PM toggle buttons', () => {
    renderWithTheme(<SealTimePicker.Period />)
    expect(screen.getByRole('button', { name: BTN_AM })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: BTN_PM })).toBeInTheDocument()
  })

  it('defaults to AM period', () => {
    renderWithTheme(<SealTimePicker.Period />)
    expect(screen.getByRole('button', { name: BTN_AM })).toHaveAttribute(ARIA_PRESSED, 'true')
    expect(screen.getByRole('button', { name: BTN_PM })).toHaveAttribute(ARIA_PRESSED, 'false')
  })

  it('renders with defaultPeriod pm', () => {
    renderWithTheme(<SealTimePicker.Period defaultPeriod="pm" />)
    expect(screen.getByRole('button', { name: BTN_PM })).toHaveAttribute(ARIA_PRESSED, 'true')
  })

  it('renders with controlled period', () => {
    renderWithTheme(<SealTimePicker.Period period="pm" />)
    expect(screen.getByRole('button', { name: BTN_PM })).toHaveAttribute(ARIA_PRESSED, 'true')
  })

  it('calls onPeriodChange when toggling period', () => {
    const handlePeriod = vi.fn()
    renderWithTheme(<SealTimePicker.Period onPeriodChange={handlePeriod} />)
    fireEvent.click(screen.getByRole('button', { name: BTN_PM }))
    expect(handlePeriod).toHaveBeenCalledWith('pm')
  })

  it('hour range is 1–12 in period mode', () => {
    const handleChange = vi.fn()
    const value: SealTimeValue = { hour: 12, minute: 0, second: 0 }
    renderWithTheme(<SealTimePicker.Period value={value} onChanged={handleChange} />)
    const hourInput = screen.getByRole(SPINBUTTON, { name: FIELD_HOUR })
    fireEvent.keyDown(hourInput, { key: 'ArrowUp' })
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ hour: 1 }))
  })

  it('calls onChanged when a field changes in period mode', () => {
    const handleChange = vi.fn()
    renderWithTheme(<SealTimePicker.Period onChanged={handleChange} />)
    const minInput = screen.getByRole(SPINBUTTON, { name: FIELD_MIN })
    fireEvent.change(minInput, { target: { value: '30' } })
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ minute: 30 }))
  })

  it('renders without seconds when showSeconds is false', () => {
    renderWithTheme(<SealTimePicker.Period showSeconds={false} />)
    expect(screen.queryByRole(SPINBUTTON, { name: FIELD_SEC })).not.toBeInTheDocument()
  })

  it('disables AM/PM buttons when disabled', () => {
    renderWithTheme(<SealTimePicker.Period disabled />)
    expect(screen.getByRole('button', { name: BTN_AM })).toBeDisabled()
    expect(screen.getByRole('button', { name: BTN_PM })).toBeDisabled()
  })

  it('has Period displayName', () => {
    expect(SealTimePicker.Period.displayName).toBe('SealTimePicker.Period')
  })
})
