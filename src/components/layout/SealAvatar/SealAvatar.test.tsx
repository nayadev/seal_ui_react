import { screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealAvatar } from './SealAvatar'

describe('SealAvatar', () => {
  describe('rendering', () => {
    it('renders without crashing with no props', () => {
      renderWithTheme(<SealAvatar />)
    })

    it('renders fallback content when src is absent', () => {
      renderWithTheme(<SealAvatar fallback="JD" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('renders without crashing when src is provided', () => {
      // Radix AvatarImage renders the img only after the load event fires.
      // In JSDOM images never load, so the fallback remains visible — this
      // test simply verifies the component mounts without errors.
      renderWithTheme(
        <SealAvatar src="https://example.com/photo.jpg" alt="Jane Doe" fallback="JD" />,
      )
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('renders a ReactNode as fallback', () => {
      renderWithTheme(<SealAvatar fallback={<span data-testid="custom-fallback">AB</span>} />)
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
    })
  })

  describe('sizes', () => {
    it('renders at 40px by default', () => {
      const { container } = renderWithTheme(<SealAvatar fallback="MD" />)
      const root = container.firstChild as HTMLElement
      expect(root).toHaveStyle({
        width: 'calc(var(--seal-dimension-xl) + var(--seal-dimension-xs))',
        height: 'calc(var(--seal-dimension-xl) + var(--seal-dimension-xs))',
      })
    })

    it('SealAvatar.Small renders at 28px', () => {
      const { container } = renderWithTheme(<SealAvatar.Small fallback="SM" />)
      const root = container.firstChild as HTMLElement
      expect(root).toHaveStyle({
        width: 'calc(var(--seal-dimension-lg) + var(--seal-dimension-xxs))',
        height: 'calc(var(--seal-dimension-lg) + var(--seal-dimension-xxs))',
      })
    })

    it('SealAvatar.Large renders at 56px', () => {
      const { container } = renderWithTheme(<SealAvatar.Large fallback="LG" />)
      const root = container.firstChild as HTMLElement
      expect(root).toHaveStyle({
        width: 'calc(var(--seal-dimension-xxl) + var(--seal-dimension-xs))',
        height: 'calc(var(--seal-dimension-xxl) + var(--seal-dimension-xs))',
      })
    })
  })

  describe('className', () => {
    it('applies additional className to the root element', () => {
      const { container } = renderWithTheme(<SealAvatar className="ring-2" />)
      expect(container.firstChild).toHaveClass('ring-2')
    })
  })

  describe('displayNames', () => {
    it('exports correct displayName on sub-components', () => {
      expect(SealAvatar.Small.displayName).toBe('SealAvatar.Small')
      expect(SealAvatar.Large.displayName).toBe('SealAvatar.Large')
    })
  })
})
