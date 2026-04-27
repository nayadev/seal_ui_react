import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Bookmark, Share2, Sparkles, SlidersHorizontal, TriangleAlert } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '../../../../test/utils'

import { SealOutlineIconButton } from './SealOutlineIconButton'

describe('SealOutlineIconButton', () => {
  it('renders without error with minimal props', () => {
    renderWithTheme(<SealOutlineIconButton.Primary icon={Share2} tooltip="Share" />)
    const button = screen.getByRole('button', { name: 'Share' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('title', 'Share')
  })

  describe('compound sub-components', () => {
    it('renders Primary without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealOutlineIconButton.Primary icon={Share2} tooltip="primary" />,
      )
      expect(screen.getByRole('button', { name: 'primary' })).toBeInTheDocument()
      unmount()
    })

    it('renders Accent without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealOutlineIconButton.Accent icon={Share2} tooltip="accent" />,
      )
      expect(screen.getByRole('button', { name: 'accent' })).toBeInTheDocument()
      unmount()
    })

    it('renders AccentSecondary without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealOutlineIconButton.AccentSecondary icon={Share2} tooltip="accent-secondary" />,
      )
      expect(screen.getByRole('button', { name: 'accent-secondary' })).toBeInTheDocument()
      unmount()
    })

    it('renders Gradient without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealOutlineIconButton.Gradient icon={Sparkles} tooltip="gradient" />,
      )
      expect(screen.getByRole('button', { name: 'gradient' })).toBeInTheDocument()
      unmount()
    })

    it('renders AccentGradient without crashing', () => {
      const { unmount } = renderWithTheme(
        <SealOutlineIconButton.AccentGradient icon={Sparkles} tooltip="accent-gradient" />,
      )
      expect(screen.getByRole('button', { name: 'accent-gradient' })).toBeInTheDocument()
      unmount()
    })

    it('renders Custom with solid color', () => {
      renderWithTheme(
        <SealOutlineIconButton.Custom icon={TriangleAlert} color="#e53935" tooltip="Warning" />,
      )
      expect(screen.getByRole('button', { name: 'Warning' })).toBeInTheDocument()
    })
  })

  it('shows loading spinner when loading is true', () => {
    renderWithTheme(<SealOutlineIconButton.Primary icon={Share2} tooltip="Loading" loading />)
    const button = screen.getByRole('button', { name: 'Loading' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    const spinner = button.querySelector('.seal-bouncing-dots')
    expect(spinner).toBeInTheDocument()
  })

  it('disables interaction when disabled prop is true', async () => {
    const onClick = vi.fn()
    renderWithTheme(
      <SealOutlineIconButton.Primary icon={Share2} tooltip="Disabled" disabled onClick={onClick} />,
    )
    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('calls onClick when interacted with', async () => {
    const onClick = vi.fn()
    renderWithTheme(
      <SealOutlineIconButton.Primary icon={Share2} tooltip="Action" onClick={onClick} />,
    )
    const button = screen.getByRole('button', { name: 'Action' })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('respects the title prop over tooltip prop', () => {
    renderWithTheme(
      <SealOutlineIconButton.Primary icon={Share2} title="Title text" tooltip="Tooltip text" />,
    )
    const button = screen.getByRole('button', { name: 'Title text' })
    expect(button).toHaveAttribute('title', 'Title text')
  })

  it('renders Gradient with gradient icon', () => {
    renderWithTheme(<SealOutlineIconButton.Gradient icon={Sparkles} tooltip="Magic" />)
    const button = screen.getByRole('button', { name: 'Magic' })
    const svgGradient = button.querySelector('linearGradient')
    expect(svgGradient).toBeInTheDocument()
  })

  it('renders AccentGradient with gradient icon', () => {
    renderWithTheme(<SealOutlineIconButton.AccentGradient icon={Sparkles} tooltip="Boost" />)
    const button = screen.getByRole('button', { name: 'Boost' })
    const svgGradient = button.querySelector('linearGradient')
    expect(svgGradient).toBeInTheDocument()
  })

  it('renders Custom with gradient icon', () => {
    renderWithTheme(
      <SealOutlineIconButton.Custom
        icon={SlidersHorizontal}
        gradient="linear-gradient(to right, #00c6ff, #0072ff)"
        tooltip="Filter"
      />,
    )
    const button = screen.getByRole('button', { name: 'Filter' })
    const svgGradient = button.querySelector('linearGradient')
    expect(svgGradient).toBeInTheDocument()
  })

  it('renders without tooltip when neither tooltip nor title is provided', () => {
    renderWithTheme(<SealOutlineIconButton.Primary icon={Bookmark} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
