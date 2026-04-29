import { render, screen } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealSonner } from './SealSonner'

describe('SealSonner', () => {
  describe('rendering', () => {
    it('renders without error', () => {
      const { container } = renderWithTheme(<SealSonner />)
      expect(container).toBeInTheDocument()
    })

    it('renders children alongside the toaster', () => {
      renderWithTheme(
        <SealSonner>
          <p>App content</p>
        </SealSonner>,
      )
      expect(screen.getByText('App content')).toBeInTheDocument()
    })

    it('renders without children', () => {
      const { container } = renderWithTheme(<SealSonner />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('props', () => {
    it('accepts a position prop without error', () => {
      const { container } = renderWithTheme(<SealSonner position="top-center" />)
      expect(container).toBeInTheDocument()
    })

    it('accepts a visibleToasts prop without error', () => {
      const { container } = renderWithTheme(<SealSonner visibleToasts={5} />)
      expect(container).toBeInTheDocument()
    })

    it('accepts an offset prop without error', () => {
      const { container } = renderWithTheme(<SealSonner offset={24} />)
      expect(container).toBeInTheDocument()
    })
  })

  describe('render outside ThemeProvider', () => {
    it('renders without crashing when no ThemeProvider is present', () => {
      const { container } = render(<SealSonner />)
      expect(container).toBeInTheDocument()
    })
  })
})
