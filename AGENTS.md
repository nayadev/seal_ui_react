# SealUI React — AI Agent Instructions

> For deep-dive implementation notes, patterns, and examples, see [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md).

## Project Overview

SealUI React is a **token-driven React design system** built on top of [shadcn/ui](https://ui.shadcn.com/). Reusable across applications — **not** a standalone app. **Dark mode is the primary experience**, but light themes must always be supported.

---

## Architecture

```
@sealui/tokens → src/tokens/ → src/theme/ → src/components/
```

Dependency direction is strictly enforced — no layer may depend on a higher layer.

| Layer          | Purpose                                   | Path              |
| -------------- | ----------------------------------------- | ----------------- |
| **tokens**     | Re-exports from `@sealui/tokens`          | `src/tokens/`     |
| **theme**      | ThemeProvider, useTheme, theme config     | `src/theme/`      |
| **components** | Seal\* wrappers over shadcn/ui primitives | `src/components/` |

---

## Token System

`@sealui/tokens` is the **single source of truth**. Never hardcode colors, spacing, font sizes, or radii.

| How              | When to use                  | Example                                        |
| ---------------- | ---------------------------- | ---------------------------------------------- |
| CSS variables    | Component styles (preferred) | `var(--seal-surface-surface)`                  |
| JS/TS constants  | Logic, not styles            | `import { dimensionMd } from '@sealui/tokens'` |
| Tailwind classes | Utility classes via config   | `className="rounded-md text-sm"`               |

Token categories: `--seal-brand-*`, `--seal-surface-*`, `--seal-text-*`, `--seal-semantic-*`, `--seal-gradient-*`, `--seal-dimension-*`, `--seal-radius-*`, `--seal-style-*-*`

---

## Theme System

`ThemeProvider` applies the active theme's CSS class to `<html>`:

```tsx
<ThemeProvider theme="nebula" mode="dark">
  <App />
</ThemeProvider>
```

| Theme        | Dark class        | Light class        |
| ------------ | ----------------- | ------------------ |
| `nebula`     | `nebula-dark`     | `nebula-light`     |
| `arctic`     | `arctic-dark`     | `arctic-light`     |
| `deep_ocean` | `deep-ocean-dark` | `deep-ocean-light` |
| `terminal`   | `terminal-dark`   | `terminal-light`   |

Use `useTheme()` hook for `{ theme, mode, setTheme, setMode }`. Never read `data-theme` from the DOM directly. Never apply theme classes manually.

---

## shadcn/ui Integration

- `src/components/ui/` — shadcn primitives. **Never edit manually.** Add via `npx shadcn@latest add <component>`.
- After adding, run `npm run lint` and fix any import-order/type issues (not considered manual edits).
- `components.json` — never delete or hand-edit.
- **Always use `Seal*` wrappers** — never import from `src/components/ui/` in app code.
- When building a new Seal component, compose an existing shadcn primitive first.

### shadcn → Seal Component Mapping

| shadcn primitive                 | Seal wrapper(s)                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `Button`                         | `SealFilledButton`, `SealOutlineButton`, `SealTextButton`, `SealIconButton`, `SealFilledIconButton`, `SealOutlineIconButton` |
| `Alert`                          | `SealAlert`                                                                                                                  |
| None (custom CSS animation)      | `SealBouncingDots`                                                                                                           |
| None (custom SVG animation)      | `SealLoader`                                                                                                                 |
| Radix `@radix-ui/react-progress` | `SealProgress`                                                                                                               |
| `sonner`                         | `SealSonner` (container), `SealToast` (imperative API)                                                                       |
| `Input`                          | `SealTextField`                                                                                                              |
| `Textarea`                       | `SealTextarea`                                                                                                               |
| `Checkbox`                       | `SealCheckbox`                                                                                                               |
| `RadioGroup`                     | `SealRadioGroup`                                                                                                             |
| `Select`                         | `SealSelect`                                                                                                                 |
| Radix `@radix-ui/react-slider`   | `SealSlider`                                                                                                                 |
| `Switch`                         | `SealSwitch`                                                                                                                 |
| `Calendar` (react-day-picker)    | `SealCalendar` (`.Single`, `.Multiple`, `.Range`)                                                                            |
| `Calendar` + `Popover`           | `SealDatePicker` (`.Single`, `.Range`)                                                                                       |
| None (custom implementation)     | `SealTimePicker` (24h default), `SealTimePicker.Period` (12h AM/PM)                                                          |

---

## Compound Component Pattern

All multi-variant Seal components use `Object.assign` for sub-components:

```tsx
export const SealFilledButton = Object.assign(SealFilledButtonImpl, {
  Primary,
  Accent,
  AccentSecondary,
  Gradient,
  AccentGradient,
  Custom,
})
```

Usage:

```tsx
<SealFilledButton.Primary>Launch</SealFilledButton.Primary>   // preferred
<SealFilledButton variant="primary">Launch</SealFilledButton> // programmatic
```

- Every sub-component must set `displayName`: `Primary.displayName = 'SealFilledButton.Primary'`
- JSDoc goes on the exported `const`, not the impl function.
- Single-variant components (`SealTextField`, `SealCheckbox`, `SealSonner`) do **not** use this pattern.

See [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) for the full implementation pattern, sub-component naming table, and Storybook story patterns.

---

## Naming Conventions

| What                   | Convention                              | Example                              |
| ---------------------- | --------------------------------------- | ------------------------------------ |
| Component files        | PascalCase                              | `SealFilledButton.tsx`               |
| Test files             | PascalCase                              | `SealFilledButton.test.tsx`          |
| Story files            | PascalCase                              | `SealFilledButton.stories.tsx`       |
| Component classes      | PascalCase with `Seal` prefix           | `SealFilledButton`                   |
| Type / interface names | PascalCase                              | `SealFilledButtonProps`, `ThemeName` |
| Hooks                  | camelCase                               | `useTheme.ts`                        |
| Utilities and configs  | camelCase                               | `themeConfig.ts`, `cn.ts`            |
| Theme files            | snake_case matching theme name          | `deep_ocean.ts`                      |
| `src/components/ui/`   | shadcn CLI convention (lowercase/kebab) | `button.tsx`                         |

---

## Coding Standards

- **TypeScript strict** — `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`. No `any`.
- **Zero lint warnings** — `eslint --max-warnings 0`.
- **Type imports** — `import type { ThemeName } from './ThemeProvider'`.
- **No hardcoded values** — CSS variables for styles, JS constants for logic.
- **Early returns** over nested conditionals.
- **JSDoc required** on all exported components, interfaces, hooks, and utilities (`publicOnly: true`).
- **Comments only for non-obvious why**, never what.
- **Prettier** handles formatting — never format manually.
- **Conventional Commits** — validated by commitlint.
- **Coverage threshold** — 80% lines, functions, branches, statements.
- **Secrets** — never commit `.env` files; use GitHub Secrets.

---

## New Component Checklist

1. **Create** `src/components/<category>/Seal<Name>/Seal<Name>.tsx` — wrap nearest shadcn primitive, use CSS variables, add JSDoc.
2. **Export** from `src/index.ts` — keep alphabetical order within category.
3. **Test** in `src/components/<category>/Seal<Name>/Seal<Name>.test.tsx` — use `renderWithTheme()`.
4. **Story** in `src/components/<category>/Seal<Name>/Seal<Name>.stories.tsx` — `autodocs`, `argTypes` for all props.
5. **Format** — `npm run format` to apply Prettier.
6. **Validate** — `npm run lint` + `npm run test -- --run` + `npm run build`.

---

## Project Commands

| Command                    | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| `npm run dev`              | Start Vite dev server                         |
| `npm run build`            | TypeScript check + Vite production build      |
| `npm run lint`             | ESLint strict — zero warnings                 |
| `npm run format`           | Prettier — format all files                   |
| `npm run format:check`     | Prettier — check formatting without writing   |
| `npm run test`             | Vitest in watch mode                          |
| `npm run test:coverage`    | Vitest with coverage report                   |
| `npm run test:coverage:ci` | Vitest coverage — CI mode (unit project only) |
| `npm run storybook`        | Storybook dev server on :6006                 |
| `npm run build-storybook`  | Build Storybook static site                   |
