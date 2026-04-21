import type { Meta, StoryObj } from '@storybook/react-vite';

const TOKEN_VARS = [
  { name: 'brand-primary', label: 'Brand Primary' },
  { name: 'brand-primary-tint', label: 'Primary Tint' },
  { name: 'brand-primary-shade', label: 'Primary Shade' },
  { name: 'accent-accent', label: 'Accent' },
  { name: 'accent-accent-secondary', label: 'Accent Secondary' },
  { name: 'surface-background', label: 'Background' },
  { name: 'surface-surface', label: 'Surface' },
  { name: 'surface-surface-alt', label: 'Surface Alt' },
  { name: 'text-primary', label: 'Text Primary' },
  { name: 'text-secondary', label: 'Text Secondary' },
  { name: 'border-default', label: 'Border' },
  { name: 'semantic-success', label: 'Success' },
  { name: 'semantic-warning', label: 'Warning' },
  { name: 'semantic-error', label: 'Error' },
  { name: 'semantic-info', label: 'Info' },
] as const;

const SPACING_VARS = [
  { name: 'dimension-xxxs', label: 'xxxs' },
  { name: 'dimension-xxs', label: 'xxs' },
  { name: 'dimension-xs', label: 'xs' },
  { name: 'dimension-sm', label: 'sm' },
  { name: 'dimension-md', label: 'md' },
  { name: 'dimension-lg', label: 'lg' },
  { name: 'dimension-xl', label: 'xl' },
  { name: 'dimension-xxl', label: 'xxl' },
  { name: 'dimension-xxxl', label: 'xxxl' },
] as const;

const RADIUS_VARS = [
  { name: 'radius-xs', label: 'xs' },
  { name: 'radius-sm', label: 'sm' },
  { name: 'radius-md', label: 'md' },
  { name: 'radius-lg', label: 'lg' },
  { name: 'radius-xl', label: 'xl' },
  { name: 'radius-full', label: 'full' },
] as const;

const TYPE_SCALE = [
  { label: 'Display', size: '48px', weight: '800' },
  { label: 'Headline', size: '36px', weight: '800' },
  { label: 'Heading', size: '30px', weight: '600' },
  { label: 'Title', size: '24px', weight: '600' },
  { label: 'Subtitle', size: '20px', weight: '600' },
  { label: 'Body Large', size: '18px', weight: '600' },
  { label: 'Lead', size: '20px', weight: '400' },
  { label: 'Body', size: '16px', weight: '400' },
  { label: 'Small', size: '14px', weight: '500' },
  { label: 'Caption', size: '14px', weight: '400' },
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--seal-text-secondary)',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--seal-border-default)',
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function ColorSwatch({ name, label }: { name: string; label: string }) {
  const cssVar = `--seal-${name}`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '120px' }}>
      <div style={{
        width: '100%',
        height: '48px',
        background: `var(${cssVar})`,
        borderRadius: '8px',
        border: '1px solid var(--seal-border-default)',
      }} />
      <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--seal-text-primary)' }}>{label}</span>
      <code style={{
        fontSize: '10px',
        color: 'var(--seal-text-secondary)',
        fontFamily: 'monospace',
        wordBreak: 'break-all',
      }}>
        {cssVar}
      </code>
    </div>
  );
}

function GradientSwatch({ name, label }: { name: string; label: string }) {
  const cssVar = `--seal-gradient-${name}`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '160px' }}>
      <div style={{
        width: '100%',
        height: '48px',
        background: `var(${cssVar})`,
        borderRadius: '8px',
        border: '1px solid var(--seal-border-default)',
      }} />
      <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--seal-text-primary)' }}>{label}</span>
    </div>
  );
}

function SpacingSwatch({ name, label }: { name: string; label: string }) {
  const cssVar = `--seal-${name}`;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <code style={{
        minWidth: '40px',
        fontSize: '11px',
        color: 'var(--seal-text-secondary)',
        fontFamily: 'monospace',
      }}>{label}</code>
      <div style={{
        height: '16px',
        width: `var(${cssVar})`,
        background: 'var(--seal-brand-primary)',
        borderRadius: '3px',
        minWidth: '2px',
      }} />
      <code style={{ fontSize: '11px', color: 'var(--seal-text-secondary)', fontFamily: 'monospace' }}>{cssVar}</code>
    </div>
  );
}

function TokensShowcase() {
  return (
    <div style={{
      fontFamily: 'var(--seal-font-family-sans, Inter), sans-serif',
      background: 'var(--seal-surface-background)',
      color: 'var(--seal-text-primary)',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid var(--seal-border-default)',
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '2rem', color: 'var(--seal-text-primary)' }}>
        Design Tokens
      </h1>

      <Section title="Color Palette">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {TOKEN_VARS.map(({ name, label }) => (
            <ColorSwatch key={name} name={name} label={label} />
          ))}
        </div>
      </Section>

      <Section title="Gradients">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {(['primary', 'accent', 'surface', 'surface-primary', 'surface-accent'] as const).map((g) => (
            <GradientSwatch key={g} name={g} label={g} />
          ))}
        </div>
      </Section>

      <Section title="Spacing Scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {SPACING_VARS.map(({ name, label }) => (
            <SpacingSwatch key={name} name={name} label={label} />
          ))}
        </div>
      </Section>

      <Section title="Border Radius">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          {RADIUS_VARS.map(({ name, label }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--seal-brand-primary)',
                borderRadius: `var(--seal-${name})`,
              }} />
              <code style={{ fontSize: '11px', color: 'var(--seal-text-secondary)', fontFamily: 'monospace' }}>{label}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography Scale">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {TYPE_SCALE.map(({ label, size, weight }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <code style={{
                minWidth: '80px',
                fontSize: '11px',
                color: 'var(--seal-text-secondary)',
                fontFamily: 'monospace',
              }}>{size} / {weight}</code>
              <span style={{
                fontSize: size,
                fontWeight: weight,
                color: 'var(--seal-text-primary)',
                lineHeight: 1.2,
              }}>{label}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundation/Tokens',
  component: TokensShowcase,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Visual catalog of all SealUI design tokens. Use the Theme/Mode toolbar above to switch themes.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllTokens: Story = {
  name: 'All Tokens',
};
