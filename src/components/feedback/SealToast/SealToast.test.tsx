import type * as SonnerModule from 'sonner'
import { toast } from 'sonner'
import { vi } from 'vitest'

import { SealToast } from './SealToast'

vi.mock('sonner', async (importOriginal) => {
  const actual = await importOriginal<typeof SonnerModule>()
  const mockFn = vi.fn(() => 'toast-id')
  return {
    ...actual,
    toast: Object.assign(mockFn, {
      info: vi.fn(() => 'info-id'),
      success: vi.fn(() => 'success-id'),
      warning: vi.fn(() => 'warning-id'),
      error: vi.fn(() => 'error-id'),
      dismiss: vi.fn(),
    }),
  }
})

interface MockToast {
  (...args: unknown[]): unknown
  info: ReturnType<typeof vi.fn>
  success: ReturnType<typeof vi.fn>
  warning: ReturnType<typeof vi.fn>
  error: ReturnType<typeof vi.fn>
  dismiss: ReturnType<typeof vi.fn>
  mock: { calls: unknown[][] }
}

const MOCK_TOAST = toast as unknown as MockToast

type CallArgs = [string, Record<string, unknown>]

interface HasMockCalls {
  mock: { calls: unknown[][] }
}

function getCall(mock: HasMockCalls, index = 0): CallArgs {
  return (mock.mock.calls[index] ?? ['', {}]) as CallArgs
}

describe('SealToast', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('variant methods', () => {
    it('info calls toast.info with the message as title', () => {
      SealToast.info({ message: 'Hello info' })
      const [title] = getCall(MOCK_TOAST.info)
      expect(title).toBe('Hello info')
    })

    it('success calls toast.success with the message as title', () => {
      SealToast.success({ message: 'Saved!' })
      const [title] = getCall(MOCK_TOAST.success)
      expect(title).toBe('Saved!')
    })

    it('warning calls toast.warning with the message as title', () => {
      SealToast.warning({ message: 'Low storage' })
      const [title] = getCall(MOCK_TOAST.warning)
      expect(title).toBe('Low storage')
    })

    it('error calls toast.error with the message as title', () => {
      SealToast.error({ message: 'Upload failed' })
      const [title] = getCall(MOCK_TOAST.error)
      expect(title).toBe('Upload failed')
    })
  })

  describe('title and description mapping', () => {
    it('uses title as toast message and message as description when title is provided', () => {
      SealToast.info({ message: 'You can add components via the CLI.', title: 'Heads up!' })
      const [title, opts] = getCall(MOCK_TOAST.info)
      expect(title).toBe('Heads up!')
      expect(opts.description).toBe('You can add components via the CLI.')
    })

    it('uses message as toast title and omits description when no title', () => {
      SealToast.success({ message: 'Profile saved.' })
      const [, opts] = getCall(MOCK_TOAST.success)
      expect(opts).not.toHaveProperty('description')
    })
  })

  describe('options forwarding', () => {
    it('forwards custom duration', () => {
      SealToast.info({ message: 'Quick!', duration: 2000 })
      const [, opts] = getCall(MOCK_TOAST.info)
      expect(opts.duration).toBe(2000)
    })

    it('defaults to 5000 ms duration', () => {
      SealToast.success({ message: 'Done' })
      const [, opts] = getCall(MOCK_TOAST.success)
      expect(opts.duration).toBe(5000)
    })

    it('forwards action label and onClick', () => {
      const onClick = vi.fn()
      SealToast.error({ message: 'Failed.', action: { label: 'Retry', onClick } })
      const [, opts] = getCall(MOCK_TOAST.error)
      const action = opts.action as { label: string; onClick: () => void }
      expect(action.label).toBe('Retry')
      expect(action.onClick).toBe(onClick)
    })

    it('applies accent color to action button style', () => {
      SealToast.error({ message: 'Failed.', action: { label: 'Retry', onClick: vi.fn() } })
      const [, opts] = getCall(MOCK_TOAST.error)
      const style = (opts.actionButtonStyle ?? {}) as Record<string, string>
      expect(style.color).toBe('var(--seal-semantic-error)')
    })

    it('applies token background and border styles', () => {
      SealToast.success({ message: 'Done' })
      const [, opts] = getCall(MOCK_TOAST.success)
      const style = (opts.style ?? {}) as Record<string, string>
      expect(style.background).toBe('var(--seal-surface-surface-alt)')
      // Border is tinted with the variant's accent color (matches Flutter's ShadBorder approach)
      expect(style.border).toBe(
        '1px solid color-mix(in srgb, var(--seal-semantic-success) 35%, transparent)',
      )
    })
  })

  describe('custom variant', () => {
    it('calls toast() for the custom variant', () => {
      SealToast.custom({ message: 'Synced.' })
      const [title] = getCall(MOCK_TOAST)
      expect(title).toBe('Synced.')
    })

    it('accepts a color override', () => {
      SealToast.custom({ message: 'Done.', color: '#00BCD4' })
      const [title] = getCall(MOCK_TOAST)
      expect(title).toBe('Done.')
    })

    it('passes an icon element in options when icon is provided', () => {
      const MockIcon = () => null
      SealToast.custom({ message: 'With icon.', icon: MockIcon })
      const [, opts] = getCall(MOCK_TOAST)
      expect(opts).toHaveProperty('icon')
    })

    it('omits icon from options when no icon is provided', () => {
      SealToast.custom({ message: 'No icon.' })
      const [, opts] = getCall(MOCK_TOAST)
      expect(opts).not.toHaveProperty('icon')
    })
  })

  describe('dismiss', () => {
    it('calls toast.dismiss with the given id', () => {
      SealToast.dismiss('toast-1')
      expect(MOCK_TOAST.dismiss).toHaveBeenCalledWith('toast-1')
    })

    it('calls toast.dismiss with no args when id is omitted', () => {
      SealToast.dismiss()
      expect(MOCK_TOAST.dismiss).toHaveBeenCalledWith(undefined)
    })
  })
})
