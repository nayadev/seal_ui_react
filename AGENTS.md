# SealUI React — AI Agent Instructions

## Project Overview

SealUI React is a **token-driven React design system** built on top of [shadcn/ui](https://ui.shadcn.com/). It is designed to be reusable across multiple applications — it is **not** a standalone app.

Each theme has its own distinct visual identity — from cosmic nebulae to vintage terminals — united by subtle gradients and a modern developer tool aesthetic. The feel is **modern, minimal, elegant, slightly futuristic, and professional**.

**Dark mode is the primary experience**, but a light theme must always be supported.

---

## Architecture

The codebase follows a strict **layered architecture**:

```
@sealui/tokens → src/tokens/ → src/theme/ → src/components/
```

**Dependency direction is strictly enforced — no layer may depend on a higher layer.**

| Layer          | Purpose                                   | Path              |
| -------------- | ----------------------------------------- | ----------------- |
| **tokens**     | Re-exports from `@sealui/tokens`          | `src/tokens/`     |
| **theme**      | ThemeProvider, useTheme, theme config     | `src/theme/`      |
| **components** | Seal\* wrappers over shadcn/ui primitives | `src/components/` |

---

## Token System

`@sealui/tokens` is the **single source of truth** for all raw values. Never hardcode colors, spacing, font sizes, or radii — always reference a named token.

### Three Ways to Consume Tokens

**1. CSS variables (preferred in component styles):**

```tsx
// ✅ Good
<div style={{ background: 'var(--seal-surface-surface)', color: 'var(--seal-text-primary)' }} />

// ✅ Good — Tailwind arbitrary value
<div className="bg-[var(--seal-surface-surface)]" />

// ❌ Bad — hardcoded value
<div style={{ background: '#1a1a2e' }} />
```

**2. TypeScript/JS constants (for logic, not styles):**

```ts
import { dimensionMd, stateDisabledOpacity, styleBody } from '@sealui/tokens'

// ✅ Good
const GAP = dimensionMd // '16px'

// ❌ Bad
const GAP = '16px'
```

**3. Tailwind (via sealTokensTailwind from @sealui/tokens/tailwind):**

```ts
// tailwind.config.ts already extends with seal tokens — use Tailwind classes directly
<button className="rounded-md text-sm font-medium" />
```

### Available Token Categories

| Category           | CSS prefix                                            | Example                       |
| ------------------ | ----------------------------------------------------- | ----------------------------- |
| Colors (per theme) | `--seal-brand-*`, `--seal-surface-*`, `--seal-text-*` | `--seal-brand-primary`        |
| Semantic           | `--seal-semantic-*`                                   | `--seal-semantic-error`       |
| Gradients          | `--seal-gradient-*`                                   | `--seal-gradient-primary`     |
| Dimensions         | `--seal-dimension-*`                                  | `--seal-dimension-md`         |
| Radius             | `--seal-radius-*`                                     | `--seal-radius-md`            |
| Typography         | `--seal-style-*-*`                                    | `--seal-style-body-font-size` |

---

## Theme System

### ThemeProvider

`ThemeProvider` applies the active theme's CSS class to `<html>`, making all `--seal-*` variables available:

```tsx
import { ThemeProvider } from '@sealui/react'

// Default: nebula dark
;<ThemeProvider theme="nebula" mode="dark">
  <App />
</ThemeProvider>
```

### useTheme

```tsx
import { useTheme } from '@sealui/react'

function Component() {
  const { theme, mode, setTheme, setMode } = useTheme()

  // Always use context — never read data-theme from the DOM directly
}
```

### Themes × Modes

| Theme        | Dark CSS class    | Light CSS class    |
| ------------ | ----------------- | ------------------ |
| `nebula`     | `nebula-dark`     | `nebula-light`     |
| `arctic`     | `arctic-dark`     | `arctic-light`     |
| `deep_ocean` | `deep-ocean-dark` | `deep-ocean-light` |
| `terminal`   | `terminal-dark`   | `terminal-light`   |

ThemeProvider manages the active class on `<html>` automatically. Never apply theme classes manually.

---

## shadcn/ui Integration

Seal UI components are **thin, token-driven wrappers** over shadcn/ui primitives:

- **Never use raw shadcn components directly in consuming apps** — always use the `Seal*` wrappers.
- When building a new Seal component, **compose an existing shadcn primitive** rather than building from scratch.
- Pass Seal design tokens (CSS variables) into the shadcn component's styling parameters.
- When a shadcn component doesn't support the styling needed, wrap it with a standard HTML element.

> The complete shadcn → Seal mapping table will be populated as components are built in subsequent sessions.

---

## Naming Conventions

- All public components use the `Seal` prefix: `SealButton`, `SealTextField`, `SealCard`.
- File names use kebab-case: `seal-button.tsx`, `seal-text-field.tsx`.
- Story files: `SealButton.stories.tsx` (PascalCase prefix).
- Theme files: `deep_ocean.ts` (snake_case matching the theme name).
- Type exports: PascalCase — `ThemeName`, `ThemeMode`, `ThemeContextValue`.

---

## Coding Standards

**Secrets are managed via GitHub Secrets** — never commit `.env` files or hardcode secrets.

- CI/CD: GitHub Actions uses GitHub Secrets directly (`SONAR_TOKEN`, `CHROMATIC_PROJECT_TOKEN`)
- If secrets management tooling is needed in the future, evaluate Infisical

**Code quality is enforced automatically:**

- ESLint with `--max-warnings 0` — zero warnings tolerated
- `any` type is forbidden (`no-explicit-any` + `no-unsafe-*`)
- Cognitive complexity capped at 15 (`sonarjs/cognitive-complexity`)
- Public APIs require JSDoc documenting behavior and intent, not the obvious (`jsdoc/require-jsdoc` with `publicOnly: true`)
- Private implementation details do not require documentation
- All code and documentation must be written in English
- Prettier handles formatting — never format manually
- Commits must follow Conventional Commits and are validated by commitlint
- Test coverage threshold: 80% lines, functions, branches, statements
- The project is configured to pass SonarQube/SonarCloud analysis without issues

### TypeScript

- Strict mode is enforced (`strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`).
- Zero lint warnings allowed (`eslint --max-warnings 0`).
- Always use `type` imports for type-only symbols: `import type { ThemeName } from './ThemeProvider'`.
- No `any` — use proper types or `unknown`.

### Tokens

- No raw hex colors, pixel values, or font sizes in component code.
- Use CSS variables for runtime-switchable values: `var(--seal-brand-primary)`.
- Use JS constants for non-visual logic: `stateDisabledOpacity`.

### Early Return

```tsx
// ✅ Good
function Component({ disabled }: Props) {
  if (disabled) return null
  return <div>...</div>
}

// ❌ Bad
function Component({ disabled }: Props) {
  if (!disabled) {
    return <div>...</div>
  }
  return null
}
```

### Comments

Write comments only when the **why** is non-obvious. Never comment what the code does.

```tsx
// ✅ Good — explains a subtle constraint
// Fall back to nebula-dark when no ThemeProvider ancestor is found,
// since dark is the primary experience.
const theme = context ?? defaultNebulaTokens

// ❌ Bad — states the obvious
// Set background color
style.background = 'var(--seal-surface-surface)'
```

### JSDoc

All exported components, interfaces, hooks, and utility functions must have JSDoc. Private implementation details do not require documentation. The rule is enforced via `eslint-plugin-jsdoc` with `publicOnly: true`.

All public APIs must have JSDoc:

````tsx
/**
 * Applies the selected SealUI theme and mode to the document root,
 * making all `--seal-*` CSS variables available to the subtree.
 *
 * ```tsx
 * <ThemeProvider theme="nebula" mode="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ theme, mode, children }: ThemeProviderProps) { ... }
````

---

## New Component Checklist

When adding a new component to SealUI React, follow these steps in order:

1. **Create the component file** in `src/components/<category>/seal-<name>.tsx`.
   - Always wrap the nearest shadcn primitive — check `@/components/ui/` first.
   - Use CSS variables for all visual properties.
   - Add JSDoc to the component and all public props.

2. **Export from the barrel** `src/index.ts` — keep alphabetical order within each category.

3. **Write tests** in `src/components/<category>/seal-<name>.test.tsx`.
   - Use `renderWithTheme()` helper (wraps in ThemeProvider).
   - Test: rendering, interaction, disabled state, variants.

4. **Add a Storybook story** `src/stories/<Category>/Seal<Name>.stories.tsx`.
   - Use `autodocs`.
   - Add `argTypes` for all public props.
   - Include at least: Default, Variants, Disabled states.
   - The ThemeProvider decorator is applied globally — no need to add it per story.

5. **Run validation:**
   - `npm run lint` — zero warnings.
   - `npm run test -- --run` — all tests pass.
   - `npm run build` — compiles without errors.

---

## Storybook Guidelines

### Organization

Stories live in `src/stories/<Category>/Seal<Name>.stories.tsx`. Categories mirror the component structure: `Foundation`, `Buttons`, `Inputs`, `Feedback`, `Overlay`, `Navigation`, `Data Display`, `Layout`.

### Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SealButton } from '@/components/buttons/seal-button'

const meta: Meta<typeof SealButton> = {
  title: 'Buttons/SealButton',
  component: SealButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'accent', 'outline'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Button' } }
```

### Theme Toolbar

The global toolbar (Theme + Mode) is wired in `preview.tsx`. Stories automatically re-render when the user switches theme or mode. No per-story setup needed.

---

## Testing Guidelines

### Helper

Create a `renderWithTheme` helper in `test/utils.tsx`:

```tsx
import { render } from '@testing-library/react'
import { ThemeProvider } from '@/theme/ThemeProvider'

export function renderWithTheme(ui: React.ReactElement) {
  return render(
    <ThemeProvider theme="nebula" mode="dark">
      {ui}
    </ThemeProvider>,
  )
}
```

### Coverage per Component

| Scenario                                | Required            |
| --------------------------------------- | ------------------- |
| Renders without error                   | ✅                  |
| Applies correct CSS variable references | ✅                  |
| Click / change interaction              | ✅ (if interactive) |
| Disabled state                          | ✅ (if applicable)  |
| Accessible name / role                  | ✅                  |

---

## Project Commands

| Command                   | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | Start Vite dev server                    |
| `npm run build`           | TypeScript check + Vite production build |
| `npm run lint`            | ESLint strict — zero warnings            |
| `npm run test`            | Vitest in watch mode                     |
| `npm run test:coverage`   | Vitest with coverage report              |
| `npm run storybook`       | Storybook dev server on :6006            |
| `npm run build-storybook` | Build Storybook static site              |

---

## Key Dependencies

| Package                               | Purpose                                            |
| ------------------------------------- | -------------------------------------------------- |
| `@sealui/tokens`                      | Single source of truth for all design token values |
| `react` + `react-dom`                 | UI framework                                       |
| `@vitejs/plugin-react`                | Vite React plugin                                  |
| `@tailwindcss/vite`                   | Tailwind CSS v4 via Vite plugin                    |
| `tailwindcss`                         | Utility-first CSS framework                        |
| `clsx` + `tailwind-merge`             | Conditional className utilities                    |
| `class-variance-authority`            | Variant-driven component styling                   |
| `@radix-ui/react-slot`                | Polymorphic component primitive                    |
| `lucide-react`                        | Icon library                                       |
| `storybook` + `@storybook/react-vite` | Component catalog                                  |
| `vitest` + `@testing-library/react`   | Unit testing                                       |
| `typescript-eslint`                   | Strict TypeScript linting                          |
