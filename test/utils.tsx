import { render, type RenderResult } from '@testing-library/react'

import { ThemeProvider } from '@/theme/ThemeProvider'

/**
 * Renders `ui` wrapped in a `ThemeProvider` with the `nebula` dark theme.
 *
 * Use this in every component test to ensure CSS variables are applied
 * and the component tree matches the production rendering context.
 */
export function renderWithTheme(ui: React.ReactElement): RenderResult {
  return render(
    <ThemeProvider theme="nebula" mode="dark">
      {ui}
    </ThemeProvider>,
  )
}
