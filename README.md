# SealUI React

> A token-driven React design system built on shadcn/ui — modern, minimal, elegant, slightly futuristic.

[![Release](https://img.shields.io/github/v/release/nayadev/seal_ui_react)](https://github.com/nayadev/seal_ui_react/releases)
[![License](https://img.shields.io/badge/license-MIT-32b88c)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6)](https://typescriptlang.org)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nayadev_seal_ui_react&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=nayadev_seal_ui_react)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=nayadev_seal_ui_react&metric=coverage)](https://sonarcloud.io/summary/new_code?id=nayadev_seal_ui_react)

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

> Component library is being built progressively across sessions. ✅ = shipped · 🔜 = coming soon

| Component               | Category    | Status |
| ----------------------- | ----------- | ------ |
| `SealFilledButton`      | Buttons     | ✅     |
| `SealOutlineButton`     | Buttons     | ✅     |
| `SealTextButton`        | Buttons     | ✅     |
| `SealIconButton`        | Buttons     | ✅     |
| `SealFilledIconButton`  | Buttons     | ✅     |
| `SealOutlineIconButton` | Buttons     | ✅     |
| `SealBouncingDots`      | Feedback    | ✅     |
| `SealAlert`             | Feedback    | ✅     |
| `SealLoader`            | Feedback    | ✅     |
| `SealProgress`          | Feedback    | ✅     |
| `SealToast`             | Feedback    | ✅     |
| `SealSonner`            | Feedback    | ✅     |
| `SealTextField`         | Inputs      | ✅     |
| `SealTextarea`          | Inputs      | ✅     |
| `SealCheckbox`          | Inputs      | ✅     |
| `SealRadioGroup`        | Inputs      | ✅     |
| `SealSelect`            | Inputs      | ✅     |
| `SealSlider`            | Inputs      | ✅     |
| `SealSwitch`            | Inputs      | ✅     |
| `SealCalendar`          | Inputs      | ✅     |
| `SealDatePicker`        | Inputs      | ✅     |
| `SealTimePicker`        | Inputs      | ✅     |
| `SealInputOtp`          | Inputs      | ✅     |
| `SealForm`              | Inputs      | 🔜     |
| `SealTooltip`           | Interaction | 🔜     |
| `SealAccordion`         | Layout      | 🔜     |
| `SealAvatar`            | Layout      | 🔜     |
| `SealBadge`             | Layout      | 🔜     |
| `SealBreadcrumb`        | Layout      | 🔜     |
| `SealCard`              | Layout      | 🔜     |
| `SealContainer`         | Layout      | 🔜     |
| `SealMenubar`           | Layout      | 🔜     |
| `SealResizable`         | Layout      | 🔜     |
| `SealSeparator`         | Layout      | 🔜     |
| `SealTable`             | Layout      | 🔜     |
| `SealTabs`              | Layout      | 🔜     |
| `SealDialog`            | Overlay     | 🔜     |
| `SealSheet`             | Overlay     | 🔜     |
| `SealPopover`           | Overlay     | 🔜     |
| `SealContextMenu`       | Overlay     | 🔜     |

### Using Components — Compound Component API

All Seal components use the **Compound Component** pattern. Sub-components pre-select the variant for a clean, discoverable API:

```tsx
// Use sub-components for the preferred API
<SealFilledButton.Primary onClick={handleClick}>Launch</SealFilledButton.Primary>
<SealAlert.Error title="Failed">Something went wrong.</SealAlert.Error>

// Use the root with an explicit variant prop for programmatic/dynamic use
<SealFilledButton variant={activeVariant}>Dynamic</SealFilledButton>
```

Available sub-components are discoverable via autocomplete (`SealFilledButton.`, `SealAlert.`, etc.) and documented in Storybook.

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

| Command                   | Purpose                          |
| ------------------------- | -------------------------------- |
| `npm run dev`             | Start dev server                 |
| `npm run storybook`       | Open Storybook on :6006          |
| `npm run test`            | Run unit tests (watch)           |
| `npm run test:coverage`   | Run tests with coverage report   |
| `npm run lint`            | ESLint — zero warnings           |
| `npm run format`          | Format all files with Prettier   |
| `npm run format:check`    | Check formatting without writing |
| `npm run build`           | Type-check and build             |
| `npm run build-storybook` | Build Storybook static site      |

---

## Quality & Tooling

### Formatting

[Prettier](https://prettier.io/) enforces consistent formatting across all files. Configuration lives in `.prettierrc`. The pre-commit hook applies Prettier automatically — never format manually.

### Linting

ESLint is configured with strict rules targeting the `src/` tree:

| Plugin                                              | Purpose                                               |
| --------------------------------------------------- | ----------------------------------------------------- |
| `typescript-eslint` (strict + stylistic)            | Full TypeScript type-safety                           |
| `eslint-plugin-react` + `eslint-plugin-react-hooks` | React best practices                                  |
| `eslint-plugin-jsx-a11y`                            | Accessibility                                         |
| `eslint-plugin-jsdoc`                               | JSDoc on all public APIs (`publicOnly: true`)         |
| `eslint-plugin-import`                              | Import ordering and no duplicates                     |
| `eslint-plugin-sonarjs`                             | Cognitive complexity ≤ 15, no duplicate strings       |
| `eslint-config-prettier`                            | Disables formatting rules that conflict with Prettier |

The `any` type is forbidden (`no-explicit-any` + `no-unsafe-*`). Zero warnings are tolerated.

### TypeScript

`tsconfig.app.json` enables the strictest set of compiler options:

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "forceConsistentCasingInFileNames": true
}
```

### Pre-commit Hooks

[Husky](https://typicode.github.io/husky/) runs two hooks on every commit:

- **pre-commit** — [lint-staged](https://github.com/lint-staged/lint-staged) runs ESLint + Prettier on staged `.ts/.tsx` files and Prettier on `.json/.md/.css` files.
- **commit-msg** — [commitlint](https://commitlint.js.org/) enforces [Conventional Commits](https://www.conventionalcommits.org/).

Valid commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `revert`.

### Test Coverage

Vitest is configured with V8 coverage. Thresholds are enforced at **80%** for lines, functions, branches, and statements. Coverage output: `text` (terminal), `lcov` (for SonarCloud), `html` (for local inspection).

### Versioning

[release-please](https://github.com/googleapis/release-please) automates versioning and changelog generation based on [Conventional Commits](https://www.conventionalcommits.org/).

On every push to `main`, the workflow inspects commits since the last release and opens (or updates) a release PR with the proposed version bump and CHANGELOG entry. The release PR stays open until the maintainer merges it — no release happens automatically.

On merge of the release PR, the git tag and GitHub Release are created automatically.

| Commit type                 | Version bump (pre-1.0) |
| --------------------------- | ---------------------- |
| `fix`                       | patch                  |
| `feat`                      | patch                  |
| `feat!` / `BREAKING CHANGE` | minor                  |

Workflow: `.github/workflows/release-please.yml` — config in `release-please-config.json`.

---

## CI/CD

### Chromatic

Component stories are published automatically to [Chromatic](https://www.chromatic.com/) on every push to `main` and on pull requests.

**Live Storybook:** https://69e814d684c5fea63427bc0d-txjsgwacii.chromatic.com/

Workflow: `.github/workflows/chromatic.yml` — uses `CHROMATIC_PROJECT_TOKEN` repository secret.

### SonarCloud

Every push to `main` and every pull request triggers a SonarCloud analysis that checks:

- Code quality (cognitive complexity, duplication, code smells)
- Test coverage (linked to LCOV report from `npm run test:coverage`)
- Security hotspots

Workflow: `.github/workflows/sonar.yml` — uses `SONAR_TOKEN` repository secret.

**Dashboard:** https://sonarcloud.io/project/overview?id=nayadev_seal_ui_react

### MCP Server

[`@storybook/addon-mcp`](https://storybook.js.org/addons/@storybook/addon-mcp) exposes Storybook as an MCP server so AI tools can read component stories and docs.

| Environment | URL                                                             |
| ----------- | --------------------------------------------------------------- |
| Local       | `http://localhost:6006/mcp`                                     |
| Published   | `https://69e814d684c5fea63427bc0d-txjsgwacii.chromatic.com/mcp` |

---

## Project Structure

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
├── .github/workflows/       # chromatic.yml, sonar.yml, release-please.yml
├── .husky/                  # pre-commit, commit-msg hooks
├── .editorconfig
├── .prettierrc
├── commitlint.config.js
├── eslint.config.js
├── sonar-project.properties
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.storybook.json
└── AGENTS.md                # Instructions for AI agents working on this repo
```

**Dependency direction:** `@sealui/tokens → tokens/ → theme/ → components/` — no layer may depend on a higher layer.

---

## Related Packages

| Package                                                         | Description                                                                          |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`seal_ui_tokens`](https://github.com/nayadev/seal_ui_tokens)   | Token source of truth — CSS variables, JS constants, Tailwind config, Flutter tokens |
| [`seal_ui_flutter`](https://github.com/nayadev/seal_ui_flutter) | Flutter implementation of SealUI                                                     |

---

## License

MIT
