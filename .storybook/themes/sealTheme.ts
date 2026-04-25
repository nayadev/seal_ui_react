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
