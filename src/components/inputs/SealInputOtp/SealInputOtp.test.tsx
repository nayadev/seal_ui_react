import { fireEvent, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '../../../../test/utils'

import { SealInputOTP } from './SealInputOtp'

// ─── String constants (sonarjs/no-duplicate-string) ────────────────────────
const ROLE_TEXTBOX = 'textbox'
const LABEL_OTP = 'One-Time Password'
const SEPARATOR_ROLE = 'separator'
const ARIA_DISABLED = 'aria-disabled'
const DATA_INPUT_OTP = '[data-input-otp]'
const ACCEPTS_EXTRA_CLASS = 'accepts additional className'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sixDigitOtp(props?: Partial<React.ComponentProps<typeof SealInputOTP>>) {
  return (
    <SealInputOTP maxLength={6} aria-label={LABEL_OTP} {...props}>
      <SealInputOTP.Group>
        <SealInputOTP.Slot index={0} />
        <SealInputOTP.Slot index={1} />
        <SealInputOTP.Slot index={2} />
      </SealInputOTP.Group>
      <SealInputOTP.Separator />
      <SealInputOTP.Group>
        <SealInputOTP.Slot index={3} />
        <SealInputOTP.Slot index={4} />
        <SealInputOTP.Slot index={5} />
      </SealInputOTP.Group>
    </SealInputOTP>
  )
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('SealInputOTP', () => {
  it('renders without error', () => {
    renderWithTheme(sixDigitOtp())
    expect(screen.getByRole(ROLE_TEXTBOX)).toBeInTheDocument()
  })

  it('renders a hidden input with correct maxLength', () => {
    const { container } = renderWithTheme(sixDigitOtp())
    const input = container.querySelector(DATA_INPUT_OTP)
    expect(input).toHaveAttribute('maxlength', '6')
  })

  it('renders the separator', () => {
    renderWithTheme(sixDigitOtp())
    expect(screen.getAllByRole(SEPARATOR_ROLE).length).toBeGreaterThanOrEqual(1)
  })

  it('calls onChange when a character is typed', () => {
    const onChange = vi.fn()
    renderWithTheme(sixDigitOtp({ onChange }))
    const input = screen.getByRole(ROLE_TEXTBOX)
    fireEvent.change(input, { target: { value: '1' } })
    expect(onChange).toHaveBeenCalledWith('1')
  })

  it('reflects controlled value', () => {
    const { container } = renderWithTheme(sixDigitOtp({ value: '123' }))
    const input = container.querySelector(DATA_INPUT_OTP)
    expect(input).toHaveValue('123')
  })

  it('renders disabled state', () => {
    const { container } = renderWithTheme(sixDigitOtp({ disabled: true }))
    const input = container.querySelector(DATA_INPUT_OTP)
    // input-otp sets aria-disabled or disabled on the underlying input
    const isDisabled =
      input?.hasAttribute('disabled') === true ||
      input?.getAttribute(ARIA_DISABLED) === 'true' ||
      input?.getAttribute('data-disabled') === 'true'
    expect(isDisabled).toBe(true)
  })

  it('accepts additional className on the container', () => {
    const { container } = renderWithTheme(sixDigitOtp({ className: 'custom-class' }))
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders pattern prop without error', () => {
    renderWithTheme(sixDigitOtp({ pattern: '^[0-9]*$' }))
    expect(screen.getByRole(ROLE_TEXTBOX)).toBeInTheDocument()
  })
})

describe('SealInputOTP.Group', () => {
  it(ACCEPTS_EXTRA_CLASS, () => {
    const { container } = renderWithTheme(
      <SealInputOTP maxLength={2}>
        <SealInputOTP.Group className="group-class">
          <SealInputOTP.Slot index={0} />
          <SealInputOTP.Slot index={1} />
        </SealInputOTP.Group>
      </SealInputOTP>,
    )
    const group = container.querySelector('.group-class')
    expect(group).not.toBeNull()
  })

  it('renders children slots', () => {
    const { container } = renderWithTheme(
      <SealInputOTP maxLength={3}>
        <SealInputOTP.Group className="three-slot-group">
          <SealInputOTP.Slot index={0} />
          <SealInputOTP.Slot index={1} />
          <SealInputOTP.Slot index={2} />
        </SealInputOTP.Group>
      </SealInputOTP>,
    )
    const group = container.querySelector('.three-slot-group')
    // 3 slot divs inside the group
    expect(group?.children.length).toBe(3)
  })
})

describe('SealInputOTP.Slot', () => {
  it(ACCEPTS_EXTRA_CLASS, () => {
    const { container } = renderWithTheme(
      <SealInputOTP maxLength={1}>
        <SealInputOTP.Group>
          <SealInputOTP.Slot index={0} className="slot-class" />
        </SealInputOTP.Group>
      </SealInputOTP>,
    )
    const slot = container.querySelector('.slot-class')
    expect(slot).not.toBeNull()
  })
})

describe('SealInputOTP.Separator', () => {
  it('renders with separator role', () => {
    renderWithTheme(
      <SealInputOTP maxLength={2}>
        <SealInputOTP.Group>
          <SealInputOTP.Slot index={0} />
        </SealInputOTP.Group>
        <SealInputOTP.Separator />
        <SealInputOTP.Group>
          <SealInputOTP.Slot index={1} />
        </SealInputOTP.Group>
      </SealInputOTP>,
    )
    expect(screen.getByRole(SEPARATOR_ROLE)).toBeInTheDocument()
  })

  it(ACCEPTS_EXTRA_CLASS, () => {
    const { container } = renderWithTheme(
      <SealInputOTP maxLength={1}>
        <SealInputOTP.Group>
          <SealInputOTP.Slot index={0} />
        </SealInputOTP.Group>
        <SealInputOTP.Separator className="sep-class" />
      </SealInputOTP>,
    )
    const sep = container.querySelector('.sep-class')
    expect(sep).not.toBeNull()
  })
})

describe('SealInputOTP compound pattern', () => {
  it('has correct displayNames', () => {
    expect(SealInputOTP.Group.displayName).toBe('SealInputOTP.Group')
    expect(SealInputOTP.Slot.displayName).toBe('SealInputOTP.Slot')
    expect(SealInputOTP.Separator.displayName).toBe('SealInputOTP.Separator')
  })

  it('four-digit OTP with a single group renders correctly', () => {
    const { container } = renderWithTheme(
      <SealInputOTP maxLength={4}>
        <SealInputOTP.Group>
          {[0, 1, 2, 3].map((i) => (
            <SealInputOTP.Slot key={i} index={i} />
          ))}
        </SealInputOTP.Group>
      </SealInputOTP>,
    )
    const input = container.querySelector(DATA_INPUT_OTP)
    expect(input).toHaveAttribute('maxlength', '4')
  })
})
