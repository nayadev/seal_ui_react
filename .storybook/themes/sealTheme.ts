import { create } from 'storybook/theming/create'

export const sealTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'SealUI',
  brandUrl: 'https://github.com/nayadev/seal_ui_react',
  brandTarget: '_blank',

  // Nebula dark colors as the UI base
  colorPrimary: '#8055e0',
  colorSecondary: '#9b6dff',

  // UI
  appBg: '#0f0f1a',
  appContentBg: '#1a1a2e',
  appPreviewBg: '#0f0f1a',
  appBorderColor: '#2e2e4a',
  appBorderRadius: 8,

  // Text
  textColor: '#f0ecf9',
  textInverseColor: '#0f0f1a',
  textMutedColor: '#9e9bb3',

  // Toolbar
  barTextColor: '#9e9bb3',
  barHoverColor: '#f0ecf9',
  barSelectedColor: '#9b6dff',
  barBg: '#1a1a2e',

  // Form
  inputBg: '#252542',
  inputBorder: '#2e2e4a',
  inputTextColor: '#f0ecf9',
  inputBorderRadius: 6,

  // Buttons
  buttonBg: '#252542',
  buttonBorder: '#2e2e4a',
  booleanBg: '#252542',
  booleanSelectedBg: '#8055e0',
})

type DocsThemeColors = {
  bg: string
  surface: string
  text: string
  textMuted: string
  border: string
  brand: string
}

function createDocsTheme(base: 'dark' | 'light', colors: DocsThemeColors) {
  return create({
    base,
    colorPrimary: colors.brand,
    colorSecondary: colors.brand,
    appBg: colors.bg,
    appContentBg: colors.bg,
    appPreviewBg: colors.surface,
    appBorderColor: colors.border,
    appBorderRadius: 8,
    textColor: colors.text,
    textMutedColor: colors.textMuted,
    inputBg: colors.surface,
    inputBorder: colors.border,
    inputTextColor: colors.text,
    inputBorderRadius: 6,
  })
}

// One docs theme per seal theme + mode combination, derived from token values.
export const sealDocsThemes: Record<string, ReturnType<typeof createDocsTheme>> = {
  'nebula-dark': createDocsTheme('dark', {
    bg: '#0f0f1a',
    surface: '#1a1a2e',
    text: '#f0ecf9',
    textMuted: '#9e9bb3',
    border: '#2e2e4a',
    brand: '#8055e0',
  }),
  'nebula-light': createDocsTheme('light', {
    bg: '#f5f2ff',
    surface: '#ffffff',
    text: '#1a1a2e',
    textMuted: '#6b6880',
    border: '#d8d3e8',
    brand: '#7b4fd4',
  }),
  'arctic-dark': createDocsTheme('dark', {
    bg: '#071822',
    surface: '#0d2333',
    text: '#e8f4fc',
    textMuted: '#6ea8c4',
    border: '#0d3050',
    brand: '#29b6f6',
  }),
  'arctic-light': createDocsTheme('light', {
    bg: '#f8fbff',
    surface: '#ffffff',
    text: '#0a1929',
    textMuted: '#546e7a',
    border: '#b3d9f2',
    brand: '#29b6f6',
  }),
  'deep_ocean-dark': createDocsTheme('dark', {
    bg: '#020b18',
    surface: '#071524',
    text: '#e8f4fc',
    textMuted: '#6ea8c4',
    border: '#0d2b45',
    brand: '#1976d2',
  }),
  'deep_ocean-light': createDocsTheme('light', {
    bg: '#f0f7ff',
    surface: '#ffffff',
    text: '#0a1929',
    textMuted: '#37474f',
    border: '#b0c4d8',
    brand: '#1565c0',
  }),
  'terminal-dark': createDocsTheme('dark', {
    bg: '#060c0c',
    surface: '#0c1a1a',
    text: '#d4fff8',
    textMuted: '#6b7e7e',
    border: '#143030',
    brand: '#00cc99',
  }),
  'terminal-light': createDocsTheme('light', {
    bg: '#f0f8f6',
    surface: '#ffffff',
    text: '#0a1e1c',
    textMuted: '#3d6b65',
    border: '#b0d4ce',
    brand: '#007a6b',
  }),
}

// Fallback used when the current theme/mode key is not in the map.
export const sealDefaultDocsTheme = sealDocsThemes['nebula-dark']
