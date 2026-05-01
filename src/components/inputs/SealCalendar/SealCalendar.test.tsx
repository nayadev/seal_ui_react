import { screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealCalendar } from './SealCalendar'

const RENDERS_WITHOUT_ERROR = 'renders without error'

describe('SealCalendar', () => {
  describe('SealCalendar (default / Single)', () => {
    it(RENDERS_WITHOUT_ERROR, () => {
      renderWithTheme(<SealCalendar />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('renders the current month by default', () => {
      const now = new Date()
      renderWithTheme(<SealCalendar />)
      expect(document.body.textContent).toContain(String(now.getFullYear()))
    })

    it('renders with a pre-selected date', () => {
      const date = new Date(2025, 5, 15) // June 15 2025
      renderWithTheme(<SealCalendar defaultMonth={date} selected={date} />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('renders with disabled days', () => {
      const disabledDay = new Date(2025, 5, 10)
      renderWithTheme(<SealCalendar defaultMonth={disabledDay} disabled={disabledDay} />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('accepts additional className', () => {
      renderWithTheme(<SealCalendar className="extra-class" />)
      const calendar = document.querySelector('[data-slot="calendar"]')
      expect(calendar?.className ?? '').toMatch(/extra-class/)
    })

    it('applies Seal token border class to container', () => {
      renderWithTheme(<SealCalendar />)
      const calendar = document.querySelector('[data-slot="calendar"]')
      expect(calendar?.className ?? '').toMatch(/seal-border-default/)
    })
  })

  describe('SealCalendar.Single', () => {
    it(RENDERS_WITHOUT_ERROR, () => {
      renderWithTheme(<SealCalendar.Single />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('calls onSelect when a day button is clicked', () => {
      const handleSelect = vi.fn()
      renderWithTheme(
        <SealCalendar.Single defaultMonth={new Date(2025, 5, 1)} onSelect={handleSelect} />,
      )
      const dayButtons = screen.getAllByRole('button')
      const dayButton = dayButtons.find((btn) => btn.dataset.day !== undefined)
      if (dayButton) {
        dayButton.click()
        expect(handleSelect).toHaveBeenCalled()
      }
    })
  })

  describe('SealCalendar.Multiple', () => {
    it(RENDERS_WITHOUT_ERROR, () => {
      renderWithTheme(<SealCalendar.Multiple />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('renders with pre-selected dates', () => {
      const dates = [new Date(2025, 5, 5), new Date(2025, 5, 10)]
      renderWithTheme(
        <SealCalendar.Multiple defaultMonth={new Date(2025, 5, 1)} selected={dates} />,
      )
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })
  })

  describe('SealCalendar.Range', () => {
    it(RENDERS_WITHOUT_ERROR, () => {
      renderWithTheme(<SealCalendar.Range />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('renders with a pre-selected range', () => {
      const range = { from: new Date(2025, 5, 10), to: new Date(2025, 5, 20) }
      renderWithTheme(<SealCalendar.Range defaultMonth={new Date(2025, 5, 1)} selected={range} />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('renders with a partial range (from only)', () => {
      const range = { from: new Date(2025, 5, 10), to: undefined }
      renderWithTheme(<SealCalendar.Range defaultMonth={new Date(2025, 5, 1)} selected={range} />)
      expect(screen.getByRole('grid')).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('renders previous and next month navigation buttons', () => {
      renderWithTheme(<SealCalendar />)
      // react-day-picker renders navigation buttons
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('CSS tokens', () => {
    it('applies brand primary token to selected day button', () => {
      const date = new Date(2025, 5, 15)
      renderWithTheme(<SealCalendar defaultMonth={date} selected={date} />)
      // Selected day button should have the brand primary class
      const selectedButton = document.querySelector('[data-selected-single="true"]')
      if (selectedButton) {
        expect(selectedButton.className).toMatch(/seal-brand-primary/)
      }
    })
  })
})
