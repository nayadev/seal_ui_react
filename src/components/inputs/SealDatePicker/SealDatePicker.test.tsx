import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealDatePicker } from './SealDatePicker'
import type { DateRange } from './SealDatePicker'

// Radix Popover dispatches PointerEvents which jsdom does not implement natively.
class PointerEventStub extends Event {}
Object.defineProperty(globalThis, 'PointerEvent', {
  value: PointerEventStub,
  writable: true,
  configurable: true,
})

const RENDERS_WITHOUT_ERROR = 'renders without error'

describe('SealDatePicker', () => {
  describe('SealDatePicker (default / Single)', () => {
    it(RENDERS_WITHOUT_ERROR, () => {
      renderWithTheme(<SealDatePicker />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('shows default placeholder when no date is selected', () => {
      renderWithTheme(<SealDatePicker />)
      expect(screen.getByText('Pick a date')).toBeInTheDocument()
    })

    it('shows custom placeholder when provided', () => {
      renderWithTheme(<SealDatePicker placeholder="Select a day" />)
      expect(screen.getByText('Select a day')).toBeInTheDocument()
    })

    it('shows formatted date when a date is pre-selected', () => {
      const date = new Date(2025, 5, 15) // June 15 2025
      renderWithTheme(<SealDatePicker selected={date} />)
      // Date is formatted via Intl — verify partial text to avoid locale issues
      expect(screen.getByText(/2025/)).toBeInTheDocument()
    })

    it('uses custom formatDate when provided', () => {
      const date = new Date(2025, 5, 15)
      renderWithTheme(<SealDatePicker selected={date} formatDate={() => 'custom-format'} />)
      expect(screen.getByText('custom-format')).toBeInTheDocument()
    })

    it('is disabled when disabled prop is true', () => {
      renderWithTheme(<SealDatePicker disabled />)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('is not disabled by default', () => {
      renderWithTheme(<SealDatePicker />)
      expect(screen.getByRole('button')).not.toBeDisabled()
    })

    it('has data-slot attribute on trigger', () => {
      renderWithTheme(<SealDatePicker />)
      expect(document.querySelector('[data-slot="date-picker-trigger"]')).toBeInTheDocument()
    })

    it('applies custom className to trigger', () => {
      renderWithTheme(<SealDatePicker className="extra-class" />)
      const trigger = document.querySelector('[data-slot="date-picker-trigger"]')
      expect(trigger?.className ?? '').toContain('extra-class')
    })
  })

  describe('SealDatePicker.Single', () => {
    it(RENDERS_WITHOUT_ERROR, () => {
      renderWithTheme(<SealDatePicker.Single />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('shows placeholder text when no date is selected', () => {
      renderWithTheme(<SealDatePicker.Single placeholder="Choose date" />)
      expect(screen.getByText('Choose date')).toBeInTheDocument()
    })

    it('shows formatted selected date', () => {
      const date = new Date(2025, 0, 20) // Jan 20 2025
      renderWithTheme(<SealDatePicker.Single selected={date} />)
      expect(screen.getByText(/Jan/)).toBeInTheDocument()
    })

    it('opens calendar on trigger click', () => {
      renderWithTheme(<SealDatePicker.Single />)
      const trigger = screen.getByRole('button')
      fireEvent.click(trigger)
      // Calendar grid should now be in the document via the portal
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })

    it('wires onSelect prop without throwing', () => {
      const handleSelect = vi.fn()
      expect(() =>
        renderWithTheme(
          <SealDatePicker.Single defaultMonth={new Date(2025, 5, 1)} onSelect={handleSelect} />,
        ),
      ).not.toThrow()
    })

    it('accepts allowDeselection prop without throwing', () => {
      const date = new Date(2025, 5, 15)
      expect(() =>
        renderWithTheme(
          <SealDatePicker.Single
            selected={date}
            defaultMonth={date}
            onSelect={vi.fn()}
            allowDeselection={false}
          />,
        ),
      ).not.toThrow()
    })
  })

  describe('SealDatePicker.Range', () => {
    it(RENDERS_WITHOUT_ERROR, () => {
      renderWithTheme(<SealDatePicker.Range />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('shows default range placeholder when no range is selected', () => {
      renderWithTheme(<SealDatePicker.Range />)
      expect(screen.getByText('Pick a date range')).toBeInTheDocument()
    })

    it('shows custom placeholder when provided', () => {
      renderWithTheme(<SealDatePicker.Range placeholder="Select range" />)
      expect(screen.getByText('Select range')).toBeInTheDocument()
    })

    it('shows formatted range when a complete range is selected', () => {
      const range: DateRange = {
        from: new Date(2025, 5, 10),
        to: new Date(2025, 5, 20),
      }
      renderWithTheme(<SealDatePicker.Range selected={range} />)
      expect(screen.getByText(/Jun/)).toBeInTheDocument()
    })

    it('shows partial range (from – ...) when only start date is selected', () => {
      const range: DateRange = { from: new Date(2025, 5, 10), to: undefined }
      renderWithTheme(<SealDatePicker.Range selected={range} />)
      expect(screen.getByText(/\.\.\./)).toBeInTheDocument()
    })

    it('uses custom formatDateRange when provided', () => {
      const range: DateRange = {
        from: new Date(2025, 5, 10),
        to: new Date(2025, 5, 20),
      }
      renderWithTheme(
        <SealDatePicker.Range selected={range} formatDateRange={() => 'custom-range'} />,
      )
      expect(screen.getByText('custom-range')).toBeInTheDocument()
    })

    it('is disabled when disabled prop is true', () => {
      renderWithTheme(<SealDatePicker.Range disabled />)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('opens calendar on trigger click', () => {
      renderWithTheme(<SealDatePicker.Range />)
      fireEvent.click(screen.getByRole('button'))
      expect(document.querySelector('[role="grid"]')).toBeInTheDocument()
    })
  })
})
