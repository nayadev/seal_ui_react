import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './useTheme'

function ReadTheme() {
  const { theme, mode } = useTheme()
  return (
    <span>
      {theme}/{mode}
    </span>
  )
}

function ThemeSetter() {
  const { setTheme, setMode } = useTheme()
  return (
    <>
      <button
        onClick={() => {
          setTheme('arctic')
        }}
      >
        set arctic
      </button>
      <button
        onClick={() => {
          setMode('light')
        }}
      >
        set light
      </button>
    </>
  )
}

describe('ThemeProvider', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <span>hello</span>
      </ThemeProvider>,
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('defaults to nebula dark', () => {
    render(
      <ThemeProvider>
        <ReadTheme />
      </ThemeProvider>,
    )
    expect(screen.getByText('nebula/dark')).toBeInTheDocument()
  })

  it('respects initial theme and mode props', () => {
    render(
      <ThemeProvider theme="arctic" mode="light">
        <ReadTheme />
      </ThemeProvider>,
    )
    expect(screen.getByText('arctic/light')).toBeInTheDocument()
  })

  it('applies the theme CSS class to <html>', () => {
    render(
      <ThemeProvider theme="terminal" mode="dark">
        <span />
      </ThemeProvider>,
    )
    expect(document.documentElement.classList.contains('terminal-dark')).toBe(true)
  })

  it('sets data-theme and data-mode on <html>', () => {
    render(
      <ThemeProvider theme="nebula" mode="light">
        <span />
      </ThemeProvider>,
    )
    expect(document.documentElement.dataset.theme).toBe('nebula')
    expect(document.documentElement.dataset.mode).toBe('light')
  })

  it('allows changing theme at runtime', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ReadTheme />
        <ThemeSetter />
      </ThemeProvider>,
    )
    await user.click(screen.getByText('set arctic'))
    expect(screen.getByText('arctic/dark')).toBeInTheDocument()
  })

  it('allows changing mode at runtime', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ReadTheme />
        <ThemeSetter />
      </ThemeProvider>,
    )
    await user.click(screen.getByText('set light'))
    expect(screen.getByText('nebula/light')).toBeInTheDocument()
  })

  it('removes old theme class when switching themes', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider theme="nebula" mode="dark">
        <ThemeSetter />
      </ThemeProvider>,
    )
    expect(document.documentElement.classList.contains('nebula-dark')).toBe(true)
    await user.click(screen.getByText('set arctic'))
    expect(document.documentElement.classList.contains('nebula-dark')).toBe(false)
    expect(document.documentElement.classList.contains('arctic-dark')).toBe(true)
  })
})
