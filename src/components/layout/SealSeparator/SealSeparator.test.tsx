import { renderWithTheme } from '../../../../test/utils'

import { SealSeparator } from './SealSeparator'

const DATA_ORIENTATION = 'data-orientation'

describe('SealSeparator', () => {
  describe('rendering', () => {
    it('renders without error', () => {
      const { container } = renderWithTheme(<SealSeparator />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders as horizontal by default', () => {
      const { container } = renderWithTheme(<SealSeparator />)
      const el = container.firstChild as HTMLElement
      expect(el).toHaveAttribute(DATA_ORIENTATION, 'horizontal')
    })

    it('applies border token class', () => {
      const { container } = renderWithTheme(<SealSeparator />)
      const el = container.firstChild as HTMLElement
      expect(el.className).toContain('bg-[var(--seal-border-default)]')
    })

    it('forwards className', () => {
      const { container } = renderWithTheme(<SealSeparator className="my-4" />)
      const el = container.firstChild as HTMLElement
      expect(el).toHaveClass('my-4')
    })
  })

  describe('orientation', () => {
    it('renders vertical when orientation prop is set', () => {
      const { container } = renderWithTheme(<SealSeparator orientation="vertical" />)
      const el = container.firstChild as HTMLElement
      expect(el).toHaveAttribute(DATA_ORIENTATION, 'vertical')
    })
  })

  describe('accessibility', () => {
    it('is decorative by default — hidden from assistive technology', () => {
      const { container } = renderWithTheme(<SealSeparator />)
      const el = container.firstChild as HTMLElement
      expect(el).toHaveAttribute('role', 'none')
    })

    it('exposes separator role when decorative is false', () => {
      const { container } = renderWithTheme(<SealSeparator decorative={false} />)
      const el = container.firstChild as HTMLElement
      expect(el).toHaveAttribute('role', 'separator')
    })
  })

  describe('SealSeparator.Horizontal', () => {
    it('renders with horizontal orientation', () => {
      const { container } = renderWithTheme(<SealSeparator.Horizontal />)
      const el = container.firstChild as HTMLElement
      expect(el).toHaveAttribute(DATA_ORIENTATION, 'horizontal')
    })
  })

  describe('SealSeparator.Vertical', () => {
    it('renders with vertical orientation', () => {
      const { container } = renderWithTheme(<SealSeparator.Vertical />)
      const el = container.firstChild as HTMLElement
      expect(el).toHaveAttribute(DATA_ORIENTATION, 'vertical')
    })
  })
})
