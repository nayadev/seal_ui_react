import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithTheme } from '../../../../test/utils'

import { SealTabs } from './SealTabs'

function DefaultTabs({ defaultValue = 'tab1' }: Readonly<{ defaultValue?: string }>) {
  return (
    <SealTabs defaultValue={defaultValue}>
      <SealTabs.List>
        <SealTabs.Trigger value="tab1">Tab One</SealTabs.Trigger>
        <SealTabs.Trigger value="tab2">Tab Two</SealTabs.Trigger>
        <SealTabs.Trigger value="tab3" disabled>
          Disabled
        </SealTabs.Trigger>
      </SealTabs.List>
      <SealTabs.Content value="tab1">Content One</SealTabs.Content>
      <SealTabs.Content value="tab2">Content Two</SealTabs.Content>
      <SealTabs.Content value="tab3">Content Three</SealTabs.Content>
    </SealTabs>
  )
}

describe('SealTabs', () => {
  describe('rendering', () => {
    it('renders without error', () => {
      const { container } = renderWithTheme(<DefaultTabs />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('renders all triggers', () => {
      renderWithTheme(<DefaultTabs />)
      expect(screen.getByRole('tab', { name: 'Tab One' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Tab Two' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Disabled' })).toBeInTheDocument()
    })

    it('shows the active tab panel by default', () => {
      renderWithTheme(<DefaultTabs defaultValue="tab1" />)
      expect(screen.getByText('Content One')).toBeVisible()
    })
  })

  describe('states', () => {
    it('marks the default tab trigger as active', () => {
      renderWithTheme(<DefaultTabs defaultValue="tab1" />)
      const trigger = screen.getByRole('tab', { name: 'Tab One' })
      expect(trigger).toHaveAttribute('data-state', 'active')
    })

    it('marks other triggers as inactive', () => {
      renderWithTheme(<DefaultTabs defaultValue="tab1" />)
      const trigger = screen.getByRole('tab', { name: 'Tab Two' })
      expect(trigger).toHaveAttribute('data-state', 'inactive')
    })

    it('marks the disabled trigger with aria-disabled', () => {
      renderWithTheme(<DefaultTabs />)
      const trigger = screen.getByRole('tab', { name: 'Disabled' })
      expect(trigger).toBeDisabled()
    })
  })

  describe('interaction', () => {
    it('switches the active panel when a trigger is clicked', async () => {
      const user = userEvent.setup()
      renderWithTheme(<DefaultTabs defaultValue="tab1" />)
      await user.click(screen.getByRole('tab', { name: 'Tab Two' }))
      expect(screen.getByText('Content Two')).toBeInTheDocument()
    })

    it('calls onValueChange with the new tab value', async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      renderWithTheme(
        <SealTabs defaultValue="tab1" onValueChange={onValueChange}>
          <SealTabs.List>
            <SealTabs.Trigger value="tab1">Tab One</SealTabs.Trigger>
            <SealTabs.Trigger value="tab2">Tab Two</SealTabs.Trigger>
          </SealTabs.List>
          <SealTabs.Content value="tab1">Content One</SealTabs.Content>
          <SealTabs.Content value="tab2">Content Two</SealTabs.Content>
        </SealTabs>,
      )
      await user.click(screen.getByRole('tab', { name: 'Tab Two' }))
      expect(onValueChange).toHaveBeenCalledWith('tab2')
    })

    it('does not switch panel when a disabled trigger is clicked', async () => {
      const user = userEvent.setup()
      renderWithTheme(<DefaultTabs defaultValue="tab1" />)
      await user.click(screen.getByRole('tab', { name: 'Disabled' }))
      expect(screen.getByText('Content One')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('renders a tablist role', () => {
      renderWithTheme(<DefaultTabs />)
      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('associates each trigger with its panel via aria-controls / id', () => {
      renderWithTheme(<DefaultTabs />)
      const trigger = screen.getByRole('tab', { name: 'Tab One' })
      const controlsId = trigger.getAttribute('aria-controls')
      expect(controlsId).toBeTruthy()
      if (controlsId) {
        const panel = document.getElementById(controlsId)
        expect(panel).toBeInTheDocument()
      }
    })
  })

  describe('sub-components', () => {
    it('SealTabs.List has correct displayName', () => {
      expect(SealTabs.List.displayName).toBe('SealTabs.List')
    })

    it('SealTabs.Trigger has correct displayName', () => {
      expect(SealTabs.Trigger.displayName).toBe('SealTabs.Trigger')
    })

    it('SealTabs.Content has correct displayName', () => {
      expect(SealTabs.Content.displayName).toBe('SealTabs.Content')
    })
  })

  describe('className forwarding', () => {
    it('forwards className to root', () => {
      const { container } = renderWithTheme(
        <SealTabs defaultValue="t1" className="custom-tabs">
          <SealTabs.List>
            <SealTabs.Trigger value="t1">T1</SealTabs.Trigger>
          </SealTabs.List>
          <SealTabs.Content value="t1">C1</SealTabs.Content>
        </SealTabs>,
      )
      expect(container.firstChild).toHaveClass('custom-tabs')
    })
  })
})
