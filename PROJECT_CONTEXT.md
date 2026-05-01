# SealUI React — Project Context

Detailed implementation notes, patterns, and guidelines for contributors.
For the essential rules and architecture, see [AGENTS.md](./AGENTS.md).

---

## Component Implementation Notes

### Feedback

**SealAlert uses CSS `color-mix` for opacity-tinted surfaces**
Background (8% opacity) and border (35% opacity) are derived from the semantic color token using `color-mix(in srgb, var(--seal-semantic-*) 8%, transparent)`. Opacity is applied via `style` prop, not Tailwind — Tailwind's `bg-opacity` utilities do not work with arbitrary CSS variable values.

**SealAlert internal icon type**
The `VARIANT_ICON` map uses `React.ComponentType<React.SVGAttributes<SVGElement> & { size?: number }>` — broader than the public `SealIcon`. This allows passing `style` and `aria-hidden` to lucide icons without widening the public API.

**SealAlert aria-live strategy**
`error` variant uses `aria-live="assertive"`. All other variants use `"polite"`.

**SealAlert sub-component naming**
Internal functions are `InfoAlert` / `ErrorAlert` (not `Info` / `Error`) to avoid conflicts with the lucide `Info` export and the JS built-in `Error`. Exported as `SealAlert.Info` and `SealAlert.Error`.

**SealProgress uses Radix primitive directly, not the shadcn wrapper**
The shadcn `Progress` component renders its `Indicator` internally with no way to customise color or add indeterminate animation. `SealProgress` uses `@radix-ui/react-progress` directly. The indeterminate animation uses `position: absolute` on the Indicator with the `@keyframes seal-progress-indeterminate` keyframe in `src/index.css`. The indicator is 40% wide and slides from `left: -40%` to `left: 100%`.

**SealProgress indeterminate detection**
`value === undefined || value === null` → indeterminate mode. Radix Root receives `value={null}` which sets `data-state="indeterminate"` and omits `aria-valuenow`. The determinate Indicator uses `translateX(-(100-value)%)`.

**SealBouncingDots is shared between Feedback and Buttons**
Lives in `src/components/feedback/` but is imported by `src/components/buttons/shared.tsx`. This cross-category dependency is intentional — single source of truth for the bouncing animation.

**Global keyframes live in `src/index.css`**

- `@keyframes seal-bounce-dot` — used by `SealBouncingDots`
- `@keyframes seal-loader-spin` — used by `SealLoader`
- `@keyframes seal-progress-indeterminate` — used by `SealProgress`
  Do not move or scope these.

**SealLoader uses SVG arc with CSS animation**
Renders a 270° SVG arc (¾ circle, matching Flutter's `_kSweep = math.pi * 1.5`) spinning via `@keyframes seal-loader-spin`. Animation goes from `rotate(-90deg)` to `rotate(270deg)` so the arc starts at 12 o'clock. Sizes: `small` = 16 px, `medium` = 24 px, `large` = 40 px. Stroke widths: 2.5 (small/medium), 3.0 (large). No shadcn primitive used.

**SealToast is an imperative API, not a React component**
Plain object with static methods (`info`, `success`, `warning`, `error`, `custom`, `dismiss`). Wraps the `sonner` `toast` function with Seal token styles. Compound Component pattern does not apply. Requires a `<SealSonner>` ancestor to render toasts.

**SealToast custom icon wrapping**
The `custom` method wraps the icon in `<span style={{ color, display: 'contents' }}>` to apply accent color without widening the `SealIcon` prop contract. `display: contents` prevents layout impact.

**SealSonner reads ThemeContext to sync sonner theme**
Uses `React.useContext(ThemeContext)` and passes the active mode to sonner's `theme` prop. Falls back to `"dark"` when no `ThemeProvider` ancestor is present.

---

### Inputs

**SealTextField — key design decisions**

- `React.forwardRef` — ref forwarded to the underlying `<input>` for form library compatibility (e.g. React Hook Form).
- `onChange` replaced with `(value: string) => void` — extends `Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>`.
- `React.useId()` — generates a stable `id` shared between `<label htmlFor>` and `<input id>`. An external `id` prop overrides it.
- `obscureText` — strips `type` from `restProps` and manages it internally (`"password"` ↔ `"text"`).
- Icon padding — `calc(var(--seal-dimension-sm) + 20px + var(--seal-dimension-xs))` applied via inline `style` as `ICON_SLOT_PADDING` constant.
- Password toggle — `<button type="button">` (not `<span>`) for keyboard accessibility. Labels: "Show password" / "Hide password".
- No Compound Component pattern — single-variant component.

**Password inputs and ARIA**
`type="password"` inputs are excluded from `role="textbox"` by ARIA spec. Tests must use `screen.getByLabelText(label)` or `document.querySelector('input[type="password"]')`, not `getByRole('textbox')`.

**SealCheckbox — key design decisions**

- `React.forwardRef` — exported with `displayName = 'SealCheckbox'`.
- Narrows Radix types: `checked` accepts only `boolean` (not `'indeterminate'`); `onCheckedChange` is `(checked: boolean) => void`.
- `React.useId()` — shared between `<label htmlFor>` and Radix Checkbox root `id`.
- `mt-[var(--seal-dimension-xxxs)]` — top-aligns the control with the first line when `sublabel` is present.
- No Compound Component pattern — single-variant component.

---

### Buttons

**Icon props accept a generic component reference**

```tsx
// ✅ correct — library-agnostic
icon?: SealIcon // React.ComponentType<{ size?: number; className?: string }>

// ❌ wrong — coupled to lucide-react
icon?: LucideIcon
```

All `icon` props accept a component reference, not rendered JSX:

```tsx
// ✅ correct
<SealFilledButton icon={Rocket}>Launch</SealFilledButton>

// ❌ wrong
<SealFilledButton icon={<Rocket size={16} />}>Launch</SealFilledButton>
```

**Gradient backgrounds require inline `style`**
Tailwind's `bg-[...]` maps to `background-color` — does not accept gradient values. Use `style={{ background: 'var(--seal-gradient-primary)' }}`.

**Hover / active states use opacity**
`hover:opacity-[0.85] active:opacity-[0.75]` — matches Flutter's `withValues(alpha: 0.85)` approach.

**Loading state preserves button dimensions**
When `loading` is `true`, the label/icon are `aria-hidden + invisible`. The spinner is absolutely positioned on top. Mirrors Flutter's `maintainSize` stack.

---

## Compound Component Pattern

### Standard Implementation

```tsx
// 1. Root impl function
function SealFilledButtonImpl({ variant = 'primary', ...props }: SealFilledButtonProps) {
  // ...
}

// 2. Sub-components fix the variant
type BaseProps = Omit<SealFilledButtonProps, 'variant' | 'color' | 'gradient'>
const Primary = (props: BaseProps) => <SealFilledButtonImpl variant="primary" {...props} />
Primary.displayName = 'SealFilledButton.Primary'

// Custom keeps color/gradient, strips variant
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

| Variant prop value | Sub-component name |
| ------------------ | ------------------ |
| `primary`          | `.Primary`         |
| `accent`           | `.Accent`          |
| `accent-secondary` | `.AccentSecondary` |
| `gradient`         | `.Gradient`        |
| `accent-gradient`  | `.AccentGradient`  |
| `custom`           | `.Custom`          |

### Rules

- Every sub-component must set `displayName`: `Primary.displayName = 'SealFilledButton.Primary'`
- Non-`custom` sub-components strip `variant`, `color`, and `gradient` from props.
- `Custom` strips `variant` only — keeps `color` and `gradient`.
- JSDoc belongs on the exported `const`, not the impl function.
- Components without variants (`SealTextField`, `SealCheckbox`, `SealSonner`) do **not** use this pattern.

---

## Storybook Guidelines

### Story file location

Stories live in `src/stories/<Category>/Seal<Name>.stories.tsx`. Categories: `Foundation`, `Buttons`, `Inputs`, `Feedback`, `Overlay`, `Navigation`, `Data Display`, `Layout`.

### Standard structure

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SealFilledButton } from '@/components/buttons/SealFilledButton'

const meta = {
  title: 'Buttons/SealFilledButton',
  component: SealFilledButton.Primary,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'accent'] },
  },
} satisfies Meta<typeof SealFilledButton.Primary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Button' } }
```

### Compound Component stories

When `meta.component` is a sub-component, every `Story` must include `args` for required-prop type checks. Never hardcode a prop in `render` that is also in `args` — causes TS2783.

```tsx
export const Gradient: Story = {
  args: { children: 'Launch' },
  render: (args) => <SealFilledButton.Gradient {...args} />,
}
```

### Icon props in stories

Storybook cannot serialize React component references in `args`. This causes garbled controls and source views.

**Solution:**

1. Hide `icon` from controls: `icon: { table: { disable: true } }`
2. Hardcode `icon` in each `render` function
3. Keep `icon` in `args` only to satisfy TypeScript
4. Set `parameters.docs.source.code` explicitly on every story with icon props

```tsx
const meta = {
  component: SealFilledIconButton.Primary,
  argTypes: {
    icon: { table: { disable: true } },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SealFilledIconButton.Primary>

export const Primary: Story = {
  args: { icon: Rocket, tooltip: 'Launch' },
  parameters: {
    docs: { source: { code: `<SealFilledIconButton.Primary icon={Rocket} tooltip="Launch" />` } },
  },
  render: () => <SealFilledIconButton.Primary icon={Rocket} tooltip="Launch" />,
}

// Interactive story — use ?? false for exactOptionalPropertyTypes
export const AllVariants: Story = {
  args: { icon: Rocket, loading: false, disabled: false },
  render: ({ loading, disabled }) => (
    <SealFilledIconButton.Primary
      icon={Rocket}
      tooltip="Primary"
      loading={loading ?? false}
      disabled={disabled ?? false}
    />
  ),
}
```

### Theme toolbar

The global toolbar (Theme + Mode) is wired in `preview.tsx`. Stories re-render on theme/mode change automatically. No per-story setup needed.

---

## Testing Guidelines

### renderWithTheme helper

```tsx
// test/utils.tsx
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

### Coverage per component

| Scenario                                | Required            |
| --------------------------------------- | ------------------- |
| Renders without error                   | ✅                  |
| Applies correct CSS variable references | ✅                  |
| Click / change interaction              | ✅ (if interactive) |
| Disabled state                          | ✅ (if applicable)  |
| Accessible name / role                  | ✅                  |

Coverage threshold: 80% lines, functions, branches, statements.

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
| `lucide-react`                        | Icon library (used in stories; never in types)     |
| `storybook` + `@storybook/react-vite` | Component catalog                                  |
| `vitest` + `@testing-library/react`   | Unit testing                                       |
| `typescript-eslint`                   | Strict TypeScript linting                          |
