import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealTable } from './SealTable'

const TOKEN_PAD_MD = 'var(--seal-dimension-md)'
const TOKEN_PAD_XL = 'var(--seal-dimension-xl)'
const TOKEN_TEXT_SECONDARY = 'var(--seal-text-secondary)'

const meta = {
  title: 'Layout/SealTable',
  component: SealTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof SealTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SealTable>
      <SealTable.Header>
        <SealTable.Row>
          <SealTable.Head>Name</SealTable.Head>
          <SealTable.Head>Role</SealTable.Head>
          <SealTable.Head>Status</SealTable.Head>
        </SealTable.Row>
      </SealTable.Header>
      <SealTable.Body>
        <SealTable.Row>
          <SealTable.Cell>Alice</SealTable.Cell>
          <SealTable.Cell>Admin</SealTable.Cell>
          <SealTable.Cell>Active</SealTable.Cell>
        </SealTable.Row>
        <SealTable.Row>
          <SealTable.Cell>Bob</SealTable.Cell>
          <SealTable.Cell>Editor</SealTable.Cell>
          <SealTable.Cell>Inactive</SealTable.Cell>
        </SealTable.Row>
        <SealTable.Row>
          <SealTable.Cell>Carol</SealTable.Cell>
          <SealTable.Cell>Viewer</SealTable.Cell>
          <SealTable.Cell>Active</SealTable.Cell>
        </SealTable.Row>
      </SealTable.Body>
    </SealTable>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealTable>
  <SealTable.Header>
    <SealTable.Row>
      <SealTable.Head>Name</SealTable.Head>
      <SealTable.Head>Role</SealTable.Head>
      <SealTable.Head>Status</SealTable.Head>
    </SealTable.Row>
  </SealTable.Header>
  <SealTable.Body>
    <SealTable.Row>
      <SealTable.Cell>Alice</SealTable.Cell>
      <SealTable.Cell>Admin</SealTable.Cell>
      <SealTable.Cell>Active</SealTable.Cell>
    </SealTable.Row>
  </SealTable.Body>
</SealTable>`,
      },
    },
  },
}

export const WithFooter: Story = {
  name: 'With Footer',
  render: () => (
    <SealTable>
      <SealTable.Header>
        <SealTable.Row>
          <SealTable.Head>Item</SealTable.Head>
          <SealTable.Head>Qty</SealTable.Head>
          <SealTable.Head>Price</SealTable.Head>
        </SealTable.Row>
      </SealTable.Header>
      <SealTable.Body>
        <SealTable.Row>
          <SealTable.Cell>Widget A</SealTable.Cell>
          <SealTable.Cell>2</SealTable.Cell>
          <SealTable.Cell>$10.00</SealTable.Cell>
        </SealTable.Row>
        <SealTable.Row>
          <SealTable.Cell>Widget B</SealTable.Cell>
          <SealTable.Cell>5</SealTable.Cell>
          <SealTable.Cell>$25.00</SealTable.Cell>
        </SealTable.Row>
      </SealTable.Body>
      <SealTable.Footer>
        <SealTable.Row>
          <SealTable.Cell colSpan={2}>Total</SealTable.Cell>
          <SealTable.Cell>$35.00</SealTable.Cell>
        </SealTable.Row>
      </SealTable.Footer>
    </SealTable>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealTable>
  <SealTable.Header>
    <SealTable.Row>
      <SealTable.Head>Item</SealTable.Head>
      <SealTable.Head>Qty</SealTable.Head>
      <SealTable.Head>Price</SealTable.Head>
    </SealTable.Row>
  </SealTable.Header>
  <SealTable.Body>
    <SealTable.Row>
      <SealTable.Cell>Widget A</SealTable.Cell>
      <SealTable.Cell>2</SealTable.Cell>
      <SealTable.Cell>$10.00</SealTable.Cell>
    </SealTable.Row>
  </SealTable.Body>
  <SealTable.Footer>
    <SealTable.Row>
      <SealTable.Cell colSpan={2}>Total</SealTable.Cell>
      <SealTable.Cell>$35.00</SealTable.Cell>
    </SealTable.Row>
  </SealTable.Footer>
</SealTable>`,
      },
    },
  },
}

export const WithCaption: Story = {
  name: 'With Caption',
  render: () => (
    <SealTable>
      <SealTable.Caption>Team members</SealTable.Caption>
      <SealTable.Header>
        <SealTable.Row>
          <SealTable.Head>Name</SealTable.Head>
          <SealTable.Head>Department</SealTable.Head>
        </SealTable.Row>
      </SealTable.Header>
      <SealTable.Body>
        <SealTable.Row>
          <SealTable.Cell>Alice</SealTable.Cell>
          <SealTable.Cell>Engineering</SealTable.Cell>
        </SealTable.Row>
        <SealTable.Row>
          <SealTable.Cell>Bob</SealTable.Cell>
          <SealTable.Cell>Design</SealTable.Cell>
        </SealTable.Row>
      </SealTable.Body>
    </SealTable>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealTable>
  <SealTable.Caption>Team members</SealTable.Caption>
  <SealTable.Header>
    <SealTable.Row>
      <SealTable.Head>Name</SealTable.Head>
      <SealTable.Head>Department</SealTable.Head>
    </SealTable.Row>
  </SealTable.Header>
  <SealTable.Body>
    <SealTable.Row>
      <SealTable.Cell>Alice</SealTable.Cell>
      <SealTable.Cell>Engineering</SealTable.Cell>
    </SealTable.Row>
  </SealTable.Body>
</SealTable>`,
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: TOKEN_PAD_XL }}>
      <div>
        <p style={{ color: TOKEN_TEXT_SECONDARY, marginBottom: TOKEN_PAD_MD, fontSize: '12px' }}>
          Basic table (header + body)
        </p>
        <SealTable>
          <SealTable.Header>
            <SealTable.Row>
              <SealTable.Head>Name</SealTable.Head>
              <SealTable.Head>Role</SealTable.Head>
              <SealTable.Head>Status</SealTable.Head>
            </SealTable.Row>
          </SealTable.Header>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>Alice</SealTable.Cell>
              <SealTable.Cell>Admin</SealTable.Cell>
              <SealTable.Cell>Active</SealTable.Cell>
            </SealTable.Row>
            <SealTable.Row>
              <SealTable.Cell>Bob</SealTable.Cell>
              <SealTable.Cell>Editor</SealTable.Cell>
              <SealTable.Cell>Inactive</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
        </SealTable>
      </div>

      <div>
        <p style={{ color: TOKEN_TEXT_SECONDARY, marginBottom: TOKEN_PAD_MD, fontSize: '12px' }}>
          With footer
        </p>
        <SealTable>
          <SealTable.Header>
            <SealTable.Row>
              <SealTable.Head>Item</SealTable.Head>
              <SealTable.Head>Qty</SealTable.Head>
              <SealTable.Head>Price</SealTable.Head>
            </SealTable.Row>
          </SealTable.Header>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>Widget A</SealTable.Cell>
              <SealTable.Cell>2</SealTable.Cell>
              <SealTable.Cell>$10.00</SealTable.Cell>
            </SealTable.Row>
            <SealTable.Row>
              <SealTable.Cell>Widget B</SealTable.Cell>
              <SealTable.Cell>5</SealTable.Cell>
              <SealTable.Cell>$25.00</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
          <SealTable.Footer>
            <SealTable.Row>
              <SealTable.Cell colSpan={2}>Total</SealTable.Cell>
              <SealTable.Cell>$35.00</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Footer>
        </SealTable>
      </div>

      <div>
        <p style={{ color: TOKEN_TEXT_SECONDARY, marginBottom: TOKEN_PAD_MD, fontSize: '12px' }}>
          With caption
        </p>
        <SealTable>
          <SealTable.Caption>Team members</SealTable.Caption>
          <SealTable.Header>
            <SealTable.Row>
              <SealTable.Head>Name</SealTable.Head>
              <SealTable.Head>Department</SealTable.Head>
            </SealTable.Row>
          </SealTable.Header>
          <SealTable.Body>
            <SealTable.Row>
              <SealTable.Cell>Alice</SealTable.Cell>
              <SealTable.Cell>Engineering</SealTable.Cell>
            </SealTable.Row>
          </SealTable.Body>
        </SealTable>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealTable>
  <SealTable.Caption>Team members</SealTable.Caption>
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
  </SealTable.Body>
  <SealTable.Footer>
    <SealTable.Row>
      <SealTable.Cell colSpan={2}>Total: 1</SealTable.Cell>
    </SealTable.Row>
  </SealTable.Footer>
</SealTable>`,
      },
    },
  },
}
