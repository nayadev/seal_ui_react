import type { Meta, StoryObj } from '@storybook/react-vite'

import { SealBreadcrumb } from './SealBreadcrumb'

const meta = {
  title: 'Layout/SealBreadcrumb',
  component: SealBreadcrumb,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SealBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SealBreadcrumb>
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
      </SealBreadcrumb.Item>
      <SealBreadcrumb.Separator />
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Link href="/components">Components</SealBreadcrumb.Link>
      </SealBreadcrumb.Item>
      <SealBreadcrumb.Separator />
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Page>Breadcrumb</SealBreadcrumb.Page>
      </SealBreadcrumb.Item>
    </SealBreadcrumb>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealBreadcrumb>
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
  </SealBreadcrumb.Item>
  <SealBreadcrumb.Separator />
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Link href="/components">Components</SealBreadcrumb.Link>
  </SealBreadcrumb.Item>
  <SealBreadcrumb.Separator />
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Page>Breadcrumb</SealBreadcrumb.Page>
  </SealBreadcrumb.Item>
</SealBreadcrumb>`,
      },
    },
  },
}

export const WithEllipsis: Story = {
  name: 'With Ellipsis Dropdown',
  render: () => (
    <SealBreadcrumb>
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
      </SealBreadcrumb.Item>
      <SealBreadcrumb.Separator />
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Dropdown>
          <SealBreadcrumb.DropMenuItem onClick={() => undefined}>
            Documentation
          </SealBreadcrumb.DropMenuItem>
          <SealBreadcrumb.DropMenuItem onClick={() => undefined}>
            Themes
          </SealBreadcrumb.DropMenuItem>
          <SealBreadcrumb.DropMenuItem onClick={() => undefined}>
            GitHub
          </SealBreadcrumb.DropMenuItem>
        </SealBreadcrumb.Dropdown>
      </SealBreadcrumb.Item>
      <SealBreadcrumb.Separator />
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Link href="/components">Components</SealBreadcrumb.Link>
      </SealBreadcrumb.Item>
      <SealBreadcrumb.Separator />
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Page>Breadcrumb</SealBreadcrumb.Page>
      </SealBreadcrumb.Item>
    </SealBreadcrumb>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealBreadcrumb>
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
  </SealBreadcrumb.Item>
  <SealBreadcrumb.Separator />
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Dropdown>
      <SealBreadcrumb.DropMenuItem onClick={() => {}}>Documentation</SealBreadcrumb.DropMenuItem>
      <SealBreadcrumb.DropMenuItem onClick={() => {}}>Themes</SealBreadcrumb.DropMenuItem>
    </SealBreadcrumb.Dropdown>
  </SealBreadcrumb.Item>
  <SealBreadcrumb.Separator />
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Page>Breadcrumb</SealBreadcrumb.Page>
  </SealBreadcrumb.Item>
</SealBreadcrumb>`,
      },
    },
  },
}

export const CustomSeparator: Story = {
  render: () => (
    <SealBreadcrumb>
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
      </SealBreadcrumb.Item>
      <SealBreadcrumb.Separator>/</SealBreadcrumb.Separator>
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Link href="/settings">Settings</SealBreadcrumb.Link>
      </SealBreadcrumb.Item>
      <SealBreadcrumb.Separator>/</SealBreadcrumb.Separator>
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Page>Profile</SealBreadcrumb.Page>
      </SealBreadcrumb.Item>
    </SealBreadcrumb>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealBreadcrumb>
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
  </SealBreadcrumb.Item>
  <SealBreadcrumb.Separator>/</SealBreadcrumb.Separator>
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Page>Profile</SealBreadcrumb.Page>
  </SealBreadcrumb.Item>
</SealBreadcrumb>`,
      },
    },
  },
}

export const SingleItem: Story = {
  render: () => (
    <SealBreadcrumb>
      <SealBreadcrumb.Item>
        <SealBreadcrumb.Page>Home</SealBreadcrumb.Page>
      </SealBreadcrumb.Item>
    </SealBreadcrumb>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SealBreadcrumb>
  <SealBreadcrumb.Item>
    <SealBreadcrumb.Page>Home</SealBreadcrumb.Page>
  </SealBreadcrumb.Item>
</SealBreadcrumb>`,
      },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-dimension-lg">
      <div>
        <p className="mb-dimension-xs text-style-small text-[var(--seal-text-secondary)]">
          Default (chevron separator)
        </p>
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator />
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/components">Components</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator />
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Breadcrumb</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>
      </div>

      <div>
        <p className="mb-dimension-xs text-style-small text-[var(--seal-text-secondary)]">
          With dropdown (collapsed levels)
        </p>
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator />
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Dropdown>
              <SealBreadcrumb.DropMenuItem onClick={() => undefined}>
                Documentation
              </SealBreadcrumb.DropMenuItem>
              <SealBreadcrumb.DropMenuItem onClick={() => undefined}>
                Themes
              </SealBreadcrumb.DropMenuItem>
            </SealBreadcrumb.Dropdown>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator />
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Breadcrumb</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>
      </div>

      <div>
        <p className="mb-dimension-xs text-style-small text-[var(--seal-text-secondary)]">
          Custom separator
        </p>
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator>/</SealBreadcrumb.Separator>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Profile</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// See individual stories for usage examples`,
      },
    },
  },
}
