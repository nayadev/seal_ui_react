import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithTheme } from '../../../../test/utils'

import { SealCard } from './SealCard'

const ROLE_BUTTON = 'button'
const SELECTOR_SEPARATOR = '[role="separator"]'

describe('SealCard', () => {
  describe('rendering', () => {
    it('renders header content', () => {
      renderWithTheme(<SealCard header={<span>Header</span>} />)
      expect(screen.getByText('Header')).toBeInTheDocument()
    })

    it('renders body content', () => {
      renderWithTheme(<SealCard body={<span>Body content</span>} />)
      expect(screen.getByText('Body content')).toBeInTheDocument()
    })

    it('renders footer content', () => {
      renderWithTheme(<SealCard footer={<span>Footer</span>} />)
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('renders all three sections together', () => {
      renderWithTheme(
        <SealCard
          header={<span>Header</span>}
          body={<span>Body</span>}
          footer={<span>Footer</span>}
        />,
      )
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Body')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('renders without any section — empty card shell', () => {
      const { container } = renderWithTheme(<SealCard />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('divider', () => {
    it('shows a separator between header and body', () => {
      renderWithTheme(<SealCard header={<span>H</span>} body={<span>B</span>} />)
      expect(screen.getByRole('separator', { hidden: true })).toBeInTheDocument()
    })

    it('does not show a separator with only body', () => {
      const { container } = renderWithTheme(<SealCard body={<span>Only body</span>} />)
      expect(container.querySelector(SELECTOR_SEPARATOR)).toBeNull()
    })

    it('does not show a separator with only header', () => {
      const { container } = renderWithTheme(<SealCard header={<span>Only header</span>} />)
      expect(container.querySelector(SELECTOR_SEPARATOR)).toBeNull()
    })

    it('does not show a separator when only footer is provided', () => {
      const { container } = renderWithTheme(<SealCard footer={<span>Footer only</span>} />)
      expect(container.querySelector(SELECTOR_SEPARATOR)).toBeNull()
    })
  })

  describe('variants', () => {
    it('renders default variant via SealCard.Default', () => {
      const { container } = renderWithTheme(<SealCard.Default body={<span>Default</span>} />)
      expect(screen.getByText('Default')).toBeInTheDocument()
      const card = container.firstChild as HTMLElement
      expect(card.style.background).toBe('var(--seal-surface-surface)')
    })

    it('renders gradient variant via SealCard.Gradient', () => {
      const { container } = renderWithTheme(<SealCard.Gradient body={<span>Gradient</span>} />)
      expect(screen.getByText('Gradient')).toBeInTheDocument()
      const card = container.firstChild as HTMLElement
      expect(card.style.background).toBe('var(--seal-gradient-surface)')
    })

    it('renders default variant via variant prop', () => {
      const { container } = renderWithTheme(
        <SealCard variant="default" body={<span>Default</span>} />,
      )
      const card = container.firstChild as HTMLElement
      expect(card.style.background).toBe('var(--seal-surface-surface)')
    })

    it('renders gradient variant via variant prop', () => {
      const { container } = renderWithTheme(
        <SealCard variant="gradient" body={<span>Gradient</span>} />,
      )
      const card = container.firstChild as HTMLElement
      expect(card.style.background).toBe('var(--seal-gradient-surface)')
    })
  })

  describe('border', () => {
    it('shows border by default', () => {
      const { container } = renderWithTheme(<SealCard body={<span>Content</span>} />)
      const card = container.firstChild as HTMLElement
      expect(card.style.borderColor).toBe('var(--seal-border-default)')
    })

    it('hides border when showBorder is false', () => {
      const { container } = renderWithTheme(
        <SealCard showBorder={false} body={<span>No border</span>} />,
      )
      const card = container.firstChild as HTMLElement
      expect(card.style.borderColor).toBe('transparent')
    })
  })

  describe('width', () => {
    it('applies numeric width as px', () => {
      const { container } = renderWithTheme(<SealCard width={320} body={<span>Sized</span>} />)
      const card = container.firstChild as HTMLElement
      expect(card.style.width).toBe('320px')
    })

    it('applies string width directly', () => {
      const { container } = renderWithTheme(<SealCard width="50%" body={<span>Sized</span>} />)
      const card = container.firstChild as HTMLElement
      expect(card.style.width).toBe('50%')
    })
  })

  describe('interaction', () => {
    it('does not have role=button when onClick is absent', () => {
      renderWithTheme(<SealCard body={<span>Static</span>} />)
      expect(screen.queryByRole(ROLE_BUTTON)).toBeNull()
    })

    it('has role=button when onClick is provided', () => {
      renderWithTheme(<SealCard body={<span>Clickable</span>} onClick={() => undefined} />)
      expect(screen.getByRole(ROLE_BUTTON)).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn()
      renderWithTheme(<SealCard body={<span>Tap me</span>} onClick={handleClick} />)
      await userEvent.click(screen.getByRole(ROLE_BUTTON))
      expect(handleClick).toHaveBeenCalledOnce()
    })

    it('calls onClick on Enter keydown', async () => {
      const handleClick = vi.fn()
      renderWithTheme(<SealCard body={<span>Key me</span>} onClick={handleClick} />)
      screen.getByRole(ROLE_BUTTON).focus()
      await userEvent.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledOnce()
    })

    it('calls onClick on Space keydown', async () => {
      const handleClick = vi.fn()
      renderWithTheme(<SealCard body={<span>Space me</span>} onClick={handleClick} />)
      screen.getByRole(ROLE_BUTTON).focus()
      await userEvent.keyboard(' ')
      expect(handleClick).toHaveBeenCalledOnce()
    })
  })

  describe('compound sub-components', () => {
    it('SealCard.Default has correct displayName', () => {
      expect(SealCard.Default.displayName).toBe('SealCard.Default')
    })

    it('SealCard.Gradient has correct displayName', () => {
      expect(SealCard.Gradient.displayName).toBe('SealCard.Gradient')
    })

    it('SealCard.Gradient hides border by default', () => {
      const { container } = renderWithTheme(<SealCard.Gradient body={<span>G</span>} />)
      const card = container.firstChild as HTMLElement
      expect(card.style.borderColor).toBe('transparent')
    })
  })

  describe('accessibility', () => {
    it('is accessible as a static region when no onClick', () => {
      const { container } = renderWithTheme(<SealCard body={<span>Read only</span>} />)
      const card = container.firstChild as HTMLElement
      expect(card.getAttribute('role')).toBeNull()
      expect(card.getAttribute('tabindex')).toBeNull()
    })

    it('is focusable when interactive', () => {
      renderWithTheme(<SealCard body={<span>Interactive</span>} onClick={() => undefined} />)
      const button = screen.getByRole(ROLE_BUTTON)
      expect(button).toHaveAttribute('tabindex', '0')
    })
  })
})
