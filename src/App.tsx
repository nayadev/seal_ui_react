import { ThemeProvider } from './theme/ThemeProvider'
import type { ThemeName } from './theme/ThemeProvider'
import { useTheme } from './theme/useTheme'

const V_BRAND = 'var(--seal-brand-primary)'
const V_TEXT = 'var(--seal-text-primary)'
const V_BORDER = 'var(--seal-border-default)'
const V_SURFACE = 'var(--seal-surface-surface)'

const THEMES: { value: ThemeName; label: string }[] = [
  { value: 'nebula', label: 'Nebula' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'deep_ocean', label: 'Deep Ocean' },
  { value: 'terminal', label: 'Terminal' },
]

function ThemeSwitcher() {
  const { theme, mode, setTheme, setMode } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '48px 24px',
        fontFamily: 'var(--seal-font-family-sans, Inter), sans-serif',
        minHeight: '100vh',
        background: 'var(--seal-surface-background)',
        color: V_TEXT,
      }}
    >
      <h1 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.4px', margin: 0 }}>
        SealUI React
      </h1>
      <p style={{ color: 'var(--seal-text-secondary)', margin: 0 }}>
        Theme: <strong style={{ color: V_BRAND }}>{theme}</strong> / {mode}
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {THEMES.map((t) => (
          <button
            key={t.value}
            onClick={() => {
              setTheme(t.value)
            }}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: `1px solid ${theme === t.value ? V_BRAND : V_BORDER}`,
              background: theme === t.value ? V_BRAND : V_SURFACE,
              color: theme === t.value ? 'var(--seal-accent-on-accent)' : V_TEXT,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          setMode(mode === 'dark' ? 'light' : 'dark')
        }}
        style={{
          padding: '8px 20px',
          borderRadius: '8px',
          border: `1px solid ${V_BORDER}`,
          background: V_SURFACE,
          color: V_TEXT,
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Toggle {mode === 'dark' ? 'Light' : 'Dark'} Mode
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '12px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        {(
          [
            'brand-primary',
            'brand-primary-tint',
            'accent-accent',
            'surface-surface',
            'text-primary',
            'semantic-success',
            'semantic-warning',
            'semantic-error',
          ] as const
        ).map((token) => (
          <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                height: '40px',
                borderRadius: '6px',
                background: `var(--seal-${token})`,
                border: `1px solid ${V_BORDER}`,
              }}
            />
            <span style={{ fontSize: '11px', color: 'var(--seal-text-secondary)' }}>{token}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Root demo application — wraps the theme switcher in a ThemeProvider. */
function App() {
  return (
    <ThemeProvider theme="nebula" mode="dark">
      <ThemeSwitcher />
    </ThemeProvider>
  )
}

export default App
