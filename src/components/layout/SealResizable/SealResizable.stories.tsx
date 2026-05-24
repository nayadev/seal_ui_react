import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealResizable } from './SealResizable'

// Panel placeholder — fills the available panel space with a centered label.
// Uses flex:1 so it grows inside the Panel (which has flex-col via the component default).
function PanelContent({ label }: Readonly<{ label: string }>) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--seal-text-secondary)',
        fontSize: '14px',
        fontWeight: 500,
        background: 'var(--seal-surface-surface)',
      }}
    >
      {label}
    </div>
  )
}

// Outer container — provides border, rounded corners, and a darker background
// so the surface-colored panels and the 1px separator line contrast clearly.
const outerStyle = (height: number): React.CSSProperties => ({
  height,
  border: '1px solid var(--seal-border-default)',
  borderRadius: 'var(--seal-radius-md)',
  overflow: 'hidden',
  background: 'var(--seal-surface-background)',
})

const meta = {
  title: 'Layout/SealResizable',
  component: SealResizable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof SealResizable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Horizontal',
  render: () => (
    <div style={outerStyle(200)}>
      <SealResizable orientation="horizontal">
        <SealResizable.Panel defaultSize={30} minSize={20}>
          <PanelContent label="Sidebar" />
        </SealResizable.Panel>
        <SealResizable.Handle withHandle />
        <SealResizable.Panel defaultSize={70} minSize={30}>
          <PanelContent label="Content" />
        </SealResizable.Panel>
      </SealResizable>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealResizable orientation="horizontal" style={{ height: 200 }}>
  <SealResizable.Panel defaultSize={30} minSize={20}>Sidebar</SealResizable.Panel>
  <SealResizable.Handle withHandle />
  <SealResizable.Panel defaultSize={70} minSize={30}>Content</SealResizable.Panel>
</SealResizable>`,
      },
    },
  },
}

export const Vertical: Story = {
  name: 'Vertical',
  render: () => (
    <div style={outerStyle(300)}>
      <SealResizable orientation="vertical">
        <SealResizable.Panel defaultSize={50} minSize={20}>
          <PanelContent label="Top" />
        </SealResizable.Panel>
        <SealResizable.Handle withHandle />
        <SealResizable.Panel defaultSize={50} minSize={20}>
          <PanelContent label="Bottom" />
        </SealResizable.Panel>
      </SealResizable>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealResizable orientation="vertical" style={{ height: 300 }}>
  <SealResizable.Panel defaultSize={50} minSize={20}>Top</SealResizable.Panel>
  <SealResizable.Handle withHandle />
  <SealResizable.Panel defaultSize={50} minSize={20}>Bottom</SealResizable.Panel>
</SealResizable>`,
      },
    },
  },
}

export const ThreePanels: Story = {
  name: 'Three Panels',
  render: () => (
    <div style={outerStyle(200)}>
      <SealResizable orientation="horizontal">
        <SealResizable.Panel defaultSize={25} minSize={15}>
          <PanelContent label="Left" />
        </SealResizable.Panel>
        <SealResizable.Handle withHandle />
        <SealResizable.Panel defaultSize={50} minSize={20}>
          <PanelContent label="Center" />
        </SealResizable.Panel>
        <SealResizable.Handle withHandle />
        <SealResizable.Panel defaultSize={25} minSize={15}>
          <PanelContent label="Right" />
        </SealResizable.Panel>
      </SealResizable>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealResizable orientation="horizontal">
  <SealResizable.Panel defaultSize={25} minSize={15}>Left</SealResizable.Panel>
  <SealResizable.Handle withHandle />
  <SealResizable.Panel defaultSize={50} minSize={20}>Center</SealResizable.Panel>
  <SealResizable.Handle withHandle />
  <SealResizable.Panel defaultSize={25} minSize={15}>Right</SealResizable.Panel>
</SealResizable>`,
      },
    },
  },
}

export const WithoutHandle: Story = {
  name: 'Without Handle Icon',
  render: () => (
    <div style={outerStyle(200)}>
      <SealResizable orientation="horizontal">
        <SealResizable.Panel defaultSize={50} minSize={20}>
          <PanelContent label="Left" />
        </SealResizable.Panel>
        <SealResizable.Handle />
        <SealResizable.Panel defaultSize={50} minSize={20}>
          <PanelContent label="Right" />
        </SealResizable.Panel>
      </SealResizable>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealResizable orientation="horizontal">
  <SealResizable.Panel defaultSize={50} minSize={20}>Left</SealResizable.Panel>
  {/* Thin divider only — no visible grip */}
  <SealResizable.Handle />
  <SealResizable.Panel defaultSize={50} minSize={20}>Right</SealResizable.Panel>
</SealResizable>`,
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seal-dimension-lg)' }}>
      <div style={outerStyle(160)}>
        <SealResizable orientation="horizontal">
          <SealResizable.Panel defaultSize={30} minSize={20}>
            <PanelContent label="Sidebar" />
          </SealResizable.Panel>
          <SealResizable.Handle withHandle />
          <SealResizable.Panel defaultSize={70} minSize={30}>
            <PanelContent label="Content" />
          </SealResizable.Panel>
        </SealResizable>
      </div>

      <div style={outerStyle(200)}>
        <SealResizable orientation="vertical">
          <SealResizable.Panel defaultSize={50} minSize={20}>
            <PanelContent label="Top" />
          </SealResizable.Panel>
          <SealResizable.Handle withHandle />
          <SealResizable.Panel defaultSize={50} minSize={20}>
            <PanelContent label="Bottom" />
          </SealResizable.Panel>
        </SealResizable>
      </div>

      <div style={outerStyle(160)}>
        <SealResizable orientation="horizontal">
          <SealResizable.Panel defaultSize={25} minSize={15}>
            <PanelContent label="Left" />
          </SealResizable.Panel>
          <SealResizable.Handle withHandle />
          <SealResizable.Panel defaultSize={50} minSize={20}>
            <PanelContent label="Center" />
          </SealResizable.Panel>
          <SealResizable.Handle withHandle />
          <SealResizable.Panel defaultSize={25} minSize={15}>
            <PanelContent label="Right" />
          </SealResizable.Panel>
        </SealResizable>
      </div>

      <div style={outerStyle(160)}>
        <SealResizable orientation="horizontal">
          <SealResizable.Panel defaultSize={50} minSize={20}>
            <PanelContent label="Left" />
          </SealResizable.Panel>
          <SealResizable.Handle />
          <SealResizable.Panel defaultSize={50} minSize={20}>
            <PanelContent label="Right" />
          </SealResizable.Panel>
        </SealResizable>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `{/* Horizontal sidebar layout */}
<SealResizable orientation="horizontal">
  <SealResizable.Panel defaultSize={30}>Sidebar</SealResizable.Panel>
  <SealResizable.Handle withHandle />
  <SealResizable.Panel defaultSize={70}>Content</SealResizable.Panel>
</SealResizable>

{/* Vertical split */}
<SealResizable orientation="vertical">
  <SealResizable.Panel defaultSize={50}>Top</SealResizable.Panel>
  <SealResizable.Handle withHandle />
  <SealResizable.Panel defaultSize={50}>Bottom</SealResizable.Panel>
</SealResizable>

{/* Three columns */}
<SealResizable orientation="horizontal">
  <SealResizable.Panel defaultSize={25}>Left</SealResizable.Panel>
  <SealResizable.Handle withHandle />
  <SealResizable.Panel defaultSize={50}>Center</SealResizable.Panel>
  <SealResizable.Handle withHandle />
  <SealResizable.Panel defaultSize={25}>Right</SealResizable.Panel>
</SealResizable>

{/* Without handle icon */}
<SealResizable orientation="horizontal">
  <SealResizable.Panel defaultSize={50}>Left</SealResizable.Panel>
  <SealResizable.Handle />
  <SealResizable.Panel defaultSize={50}>Right</SealResizable.Panel>
</SealResizable>`,
      },
    },
  },
}
