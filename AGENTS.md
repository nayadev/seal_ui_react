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

`src/components/ui/` contains shadcn primitives installed via the shadcn CLI (`npx shadcn@latest add <component>`).
**Never edit files in `src/components/ui/` manually** — they are managed by the CLI.
**Never import from `src/components/ui/` in application code** — always use the `Seal*` wrappers.
To add a new primitive: `npx shadcn@latest add <component-name>`

After running `npx shadcn@latest add`, check the generated file against `npm run lint` — the CLI output may need minor import-order or type adjustments to satisfy the project's strict ESLint rules. Make those fixes directly in the generated file; they are not considered "manual edits" in the prohibited sense.

The project config is in `components.json` at the repo root. Never delete or hand-edit that file.

Seal UI components are **thin, token-driven wrappers** over shadcn/ui primitives:

- **Never use raw shadcn components directly in consuming apps** — always use the `Seal*` wrappers.
- When building a new Seal component, **compose an existing shadcn primitive** rather than building from scratch.
- Pass Seal design tokens (CSS variables) into the shadcn component's styling parameters.
- When a shadcn component doesn't support the styling needed, wrap it with a standard HTML element.

### shadcn → Seal Component Mapping

| shadcn primitive                              | Seal wrappers                                                                                                                |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `Button` (`src/components/ui/button.tsx`)     | `SealFilledButton`, `SealOutlineButton`, `SealTextButton`, `SealIconButton`, `SealFilledIconButton`, `SealOutlineIconButton` |
| `Alert` (`src/components/ui/alert.tsx`)       | `SealAlert`                                                                                                                  |
| None (custom CSS animation)                   | `SealBouncingDots`                                                                                                           |
| None (custom SVG animation)                   | `SealLoader`                                                                                                                 |
| Radix `@radix-ui/react-progress`              | `SealProgress`                                                                                                               |
| `sonner` (`src/components/ui/sonner.tsx`)     | `SealSonner` (container), `SealToast` (imperative API)                                                                       |
| `Input` (`src/components/ui/input.tsx`)       | `SealTextField`                                                                                                              |
| `Textarea` (`src/components/ui/textarea.tsx`) | `SealTextarea`                                                                                                               |
| `Checkbox` (`src/components/ui/checkbox.tsx`) | `SealCheckbox`                                                                                                               |

### Feedback — Implementation Notes

**SealAlert uses CSS `color-mix` for opacity-tinted surfaces**
Background (8% opacity) and border (35% opacity) are derived from the semantic color token using `color-mix(in srgb, var(--seal-semantic-*) 8%, transparent)`. This avoids hardcoded alpha values and stays token-driven. Applying opacity via `style` prop rather than Tailwind because Tailwind's `bg-opacity` utilities do not apply to arbitrary CSS variable values.

**SealAlert internal icon type**
The `VARIANT_ICON` map uses `React.ComponentType<React.SVGAttributes<SVGElement> & { size?: number }>` — a broader internal type than the public `SealIcon`. This allows passing `style` and `aria-hidden` to lucide icons without widening the public API. The `SealIcon` type (used in public props) remains `{ size?, className? }` only.

**SealAlert aria-live strategy**
`error` variant uses `aria-live="assertive"` to interrupt screen reader flow for critical failures. All other variants use `polite` to avoid disrupting ongoing announcements.

**SealProgress uses Radix primitive directly, not the shadcn wrapper**
The shadcn `Progress` component renders its `Indicator` internally with no way to customize color or add indeterminate animation from outside. `SealProgress` uses `@radix-ui/react-progress` directly for full control. The indeterminate animation uses `position: absolute` on the Indicator with the `@keyframes seal-progress-indeterminate` keyframe defined in `src/index.css`. The indicator is 40% wide and slides from `left: -40%` to `left: 100%`.

**SealProgress indeterminate detection**
`value === undefined || value === null` → indeterminate mode. Radix Root receives `value={null}` which sets `data-state="indeterminate"` and omits `aria-valuenow`. The determinate Indicator uses `translateX(-(100-value)%)` matching the shadcn reference.

**SealBouncingDots is shared between Feedback and Buttons**
`SealBouncingDots` lives in `src/components/feedback/` but is imported by `src/components/buttons/shared.tsx` for the button loading state. This cross-category dependency is intentional — it is the single source of truth for the bouncing animation. The internal `bouncing-dots.tsx` file that previously existed in `buttons/` has been removed.

**Loading animation keyframe lives in `src/index.css`**
The `@keyframes seal-bounce-dot` animation is defined globally in `src/index.css`. Any component using the bouncing dots animation relies on this keyframe being present in the stylesheet. Do not move or scope it.

**SealLoader uses SVG arc with CSS animation**
`SealLoader` renders a 270° SVG arc (¾ circle, matching Flutter's `_kSweep = math.pi * 1.5`) that spins via the `@keyframes seal-loader-spin` keyframe in `src/index.css`. The animation goes from `rotate(-90deg)` to `rotate(270deg)` so the arc starts at 12 o'clock. Sizes map to Flutter's `SealLoaderSize` enum: `small` = 16 px, `medium` = 24 px, `large` = 40 px. Stroke widths follow Flutter's reference constants (2.5 for small/medium, 3.0 for large). No shadcn primitive is used — the SVG and animation are fully custom.

**SealToast is an imperative API, not a React component**
`SealToast` is a plain object with static methods (`info`, `success`, `warning`, `error`, `custom`, `dismiss`). It wraps the `sonner` `toast` function with Seal token styles and semantic icons. Because it is not a React component, the Compound Component pattern does not apply — the static method surface (`SealToast.info()`, `SealToast.error()`, etc.) mirrors the intent of sub-component variants. Requires a `<SealSonner>` ancestor to render toasts.

**SealToast custom icon wrapping**
The `custom` method accepts a `SealIcon` component reference and wraps it in a `<span style={{ color, display: 'contents' }}>` to apply the accent color without widening the `SealIcon` prop contract (which only accepts `size` and `className`). `display: contents` ensures the span does not affect layout.

**SealSonner reads ThemeContext to synchronise sonner theme**
`SealSonner` uses `React.useContext(ThemeContext)` to read the active SealUI mode (`dark` or `light`) and passes it to sonner's `theme` prop. Falls back to `"dark"` when no `ThemeProvider` ancestor is present, matching the library's primary dark experience.

**SealSonner is a regular function component — no Compound Component pattern**
`SealSonner` is a container (one variant, no sub-components). The Compound Component pattern is not applied; the API is a single component with `position`, `offset`, and `visibleToasts` props.

### Inputs — Implementation Notes

**SealTextField has no variants — no Compound Component pattern**
`SealTextField` is a single-variant input with internal state (obscure toggle). Like `SealSonner`, the Compound Component pattern is not applied. It is exported as a `React.forwardRef` component with `displayName = 'SealTextField'`.

**SealTextField uses `React.forwardRef` for form library compatibility**
The `ref` is forwarded to the underlying `<input>` element so libraries like React Hook Form can attach refs directly. External refs reach the native input, not the wrapper div.

**SealTextField replaces native `onChange` with a string callback**
The component extends `Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>` and provides `onChange?: (value: string) => void` — mirroring Flutter's `ValueChanged<String>`. The native event is handled internally.

**SealTextField uses `React.useId()` for label–input association**
When no external `id` is provided, an internal id from `React.useId()` is generated and shared between `<label htmlFor>` and `<input id>`. Providing an external `id` overrides the generated one.

**SealTextField controls `type` when `obscureText` is active**
The external `type` prop is stripped from `restProps` and only applied when `obscureText` is `false`. When `obscureText` is `true`, the component manages `type` between `"password"` and `"text"` based on internal toggle state. This mirrors Flutter's `_isObscured` state from `didUpdateWidget`.

**Password inputs are not role="textbox" in ARIA**
`type="password"` inputs are intentionally excluded from the accessible textbox role by ARIA. Tests for password fields must use `screen.getByLabelText(label)` or `document.querySelector('input[type="password"]')` instead of `getByRole('textbox')`.

**Icon-adjusted padding uses CSS `calc()` with token variables**
When `leadingIcon` or `trailingIcon` is present, horizontal padding is widened via inline `style` using `calc(var(--seal-dimension-sm) + 20px + var(--seal-dimension-xs))`. This is defined as the `ICON_SLOT_PADDING` constant. Inline style takes precedence over Tailwind's `px-3`, so there's no class conflict.

**Toggle button uses `<button type="button">`**
The visibility toggle is a proper `<button>` element (not a `<span>`) to ensure keyboard accessibility. `type="button"` prevents accidental form submission. The button label is "Show password" when text is hidden, and "Hide password" when text is visible.

**SealCheckbox has no variants — no Compound Component pattern**
`SealCheckbox` is a single-variant input. The Compound Component pattern is not applied. It is exported as a `React.forwardRef` component with `displayName = 'SealCheckbox'`.

**SealCheckbox narrows the Radix `checked` and `onCheckedChange` types**
The public props omit `'indeterminate'` from `checked` (accepting only `boolean`) and simplify `onCheckedChange` to `(checked: boolean) => void`, matching the Flutter `ValueChanged<bool>` API. The `'indeterminate'` case is handled internally by the component and swallowed.

**SealCheckbox uses `React.useId()` for label–input association**
When no external `id` is provided, an internal id from `React.useId()` is generated and shared between `<label htmlFor>` and the Radix Checkbox root `id`. Providing an external `id` overrides the generated one.

**SealCheckbox top-aligns the control with `mt-xxxs`**
When `sublabel` is present, the checkbox sits next to a multi-line label block. `mt-[var(--seal-dimension-xxxs)]` nudges the control down to optically align with the first line of the label stack rather than centering against the full block height.

---

## Compound Component Pattern

All Seal components follow the **Compound Component** pattern using `Object.assign`. This aligns with shadcn/ui and Radix UI conventions, and gives consuming code a clean, discoverable API.

### Standard Implementation

```tsx
// 1. Root impl function receives all props including `variant`
function SealFilledButtonImpl({ variant = 'primary', ...props }: SealFilledButtonProps) {
  // ...
}

// 2. Sub-components fix the variant
type BaseProps = Omit<SealFilledButtonProps, 'variant' | 'color' | 'gradient'>
const Primary = (props: BaseProps) => <SealFilledButtonImpl variant="primary" {...props} />
Primary.displayName = 'SealFilledButton.Primary'

const Custom = (props: Omit<SealFilledButtonProps, 'variant'>) => (
  <SealFilledButtonImpl variant="custom" {...props} />
)
Custom.displayName = 'SealFilledButton.Custom'

// 3. Export via Object.assign
export const SealFilledButton = Object.assign(SealFilledButtonImpl, {
  Primary,
  Accent,
  AccentSecondary,
  Gradient,
  AccentGradient,
  Custom,
})
```

### Sub-Component Naming

| Variant prop value | Sub-component name | Notes                          |
| ------------------ | ------------------ | ------------------------------ |
| `primary`          | `.Primary`         |                                |
| `accent`           | `.Accent`          |                                |
| `accent-secondary` | `.AccentSecondary` |                                |
| `gradient`         | `.Gradient`        |                                |
| `accent-gradient`  | `.AccentGradient`  |                                |
| `custom`           | `.Custom`          | Keeps `color`/`gradient` props |

For `SealAlert`, sub-components avoid JS global conflicts:

- Internal function: `InfoAlert` (not `Info` — lucide exports an `Info` icon)
- Internal function: `ErrorAlert` (not `Error` — conflicts with the JS built-in)
- Exported as: `SealAlert.Info`, `SealAlert.Error`

### displayName Requirements

Every sub-component must set `displayName` so React DevTools shows the full path:

```tsx
Primary.displayName = 'SealFilledButton.Primary'
```

### BaseProps / CustomProps Pattern

Non-`custom` sub-components should strip `variant`, `color`, and `gradient` from their props:

```ts
type BaseProps = Omit<SealFilledButtonProps, 'variant' | 'color' | 'gradient'>
```

The `Custom` sub-component keeps `color` and `gradient` but strips `variant`:

```ts
type CustomProps = Omit<SealFilledButtonProps, 'variant'>
```

### Consuming the API

```tsx
// ✅ Preferred — compound sub-component
<SealFilledButton.Primary onClick={handleClick}>Launch</SealFilledButton.Primary>
<SealFilledButton.Gradient icon={Rocket}>Launch</SealFilledButton.Gradient>
<SealFilledButton.Custom color="#e53935">Danger</SealFilledButton.Custom>

// ✅ Also valid — root with explicit variant (programmatic/dynamic use)
<SealFilledButton variant={activeVariant}>Dynamic</SealFilledButton>

// ❌ Wrong — raw shadcn Button
<Button variant="outline">Click</Button>
```

### JSDoc Placement

JSDoc belongs on the exported `const`, not the impl function (which is private):

```tsx
/**
 * Token-driven filled button.
 *
 * Use sub-components for a clean API: `SealFilledButton.Primary`, `.Accent`, etc.
 * Use the root with an explicit `variant` prop for programmatic/dynamic rendering.
 */
export const SealFilledButton = Object.assign(SealFilledButtonImpl, { ... })
```

### Story Pattern for Compound Components

When the component in `meta` is a sub-component, every `Story` must include `args` to satisfy TypeScript's required-prop checks. Never hardcode a prop in `render` that is also present in `args` — it causes TS2783.

```tsx
const meta = {
  component: SealFilledButton.Primary, // sub-component is the autodocs subject
} satisfies Meta<typeof SealFilledButton.Primary>

export const Gradient: Story = {
  args: { children: 'Launch' }, // required props here
  render: (args) => <SealFilledButton.Gradient {...args} />, // spread only
}
```

### Icon Props in Stories — argTypes mapping

Storybook cannot serialize React component references (e.g. forwardRef icons from lucide-react) in `args` — they appear as `{ $$typeof: Symbol(react.forward_ref), ... }` in controls and the source view. This affects both the individual story source view AND the Docs page autodocs preview.

**The only reliable fix**: hide `icon` from controls, hardcode it directly in each `render` function, and keep it in `args` only to satisfy TypeScript's required-prop check. Additionally, every story must declare `parameters.docs.source.code` explicitly — without it, Storybook shows the full story object (with `args` and `render`) instead of just the JSX.

```tsx
const meta = {
  component: SealFilledIconButton.Primary,
  argTypes: {
    // icon is a component reference — hide from controls to avoid serialization issues
    icon: { table: { disable: true } },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    tooltip: { control: 'text' },
  },
} satisfies Meta<typeof SealFilledIconButton.Primary>

// Variant stories — fully static render; Storybook shows clean JSX
export const Primary: Story = {
  args: { icon: Rocket, tooltip: 'Launch' }, // satisfies TypeScript; not used by render
  parameters: {
    docs: { source: { code: `<SealFilledIconButton.Primary icon={Rocket} tooltip="Launch" />` } },
  },
  render: () => <SealFilledIconButton.Primary icon={Rocket} tooltip="Launch" />,
}

// State stories — also static
export const Loading: Story = {
  args: { icon: Rocket, tooltip: 'Loading', loading: true },
  parameters: {
    docs: {
      source: { code: `<SealFilledIconButton.Primary icon={Rocket} tooltip="Loading" loading />` },
    },
  },
  render: () => <SealFilledIconButton.Primary icon={Rocket} tooltip="Loading" loading />,
}

// AllVariants — uses destructured args for interactive loading/disabled controls
export const AllVariants: Story = {
  args: { icon: Rocket, loading: false, disabled: false },
  parameters: {
    docs: {
      source: {
        code: `<SealFilledIconButton.Primary icon={Rocket} tooltip="Primary" />
<SealFilledIconButton.Accent icon={Bookmark} tooltip="Accent" />`,
      },
    },
  },
  render: ({ loading, disabled }) => (
    <div className="flex gap-4 items-center">
      <SealFilledIconButton.Primary
        icon={Rocket}
        tooltip="Primary"
        loading={loading ?? false}
        disabled={disabled ?? false}
      />
      {/* ... */}
    </div>
  ),
}
```

Key rules:

- **Never put `icon` in `args` and then spread `{...args}` into JSX** — Storybook serializes the resolved component reference regardless of whether a `render` function is present.
- **`icon: { table: { disable: true } }`** — hides the icon control from the Controls panel.
- **`parameters.docs.source.code`** — must be set explicitly on every story with icon props; without it, Storybook shows the full story object definition instead of clean JSX.
- **`loading ?? false` / `disabled ?? false`** — required because `exactOptionalPropertyTypes: true` rejects `boolean | undefined` where `boolean` is expected.

---

### Buttons — Implementation Notes

**Icon props accept a generic component reference, not a library-specific type:**

````tsx
// ✅ correct — library-agnostic
icon?: SealIcon // React.ComponentType<{ size?: number; className?: string }>

---

### Buttons — Implementation Notes

**Icon props accept a generic component reference, not a library-specific type:**

```tsx
// ✅ correct — library-agnostic
icon?: SealIcon // React.ComponentType<{ size?: number; className?: string }>

// ❌ wrong — coupled to lucide-react
icon?: LucideIcon
````

Lucide React is the default icon library used in stories and examples, but component APIs must never reference it in type signatures.

All `icon` props accept a `SealIcon` component reference, not rendered JSX. The component controls icon sizing via the `constantButtonIconSize` token. This mirrors how Flutter passes `IconData` (the type, not an instance).

```tsx
// ✅ correct
<SealFilledButton icon={Rocket}>Launch</SealFilledButton>

// ❌ wrong
<SealFilledButton icon={<Rocket size={16} />}>Launch</SealFilledButton>
```

**Gradient backgrounds require inline `style`**
Tailwind's `bg-[...]` maps to `background-color`, which does not accept CSS gradient values. Gradient variants (e.g. `var(--seal-gradient-primary)`) must be applied via `style={{ background: '...' }}`.

**Hover / active states use opacity**
All button variants use `hover:opacity-[0.85] active:opacity-[0.75]` for interaction feedback instead of per-color hover overrides. This matches the Flutter implementation's `withValues(alpha: 0.85)` approach and keeps the code free of per-token hover classes.

**Loading state preserves button dimensions**
When `loading` is `true`, the label and icon are rendered as an invisible overlay (`aria-hidden + invisible` class) so the button keeps its natural size. The spinner is absolutely positioned on top. This mirrors Flutter's `maintainSize` stack.

**Component file structure**
Components are co-located with their tests and stories in `src/components/<category>/<ComponentName>/`. Stories are NOT in a separate `src/stories/` tree — both live in the component folder.

---

## Naming Conventions

| What                   | Convention                              | Example                              |
| ---------------------- | --------------------------------------- | ------------------------------------ |
| Component files        | PascalCase                              | `SealFilledButton.tsx`               |
| Test files             | PascalCase                              | `SealFilledButton.test.tsx`          |
| Story files            | PascalCase                              | `SealFilledButton.stories.tsx`       |
| Component classes      | PascalCase with `Seal` prefix           | `SealFilledButton`                   |
| Type / interface names | PascalCase                              | `SealFilledButtonProps`, `ThemeName` |
| Hooks                  | camelCase                               | `useTheme.ts`, `useMediaQuery.ts`    |
| Utilities and configs  | camelCase                               | `themeConfig.ts`, `cn.ts`            |
| Theme files            | snake_case matching theme name          | `deep_ocean.ts`                      |
| `src/components/ui/`   | shadcn CLI convention (lowercase/kebab) | `button.tsx`, `input-otp.tsx`        |

**`src/components/ui/` is the only exception** — these files are managed by the shadcn CLI and must never be renamed.

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

1. **Create the component file** in `src/components/<category>/Seal<n>.tsx`.
   - Always wrap the nearest shadcn primitive — check `@/components/ui/` first.
   - Use CSS variables for all visual properties.
   - Add JSDoc to the component and all public props.

2. **Export from the barrel** `src/index.ts` — keep alphabetical order within each category.

3. **Write tests** in `ssrc/components/<category>/Seal<n>.test.tsx`.
   - Use `renderWithTheme()` helper (wraps in ThemeProvider).
   - Test: rendering, interaction, disabled state, variants.

4. **Add a Storybook story** `src/stories/<Category>/Seal<n>.stories.tsx`.
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
