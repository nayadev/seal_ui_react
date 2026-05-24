import { screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealContainer } from './SealContainer'

describe('SealContainer', () => {
  describe('rendering', () => {
    it('renders children', () => {
      renderWithTheme(<SealContainer>Hello</SealContainer>)
      expect(screen.getByText('Hello')).toBeInTheDocument()
    })

    it('renders as a div', () => {
      const { container } = renderWithTheme(<SealContainer>content</SealContainer>)
      expect(container.firstChild?.nodeName).toBe('DIV')
    })
  })

  describe('default tokens', () => {
    it('applies surface background by default', () => {
      const { container } = renderWithTheme(<SealContainer>content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.background).toBe('var(--seal-surface-surface)')
    })

    it('applies md padding by default', () => {
      const { container } = renderWithTheme(<SealContainer>content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.padding).toBe('var(--seal-dimension-md)')
    })

    it('applies md border-radius by default', () => {
      const { container } = renderWithTheme(<SealContainer>content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.borderRadius).toBe('var(--seal-radius-md)')
    })
  })

  describe('border', () => {
    it('shows border by default', () => {
      const { container } = renderWithTheme(<SealContainer>content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.borderColor).toBe('var(--seal-border-default)')
    })

    it('hides border when showBorder is false', () => {
      const { container } = renderWithTheme(
        <SealContainer showBorder={false}>content</SealContainer>,
      )
      const el = container.firstChild as HTMLElement
      expect(el.style.borderColor).toBe('transparent')
    })
  })

  describe('background', () => {
    it('applies custom color when provided', () => {
      const { container } = renderWithTheme(<SealContainer color="#ff0000">content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.background).toBe('rgb(255, 0, 0)')
    })

    it('applies gradient when provided', () => {
      const gradient = 'linear-gradient(to right, red, blue)'
      const { container } = renderWithTheme(
        <SealContainer gradient={gradient}>content</SealContainer>,
      )
      const el = container.firstChild as HTMLElement
      expect(el.style.background).toBe(gradient)
    })

    it('gradient takes precedence over color', () => {
      const gradient = 'linear-gradient(to right, red, blue)'
      const { container } = renderWithTheme(
        <SealContainer color="#ff0000" gradient={gradient}>
          content
        </SealContainer>,
      )
      const el = container.firstChild as HTMLElement
      expect(el.style.background).toBe(gradient)
    })
  })

  describe('sizing', () => {
    it('applies numeric width as px', () => {
      const { container } = renderWithTheme(<SealContainer width={320}>content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.width).toBe('320px')
    })

    it('applies string width directly', () => {
      const { container } = renderWithTheme(<SealContainer width="50%">content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.width).toBe('50%')
    })

    it('applies numeric height as px', () => {
      const { container } = renderWithTheme(<SealContainer height={100}>content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.height).toBe('100px')
    })

    it('applies string height directly', () => {
      const { container } = renderWithTheme(<SealContainer height="50vh">content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.height).toBe('50vh')
    })
  })

  describe('customization', () => {
    it('applies custom padding', () => {
      const { container } = renderWithTheme(<SealContainer padding="32px">content</SealContainer>)
      const el = container.firstChild as HTMLElement
      expect(el.style.padding).toBe('32px')
    })

    it('applies custom margin', () => {
      const { container } = renderWithTheme(
        <SealContainer margin="16px 8px">content</SealContainer>,
      )
      const el = container.firstChild as HTMLElement
      expect(el.style.margin).toBe('16px 8px')
    })

    it('applies custom borderRadius', () => {
      const { container } = renderWithTheme(
        <SealContainer borderRadius="var(--seal-radius-lg)">content</SealContainer>,
      )
      const el = container.firstChild as HTMLElement
      expect(el.style.borderRadius).toBe('var(--seal-radius-lg)')
    })

    it('forwards className', () => {
      const { container } = renderWithTheme(
        <SealContainer className="custom-class">content</SealContainer>,
      )
      const el = container.firstChild as HTMLElement
      expect(el).toHaveClass('custom-class')
    })
  })
})
