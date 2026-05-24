import { renderWithTheme } from '../../../../test/utils'

import { SealTable } from './SealTable'

function SimpleTable() {
  return (
    <SealTable>
      <SealTable.Header>
        <SealTable.Row>
          <SealTable.Head>Name</SealTable.Head>
          <SealTable.Head>Role</SealTable.Head>
        </SealTable.Row>
      </SealTable.Header>
      <SealTable.Body>
        <SealTable.Row>
          <SealTable.Cell>Alice</SealTable.Cell>
          <SealTable.Cell>Admin</SealTable.Cell>
        </SealTable.Row>
        <SealTable.Row>
          <SealTable.Cell>Bob</SealTable.Cell>
          <SealTable.Cell>Editor</SealTable.Cell>
        </SealTable.Row>
      </SealTable.Body>
    </SealTable>
  )
}

describe('SealTable', () => {
  describe('rendering', () => {
    it('renders without error', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders a <table> element', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      expect(container.querySelector('table')).toBeInTheDocument()
    })

    it('applies primary text token class', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      const table = container.querySelector('table')
      expect(table?.className).toContain('text-[var(--seal-text-primary)]')
    })

    it('forwards className to the table element', () => {
      const { container } = renderWithTheme(
        <SealTable className="custom-class">
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>data</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
        </SealTable>,
      )
      expect(container.querySelector('table')).toHaveClass('custom-class')
    })
  })

  describe('SealTable.Header', () => {
    it('renders a <thead> element', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      expect(container.querySelector('thead')).toBeInTheDocument()
    })

    it('renders header cells text', () => {
      const { getByText } = renderWithTheme(<SimpleTable />)
      expect(getByText('Name')).toBeInTheDocument()
      expect(getByText('Role')).toBeInTheDocument()
    })
  })

  describe('SealTable.Body', () => {
    it('renders a <tbody> element', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('renders cell text content', () => {
      const { getByText } = renderWithTheme(<SimpleTable />)
      expect(getByText('Alice')).toBeInTheDocument()
      expect(getByText('Bob')).toBeInTheDocument()
    })
  })

  describe('SealTable.Footer', () => {
    it('renders a <tfoot> element', () => {
      const { container } = renderWithTheme(
        <SealTable>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>Item</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
          <SealTable.Footer>
            <SealTable.Row>
              <SealTable.Cell>Total</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Footer>
        </SealTable>,
      )
      expect(container.querySelector('tfoot')).toBeInTheDocument()
    })

    it('renders footer text', () => {
      const { getByText } = renderWithTheme(
        <SealTable>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>data</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
          <SealTable.Footer>
            <SealTable.Row>
              <SealTable.Cell>Total</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Footer>
        </SealTable>,
      )
      expect(getByText('Total')).toBeInTheDocument()
    })

    it('applies surface-alt and border tokens', () => {
      const { container } = renderWithTheme(
        <SealTable>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>x</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
          <SealTable.Footer>
            <SealTable.Row>
              <SealTable.Cell>Footer</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Footer>
        </SealTable>,
      )
      const tfoot = container.querySelector('tfoot')
      expect(tfoot?.className).toContain('bg-[var(--seal-surface-surface-alt)]')
    })
  })

  describe('SealTable.Row', () => {
    it('renders a <tr> element', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      expect(container.querySelector('tr')).toBeInTheDocument()
    })

    it('applies border token class', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      const rows = container.querySelectorAll('tbody tr')
      expect(rows[0]?.className).toContain('border-[var(--seal-border-default)]')
    })
  })

  describe('SealTable.Head', () => {
    it('renders a <th> element', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      expect(container.querySelector('th')).toBeInTheDocument()
    })

    it('applies secondary text token', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      const th = container.querySelector('th')
      expect(th?.className).toContain('text-[var(--seal-text-secondary)]')
    })
  })

  describe('SealTable.Cell', () => {
    it('renders a <td> element', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      expect(container.querySelector('td')).toBeInTheDocument()
    })

    it('applies primary text token', () => {
      const { container } = renderWithTheme(<SimpleTable />)
      const td = container.querySelector('td')
      expect(td?.className).toContain('text-[var(--seal-text-primary)]')
    })

    it('supports colSpan', () => {
      const { container } = renderWithTheme(
        <SealTable>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell colSpan={3}>Spanning</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
        </SealTable>,
      )
      const td = container.querySelector('td')
      expect(td).toHaveAttribute('colspan', '3')
    })
  })

  describe('SealTable.Caption', () => {
    it('renders a <caption> element', () => {
      const { container } = renderWithTheme(
        <SealTable>
          <SealTable.Caption>Members</SealTable.Caption>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>data</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
        </SealTable>,
      )
      expect(container.querySelector('caption')).toBeInTheDocument()
    })

    it('renders caption text', () => {
      const { getByText } = renderWithTheme(
        <SealTable>
          <SealTable.Caption>Members</SealTable.Caption>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>data</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
        </SealTable>,
      )
      expect(getByText('Members')).toBeInTheDocument()
    })

    it('applies secondary text token', () => {
      const { container } = renderWithTheme(
        <SealTable>
          <SealTable.Caption>Caption</SealTable.Caption>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>data</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
        </SealTable>,
      )
      const caption = container.querySelector('caption')
      expect(caption?.className).toContain('text-[var(--seal-text-secondary)]')
    })
  })

  describe('multiple rows', () => {
    it('renders all rows', () => {
      const { getByText } = renderWithTheme(
        <SealTable>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>Alice</SealTable.Cell>
            </SealTable.Row>
            <SealTable.Row>
              <SealTable.Cell>Bob</SealTable.Cell>
            </SealTable.Row>
            <SealTable.Row>
              <SealTable.Cell>Carol</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
        </SealTable>,
      )
      expect(getByText('Alice')).toBeInTheDocument()
      expect(getByText('Bob')).toBeInTheDocument()
      expect(getByText('Carol')).toBeInTheDocument()
    })
  })
})
