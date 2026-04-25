import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Rocket } from 'lucide-react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { SealIconButton } from './SealIconButton'

import { ThemeProvider } from '@/theme/ThemeProvider'

const renderWithTheme = (ui: React.ReactElement) =>
  render(
    <ThemeProvider theme="nebula" mode="dark">
      {ui}
    </ThemeProvider>,
  )

describe('SealIconButton', () => {
  it('renders without error with minimal props', () => {
    renderWithTheme(<SealIconButton icon={Rocket} tooltip="Launch" />)
    const button = screen.getByRole('button', { name: 'Launch' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('title', 'Launch')
  })

  it('renders all variants without crashing', () => {
    const variants = [
      'primary',
      'accent',
      'accent-secondary',
      'gradient',
      'accent-gradient',
      'custom',
    ] as const
    variants.forEach((variant) => {
      const { unmount } = renderWithTheme(
        <SealIconButton variant={variant} icon={Rocket} color="#f00" tooltip={variant} />,
      )
      expect(screen.getByRole('button', { name: variant })).toBeInTheDocument()
      unmount()
    })
  })

  it('shows loading spinner when loading is true', () => {
    renderWithTheme(<SealIconButton icon={Rocket} tooltip="Loading" loading />)
    const button = screen.getByRole('button', { name: 'Loading' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    const spinner = button.querySelector('.seal-bouncing-dots')
    expect(spinner).toBeInTheDocument()
  })

  it('disables interaction when disabled prop is true', async () => {
    const onClick = vi.fn()
    renderWithTheme(<SealIconButton icon={Rocket} tooltip="Disabled" disabled onClick={onClick} />)

    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()

    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('calls onClick when interacted with', async () => {
    const onClick = vi.fn()
    renderWithTheme(<SealIconButton icon={Rocket} tooltip="Action" onClick={onClick} />)

    const button = screen.getByRole('button', { name: 'Action' })
    await userEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('respects the title prop over tooltip prop', () => {
    renderWithTheme(<SealIconButton icon={Rocket} title="Title text" tooltip="Tooltip text" />)
    const button = screen.getByRole('button', { name: 'Title text' })
    expect(button).toHaveAttribute('title', 'Title text')
  })
})
