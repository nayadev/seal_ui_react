# SealUI React

> A token-driven React design system built on shadcn/ui — modern, minimal, elegant, slightly futuristic.

[![Version](https://img.shields.io/badge/version-0.0.1-8055e0)](./package.json)
[![License](https://img.shields.io/badge/license-MIT-32b88c)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6)](https://typescriptlang.org)

---

## Overview

SealUI React is the web implementation of the SealUI design system. It consumes design tokens from [`@sealui/tokens`](https://github.com/nayadev/seal_ui_tokens) and provides a library of React components built on [shadcn/ui](https://ui.shadcn.com/) primitives.

**Dark mode is the primary experience.** Light mode is fully supported across all themes.

### Architecture

```
seal_ui_tokens  ──►  seal_ui_react   (this repo)
                ──►  seal_ui_flutter
```

Tokens are the single source of truth. Both the React and Flutter implementations consume them independently, ensuring visual consistency across platforms.

---

## Getting Started

### Installation

```bash
npm install github:nayadev/seal_ui_react#main
```

### Setup

Wrap your application root with `ThemeProvider`:

```tsx
import { ThemeProvider } from '@sealui/react'

function App() {
  return (
    <ThemeProvider theme="nebula" mode="dark">
      <YourApp />
    </ThemeProvider>
  )
}
```

---

## Theming

SealUI ships **4 themes × 2 modes**. Each theme has its own distinct visual identity:

| Theme        | Personality                                               |
| ------------ | --------------------------------------------------------- |
| `nebula`     | Cosmic purple — the default; deep space with violet brand |
| `arctic`     | Icy blue — clean and crisp, inspired by frozen tundra     |
| `deep_ocean` | Abyssal blue — darker and more dramatic than arctic       |
| `terminal`   | Hacker green — vintage terminal aesthetic                 |

### Switching at Runtime

```tsx
import { useTheme } from '@sealui/react'

function ThemePicker() {
  const { theme, mode, setTheme, setMode } = useTheme()

  return (
    <>
      <button onClick={() => setTheme('arctic')}>Arctic</button>
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>Toggle Mode</button>
    </>
  )
}
```

---

## Components

> **Note:** Component library is being built progressively across sessions.

| Category         | Components                                                                    |
| ---------------- | ----------------------------------------------------------------------------- |
| **Buttons**      | `SealFilledButton`, `SealOutlineButton`, `SealTextButton` — _coming soon_     |
| **Inputs**       | `SealTextField`, `SealTextarea`, `SealCheckbox`, `SealSwitch` — _coming soon_ |
| **Feedback**     | `SealAlert`, `SealToast` — _coming soon_                                      |
| **Overlay**      | `SealDialog`, `SealSheet`, `SealPopover` — _coming soon_                      |
| **Navigation**   | `SealTabs`, `SealBreadcrumb`, `SealMenubar` — _coming soon_                   |
| **Data Display** | `SealCard`, `SealTable`, `SealBadge`, `SealAvatar` — _coming soon_            |
| **Layout**       | `SealSeparator`, `SealResizablePanelGroup` — _coming soon_                    |

---

## Token Integration

Tokens flow from `@sealui/tokens` via **CSS custom properties**. The theme class on `<html>` activates the correct values:

```css
.nebula-dark {
  --seal-brand-primary: #8055e0;
  --seal-surface-background: #0f0f1a;
  --seal-text-primary: #f0ecf9;
}
```

### Consuming Tokens

**CSS variables (preferred in components):**

```css
background: var(--seal-surface-surface);
color: var(--seal-text-primary);
```

**Tailwind:**

```tsx
<div className="bg-[var(--seal-surface-surface)] text-[var(--seal-text-primary)]" />
```

**TypeScript constants:**

```ts
import { dimensionMd, styleBody } from '@sealui/tokens'
```

Never hardcode token values — always reference a named CSS variable or JS constant from `@sealui/tokens`.

---

## Development

| Command                   | Purpose                     |
| ------------------------- | --------------------------- |
| `npm run dev`             | Start dev server            |
| `npm run storybook`       | Open Storybook              |
| `npm run test`            | Run unit tests (watch)      |
| `npm run test:coverage`   | Run tests with coverage     |
| `npm run lint`            | Lint (zero warnings)        |
| `npm run build`           | Type-check and build        |
| `npm run build-storybook` | Build Storybook static site |

---

## Architecture

```
seal_ui_react/
├── src/
│   ├── tokens/              # Re-exports from @sealui/tokens
│   ├── theme/               # ThemeProvider, useTheme, theme definitions
│   │   └── themes/          # One file per theme
│   ├── components/          # Seal* component wrappers
│   └── index.ts             # Public barrel exports
├── test/
│   └── setup.ts             # @testing-library/jest-dom setup
├── .storybook/
│   ├── main.ts              # Storybook config
│   ├── preview.tsx          # Global decorators + theme toolbar
│   └── themes/sealTheme.ts  # Custom Storybook UI theme
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.storybook.json
└── eslint.config.js
```

**Dependency direction:** `@sealui/tokens → tokens/ → theme/ → components/` — no layer may depend on a higher layer.

---

## Related Packages

| Package                                                         | Description                                                                          |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`seal_ui_tokens`](https://github.com/nayadev/seal_ui_tokens)   | Token source of truth — CSS variables, JS constants, Tailwind config, Flutter tokens |
| [`seal_ui_flutter`](https://github.com/nayadev/seal_ui_flutter) | Flutter implementation of SealUI                                                     |

---

## Storybook & Chromatic

Component stories live in `src/stories/`. Storybook is published automatically to [Chromatic](https://www.chromatic.com/) on every push to `main` and on pull requests via GitHub Actions.

**Live Storybook:** https://69e814d684c5fea63427bc0d-txjsgwacii.chromatic.com/

| Command                   | Purpose                                               |
| ------------------------- | ----------------------------------------------------- |
| `npm run storybook`       | Local Storybook on :6006                              |
| `npm run build-storybook` | Build static Storybook                                |
| `npx chromatic`           | Publish manually (requires `CHROMATIC_PROJECT_TOKEN`) |

The CI workflow (`.github/workflows/chromatic.yml`) picks the token from the `CHROMATIC_PROJECT_TOKEN` repository secret — never commit the token.

### MCP Server

[`@storybook/addon-mcp`](https://storybook.js.org/addons/@storybook/addon-mcp) exposes Storybook as an MCP server so AI tools can read component stories and docs.

| Environment | URL                                                             |
| ----------- | --------------------------------------------------------------- |
| Local       | `http://localhost:6006/mcp`                                     |
| Published   | `https://69e814d684c5fea63427bc0d-txjsgwacii.chromatic.com/mcp` |

---

## License

MIT
