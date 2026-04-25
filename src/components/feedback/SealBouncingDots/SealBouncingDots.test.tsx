import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it } from 'vitest'

import { SealBouncingDots } from './SealBouncingDots'

import { ThemeProvider } from '@/theme/ThemeProvider'

const renderWithTheme = (ui: React.ReactElement) =>
  render(
    <ThemeProvider theme="nebula" mode="dark">
      {ui}
    </ThemeProvider>,
  )

const WRAPPER_SEL = '.seal-bouncing-dots'
const DOT_SEL = '.rounded-full'

describe('SealBouncingDots', () => {
  it('renders three dots', () => {
    const { container } = renderWithTheme(<SealBouncingDots />)
    const wrapper = container.querySelector(WRAPPER_SEL)
    expect(wrapper).toBeInTheDocument()
    expect(wrapper?.querySelectorAll(DOT_SEL)).toHaveLength(3)
  })

  it('applies explicit color to each dot', () => {
    const { container } = renderWithTheme(<SealBouncingDots color="#f44336" />)
    container.querySelectorAll(DOT_SEL).forEach((dot) => {
      expect(dot).toHaveStyle({ backgroundColor: '#f44336' })
    })
  })

  it('falls back to currentColor when color is not provided', () => {
    const { container } = renderWithTheme(<SealBouncingDots />)
    // jsdom does not resolve currentColor as a computed value; check the inline attribute directly.
    expect(container.querySelector(DOT_SEL)?.getAttribute('style')).toContain('currentcolor')
  })

  it('applies custom size to each dot', () => {
    const { container } = renderWithTheme(<SealBouncingDots size={10} />)
    expect(container.querySelector(DOT_SEL)).toHaveStyle({ width: '10px', height: '10px' })
  })

  it('defaults to 6px dot size', () => {
    const { container } = renderWithTheme(<SealBouncingDots />)
    expect(container.querySelector(DOT_SEL)).toHaveStyle({ width: '6px', height: '6px' })
  })

  it('applies custom spacing between dots', () => {
    const { container } = renderWithTheme(<SealBouncingDots spacing={8} />)
    expect(container.querySelector(WRAPPER_SEL)).toHaveStyle({ gap: '8px' })
  })

  it('defaults to 4px gap between dots', () => {
    const { container } = renderWithTheme(<SealBouncingDots />)
    expect(container.querySelector(WRAPPER_SEL)).toHaveStyle({ gap: '4px' })
  })

  it('sets the bounce animation on each dot', () => {
    const { container } = renderWithTheme(<SealBouncingDots />)
    container.querySelectorAll(DOT_SEL).forEach((dot) => {
      expect(dot).toHaveStyle({ animationName: 'seal-bounce-dot' })
    })
  })

  it('staggers animation delay across the three dots', () => {
    const { container } = renderWithTheme(<SealBouncingDots />)
    const dots = Array.from(container.querySelectorAll(DOT_SEL))
    expect(dots[0]).toHaveStyle({ animationDelay: '0.00s' })
    expect(dots[1]).toHaveStyle({ animationDelay: '0.18s' })
    expect(dots[2]).toHaveStyle({ animationDelay: '0.36s' })
  })

  it('forwards className to the wrapper element', () => {
    const { container } = renderWithTheme(<SealBouncingDots className="my-custom-class" />)
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument()
  })

  it('forwards HTML attributes to the wrapper element', () => {
    renderWithTheme(<SealBouncingDots role="status" aria-label="Loading content" />)
    expect(screen.getByRole('status', { name: 'Loading content' })).toBeInTheDocument()
  })

  it('merges custom style with computed gap', () => {
    const { container } = renderWithTheme(<SealBouncingDots style={{ opacity: 0.5 }} />)
    const wrapper = container.querySelector(WRAPPER_SEL)
    expect(wrapper).toHaveStyle({ opacity: '0.5', gap: '4px' })
  })
})
