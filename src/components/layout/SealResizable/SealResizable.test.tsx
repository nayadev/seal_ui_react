import { screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealResizable } from './SealResizable'

function TwoPanels({ withHandle = false }: Readonly<{ withHandle?: boolean }>) {
  return (
    <SealResizable orientation="horizontal" style={{ height: 200 }}>
      <SealResizable.Panel defaultSize={50} minSize={20}>
        <div>Panel A</div>
      </SealResizable.Panel>
      <SealResizable.Handle withHandle={withHandle} />
      <SealResizable.Panel defaultSize={50} minSize={20}>
        <div>Panel B</div>
      </SealResizable.Panel>
    </SealResizable>
  )
}

describe('SealResizable', () => {
  describe('rendering', () => {
    it('renders horizontal group without error', () => {
      renderWithTheme(<TwoPanels />)
      expect(screen.getByText('Panel A')).toBeInTheDocument()
      expect(screen.getByText('Panel B')).toBeInTheDocument()
    })

    it('renders vertical group without error', () => {
      renderWithTheme(
        <SealResizable orientation="vertical" style={{ height: 200 }}>
          <SealResizable.Panel defaultSize={50} minSize={20}>
            <div>Top</div>
          </SealResizable.Panel>
          <SealResizable.Handle />
          <SealResizable.Panel defaultSize={50} minSize={20}>
            <div>Bottom</div>
          </SealResizable.Panel>
        </SealResizable>,
      )
      expect(screen.getByText('Top')).toBeInTheDocument()
      expect(screen.getByText('Bottom')).toBeInTheDocument()
    })

    it('renders panel content', () => {
      renderWithTheme(<TwoPanels />)
      expect(screen.getByText('Panel A')).toBeInTheDocument()
      expect(screen.getByText('Panel B')).toBeInTheDocument()
    })

    it('renders three panels', () => {
      renderWithTheme(
        <SealResizable orientation="horizontal" style={{ height: 200 }}>
          <SealResizable.Panel defaultSize={33}>
            <div>A</div>
          </SealResizable.Panel>
          <SealResizable.Handle />
          <SealResizable.Panel defaultSize={34}>
            <div>B</div>
          </SealResizable.Panel>
          <SealResizable.Handle />
          <SealResizable.Panel defaultSize={33}>
            <div>C</div>
          </SealResizable.Panel>
        </SealResizable>,
      )
      expect(screen.getByText('A')).toBeInTheDocument()
      expect(screen.getByText('B')).toBeInTheDocument()
      expect(screen.getByText('C')).toBeInTheDocument()
    })

    it('renders grip icon when withHandle is true', () => {
      renderWithTheme(<TwoPanels withHandle />)
      const svgs = document.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThan(0)
    })

    it('renders without grip icon when withHandle is false', () => {
      renderWithTheme(<TwoPanels />)
      const svgs = document.querySelectorAll('svg')
      expect(svgs).toHaveLength(0)
    })
  })

  describe('sub-component displayNames', () => {
    it('Panel has correct displayName', () => {
      expect(SealResizable.Panel.displayName).toBe('SealResizable.Panel')
    })

    it('Handle has correct displayName', () => {
      expect(SealResizable.Handle.displayName).toBe('SealResizable.Handle')
    })
  })
})
