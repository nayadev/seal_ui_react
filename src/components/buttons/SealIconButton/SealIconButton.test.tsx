import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Rocket } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '../../../../test/utils'

import { SealIconButton } from './SealIconButton'

describe('SealIconButton', () => {
  it('renders without error with minimal props', () => {
    renderWithTheme(<SealIconButton.Primary icon={Rocket} tooltip="Launch" />)
    const button = screen.getByRole('button', { name: 'Launch' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('title', 'Launch')
  })

  describe('compound sub-components', () => {
    it('renders Primary without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealIconButton.Primary icon={Rocket} tooltip="primary" />,
      )
      expect(screen.getByRole('button', { name: 'primary' })).toBeInTheDocument()
      unmount()
    })

    it('renders Accent without crashing', () => {
      const { unmount } = renderWithTheme(<SealIconButton.Accent icon={Rocket} tooltip="accent" />)
      expect(screen.getByRole('button', { name: 'accent' })).toBeInTheDocument()
      unmount()
    })

    it('renders AccentSecondary without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealIconButton.AccentSecondary icon={Rocket} tooltip="accent-secondary" />,
      )
      expect(screen.getByRole('button', { name: 'accent-secondary' })).toBeInTheDocument()
      unmount()
    })

    it('renders Gradient without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealIconButton.Gradient icon={Rocket} tooltip="gradient" />,
      )
      expect(screen.getByRole('button', { name: 'gradient' })).toBeInTheDocument()
      unmount()
    })

    it('renders AccentGradient without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealIconButton.AccentGradient icon={Rocket} tooltip="accent-gradient" />,
      )
      expect(screen.getByRole('button', { name: 'accent-gradient' })).toBeInTheDocument()
      unmount()
    })

    it('renders Custom without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealIconButton.Custom icon={Rocket} color="#f00" tooltip="custom" />,
      )
      expect(screen.getByRole('button', { name: 'custom' })).toBeInTheDocument()
      unmount()
    })
  })

  it('shows loading spinner when loading is true', () => {
    renderWithTheme(<SealIconButton.Primary icon={Rocket} tooltip="Loading" loading />)
    const button = screen.getByRole('button', { name: 'Loading' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    const spinner = button.querySelector('.seal-bouncing-dots')
    expect(spinner).toBeInTheDocument()
  })

  it('disables interaction when disabled prop is true', async () => {
    const onClick = vi.fn()
    renderWithTheme(
      <SealIconButton.Primary icon={Rocket} tooltip="Disabled" disabled onClick={onClick} />,
    )
    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('calls onClick when interacted with', async () => {
    const onClick = vi.fn()
    renderWithTheme(<SealIconButton.Primary icon={Rocket} tooltip="Action" onClick={onClick} />)
    const button = screen.getByRole('button', { name: 'Action' })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('respects the title prop over tooltip prop', () => {
    renderWithTheme(
      <SealIconButton.Primary icon={Rocket} title="Title text" tooltip="Tooltip text" />,
    )
    const button = screen.getByRole('button', { name: 'Title text' })
    expect(button).toHaveAttribute('title', 'Title text')
  })
})
