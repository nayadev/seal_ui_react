import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithTheme } from '../../../../test/utils'

import { SealAccordion } from './SealAccordion'
import type { SealAccordionItemData } from './SealAccordion'

const TITLE_Q1 = 'What is Seal UI?'
const TITLE_Q2 = 'How do I install it?'
const TITLE_Q3 = 'Does it support dark mode?'
const CONTENT_Q1 = 'A token-driven Flutter design system.'
const CONTENT_Q2 = 'Add seal_ui to your pubspec.yaml.'
const CONTENT_Q3 = 'Yes — dark mode is the primary experience.'

const items: SealAccordionItemData[] = [
  { value: 'q1', title: TITLE_Q1, content: CONTENT_Q1 },
  { value: 'q2', title: TITLE_Q2, content: CONTENT_Q2 },
  { value: 'q3', title: TITLE_Q3, content: CONTENT_Q3 },
]

describe('SealAccordion', () => {
  describe('rendering', () => {
    it('renders all item titles', () => {
      renderWithTheme(<SealAccordion items={items} />)
      expect(screen.getByText(TITLE_Q1)).toBeInTheDocument()
      expect(screen.getByText(TITLE_Q2)).toBeInTheDocument()
      expect(screen.getByText(TITLE_Q3)).toBeInTheDocument()
    })

    it('renders without crashing with minimum required props', () => {
      renderWithTheme(
        <SealAccordion items={[{ value: 'a', title: 'Title', content: 'Content' }]} />,
      )
      expect(screen.getByText('Title')).toBeInTheDocument()
    })

    it('hides content before expanding', () => {
      renderWithTheme(<SealAccordion items={items} />)
      expect(screen.queryByText(CONTENT_Q1)).not.toBeInTheDocument()
    })
  })

  describe('interaction', () => {
    it('expands item when trigger is clicked', async () => {
      renderWithTheme(<SealAccordion items={items} />)
      fireEvent.click(screen.getByText(TITLE_Q1))
      await waitFor(() => {
        expect(screen.getByText(CONTENT_Q1)).toBeVisible()
      })
    })

    it('collapses expanded item when clicked again (collapsible=true)', async () => {
      renderWithTheme(<SealAccordion items={items} defaultValue="q1" collapsible />)
      await waitFor(() => {
        expect(screen.getByText(CONTENT_Q1)).toBeVisible()
      })
      fireEvent.click(screen.getByText(TITLE_Q1))
      await waitFor(() => {
        expect(screen.queryByText(CONTENT_Q1)).not.toBeInTheDocument()
      })
    })

    it('calls onValueChange when an item is expanded', () => {
      const onValueChange = vi.fn()
      renderWithTheme(<SealAccordion items={items} onValueChange={onValueChange} />)
      fireEvent.click(screen.getByText(TITLE_Q1))
      expect(onValueChange).toHaveBeenCalledWith('q1')
    })

    it('closes the previous item when another is opened (single mode)', async () => {
      renderWithTheme(<SealAccordion items={items} defaultValue="q1" />)
      await waitFor(() => {
        expect(screen.getByText(CONTENT_Q1)).toBeVisible()
      })
      fireEvent.click(screen.getByText(TITLE_Q2))
      await waitFor(() => {
        expect(screen.queryByText(CONTENT_Q1)).not.toBeInTheDocument()
        expect(screen.getByText(CONTENT_Q2)).toBeInTheDocument()
      })
    })
  })

  describe('defaultValue', () => {
    it('renders with the specified item pre-expanded', async () => {
      renderWithTheme(<SealAccordion items={items} defaultValue="q2" />)
      await waitFor(() => {
        expect(screen.getByText(CONTENT_Q2)).toBeVisible()
      })
    })
  })

  describe('disabled', () => {
    it('disables the item trigger when disabled=true', () => {
      const disabledItems: SealAccordionItemData[] = [
        { value: 'a', title: 'Disabled item', content: 'Hidden', disabled: true },
      ]
      renderWithTheme(<SealAccordion items={disabledItems} />)
      const trigger = screen.getByRole('button', { name: 'Disabled item' })
      expect(trigger).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('renders trigger buttons with correct aria-expanded state', async () => {
      renderWithTheme(<SealAccordion items={items} />)
      const trigger = screen.getByRole('button', { name: 'What is Seal UI?' })
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(trigger)
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
      })
    })
  })

  describe('SealAccordion.Multiple', () => {
    it('renders all item titles', () => {
      renderWithTheme(<SealAccordion.Multiple items={items} />)
      expect(screen.getByText(TITLE_Q1)).toBeInTheDocument()
      expect(screen.getByText(TITLE_Q2)).toBeInTheDocument()
      expect(screen.getByText(TITLE_Q3)).toBeInTheDocument()
    })

    it('allows multiple items to be open simultaneously', async () => {
      renderWithTheme(<SealAccordion.Multiple items={items} defaultValue={['q1', 'q3']} />)
      await waitFor(() => {
        expect(screen.getByText(CONTENT_Q1)).toBeVisible()
        expect(screen.getByText(CONTENT_Q3)).toBeVisible()
      })
    })

    it('does not close other items when a new item is opened', async () => {
      renderWithTheme(<SealAccordion.Multiple items={items} defaultValue={['q1']} />)
      await waitFor(() => {
        expect(screen.getByText(CONTENT_Q1)).toBeVisible()
      })
      fireEvent.click(screen.getByText(TITLE_Q2))
      await waitFor(() => {
        expect(screen.getByText(CONTENT_Q1)).toBeVisible()
        expect(screen.getByText(CONTENT_Q2)).toBeVisible()
      })
    })

    it('calls onValueChange with all open values', () => {
      const onValueChange = vi.fn()
      renderWithTheme(
        <SealAccordion.Multiple
          items={items}
          defaultValue={['q1']}
          onValueChange={onValueChange}
        />,
      )
      fireEvent.click(screen.getByText(TITLE_Q2))
      expect(onValueChange).toHaveBeenCalledWith(['q1', 'q2'])
    })
  })
})
