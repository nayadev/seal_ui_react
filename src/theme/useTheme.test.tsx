import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ThemeContext } from './ThemeProvider'
import { useTheme } from './useTheme'

function Consumer() {
  const { theme } = useTheme()
  return <span>{theme}</span>
}

describe('useTheme', () => {
  it('throws when used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(() => render(<Consumer />)).toThrow('useTheme must be used within a ThemeProvider')
    spy.mockRestore()
  })

  it('returns context value when inside ThemeProvider', () => {
    const ctx = {
      theme: 'nebula' as const,
      mode: 'dark' as const,
      setTheme: vi.fn(),
      setMode: vi.fn(),
    }
    render(
      <ThemeContext.Provider value={ctx}>
        <Consumer />
      </ThemeContext.Provider>,
    )
    expect(screen.getByText('nebula')).toBeInTheDocument()
  })
})
