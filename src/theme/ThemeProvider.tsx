import { createContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { arcticTheme } from './themes/arctic'
import { deepOceanTheme } from './themes/deep_ocean'
import { nebulaTheme } from './themes/nebula'
import { terminalTheme } from './themes/terminal'

/** Identifier for one of the available SealUI themes. */
export type ThemeName = 'arctic' | 'deep_ocean' | 'nebula' | 'terminal'

/** Active color-mode — `'dark'` is the primary experience. */
export type ThemeMode = 'light' | 'dark'

/** Shape of the value exposed by `ThemeContext`. */
export interface ThemeContextValue {
  theme: ThemeName
  mode: ThemeMode
  setTheme: (theme: ThemeName) => void
  setMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

const themeMap = {
  arctic: arcticTheme,
  deep_ocean: deepOceanTheme,
  nebula: nebulaTheme,
  terminal: terminalTheme,
} as const

/** Props accepted by `ThemeProvider`. */
export interface ThemeProviderProps {
  readonly theme?: ThemeName
  readonly mode?: ThemeMode
  readonly children: ReactNode
}

/**
 * Applies the selected theme and mode as CSS classes on `<html>`,
 * making all `--seal-*` CSS variables available to the subtree.
 *
 * ```tsx
 * <ThemeProvider theme="nebula" mode="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme: initialTheme = 'nebula',
  mode: initialMode = 'dark',
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>(initialTheme)
  const [mode, setMode] = useState<ThemeMode>(initialMode)

  useEffect(() => {
    const root = document.documentElement
    const config = themeMap[theme]
    const activeClass = mode === 'dark' ? config.darkClass : config.lightClass

    // Remove all theme classes before applying the new one
    Object.values(themeMap).forEach(({ darkClass, lightClass }) => {
      root.classList.remove(darkClass, lightClass)
    })

    root.classList.add(activeClass)
    root.setAttribute('data-theme', theme)
    root.setAttribute('data-mode', mode)
  }, [theme, mode])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, setTheme, setMode }),
    [theme, mode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
