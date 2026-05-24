import { fireEvent, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealBreadcrumb } from './SealBreadcrumb'

const DROPDOWN_TRIGGER_LABEL = 'Show more breadcrumb items'

describe('SealBreadcrumb', () => {
  describe('rendering', () => {
    it('renders without crashing with minimal props', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Home</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('renders a nav element with aria-label="breadcrumb"', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Home</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
    })

    it('renders all children', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator />
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/settings">Settings</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator />
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Profile</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
      expect(screen.getByText('Profile')).toBeInTheDocument()
    })
  })

  describe('SealBreadcrumb.Link', () => {
    it('renders an anchor element', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/home">Home</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      const link = screen.getByRole('link', { name: 'Home' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/home')
    })
  })

  describe('SealBreadcrumb.Page', () => {
    it('renders with aria-current="page"', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Profile</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.getByText('Profile')).toHaveAttribute('aria-current', 'page')
    })

    it('renders with aria-disabled="true"', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Profile</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.getByText('Profile')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('SealBreadcrumb.Separator', () => {
    it('renders with aria-hidden', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator />
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Page</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      const separators = document.querySelectorAll('[aria-hidden="true"]')
      expect(separators.length).toBeGreaterThan(0)
    })

    it('accepts custom separator content', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Link href="/">Home</SealBreadcrumb.Link>
          </SealBreadcrumb.Item>
          <SealBreadcrumb.Separator>/</SealBreadcrumb.Separator>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Page>Page</SealBreadcrumb.Page>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.getByText('/')).toBeInTheDocument()
    })
  })

  describe('SealBreadcrumb.Ellipsis', () => {
    it('renders without crashing', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Ellipsis />
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.getByText('More')).toBeInTheDocument()
    })
  })

  describe('SealBreadcrumb.Dropdown', () => {
    it('renders the ellipsis trigger', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Dropdown>
              <SealBreadcrumb.DropMenuItem>Documentation</SealBreadcrumb.DropMenuItem>
            </SealBreadcrumb.Dropdown>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.getByRole('button', { name: DROPDOWN_TRIGGER_LABEL })).toBeInTheDocument()
    })

    it('hides dropdown items initially', () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Dropdown>
              <SealBreadcrumb.DropMenuItem>Documentation</SealBreadcrumb.DropMenuItem>
            </SealBreadcrumb.Dropdown>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      expect(screen.queryByText('Documentation')).not.toBeInTheDocument()
    })

    it('reveals dropdown items on trigger click', async () => {
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Dropdown>
              <SealBreadcrumb.DropMenuItem>Documentation</SealBreadcrumb.DropMenuItem>
            </SealBreadcrumb.Dropdown>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      const trigger = screen.getByRole('button', { name: DROPDOWN_TRIGGER_LABEL })
      fireEvent.click(trigger)
      expect(await screen.findByText('Documentation')).toBeInTheDocument()
    })
  })

  describe('SealBreadcrumb.DropMenuItem', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn()
      renderWithTheme(
        <SealBreadcrumb>
          <SealBreadcrumb.Item>
            <SealBreadcrumb.Dropdown>
              <SealBreadcrumb.DropMenuItem onClick={handleClick}>
                Settings
              </SealBreadcrumb.DropMenuItem>
            </SealBreadcrumb.Dropdown>
          </SealBreadcrumb.Item>
        </SealBreadcrumb>,
      )
      fireEvent.click(screen.getByRole('button', { name: DROPDOWN_TRIGGER_LABEL }))
      const item = await screen.findByText('Settings')
      fireEvent.click(item)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('displayNames', () => {
    it('exports correct displayNames on sub-components', () => {
      expect(SealBreadcrumb.Item.displayName).toBe('SealBreadcrumb.Item')
      expect(SealBreadcrumb.Link.displayName).toBe('SealBreadcrumb.Link')
      expect(SealBreadcrumb.Page.displayName).toBe('SealBreadcrumb.Page')
      expect(SealBreadcrumb.Separator.displayName).toBe('SealBreadcrumb.Separator')
      expect(SealBreadcrumb.Ellipsis.displayName).toBe('SealBreadcrumb.Ellipsis')
      expect(SealBreadcrumb.Dropdown.displayName).toBe('SealBreadcrumb.Dropdown')
      expect(SealBreadcrumb.DropMenuItem.displayName).toBe('SealBreadcrumb.DropMenuItem')
    })
  })
})
