import { zodResolver } from '@hookform/resolvers/zod'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { renderWithTheme } from '../../../../test/utils'

import {
  SealForm,
  SealFormControl,
  SealFormDescription,
  SealFormField,
  SealFormItem,
  SealFormLabel,
  SealFormMessage,
  useFormField,
} from './SealForm'

// ---------------------------------------------------------------------------
// Minimal controlled form harness
// ---------------------------------------------------------------------------

const schema = z.object({
  email: z.email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
})

type FormValues = z.infer<typeof schema>

function TestForm({
  onSubmit = vi.fn(),
  defaultValues = { email: '', name: '' },
}: {
  readonly onSubmit?: (values: FormValues) => void
  readonly defaultValues?: Partial<FormValues>
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <SealForm {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e)
        }}
        noValidate
      >
        <SealFormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <SealFormItem>
              <SealFormLabel>Email</SealFormLabel>
              <SealFormControl>
                <input aria-label="email" type="email" {...field} />
              </SealFormControl>
              <SealFormDescription>Enter your email address.</SealFormDescription>
              <SealFormMessage />
            </SealFormItem>
          )}
        />
        <SealFormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <SealFormItem>
              <SealFormLabel>Name</SealFormLabel>
              <SealFormControl>
                <input aria-label="name" type="text" {...field} />
              </SealFormControl>
              <SealFormMessage />
            </SealFormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </SealForm>
  )
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('SealForm', () => {
  describe('rendering', () => {
    it('renders the form without errors', () => {
      renderWithTheme(<TestForm />)
      expect(screen.getByLabelText('email')).toBeInTheDocument()
      expect(screen.getByLabelText('name')).toBeInTheDocument()
    })

    it('renders labels', () => {
      renderWithTheme(<TestForm />)
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
    })

    it('renders description text', () => {
      renderWithTheme(<TestForm />)
      expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    })

    it('does not render error message when field is pristine', () => {
      renderWithTheme(<TestForm />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('validation', () => {
    it('shows error message after invalid submission', async () => {
      renderWithTheme(<TestForm />)
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
      await waitFor(() => {
        expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
      })
    })

    it('shows the correct error message for invalid email', async () => {
      renderWithTheme(<TestForm />)
      fireEvent.change(screen.getByLabelText('email'), { target: { value: 'not-an-email' } })
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      })
    })

    it('shows required error for empty name', async () => {
      renderWithTheme(<TestForm />)
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
      })
    })

    it('calls onSubmit with valid data', async () => {
      const handleSubmit = vi.fn()
      renderWithTheme(<TestForm onSubmit={handleSubmit} />)
      fireEvent.change(screen.getByLabelText('email'), { target: { value: 'user@example.com' } })
      fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Alice' } })
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          { email: 'user@example.com', name: 'Alice' },
          expect.anything(),
        )
      })
    })

    it('does not call onSubmit when fields are invalid', async () => {
      const handleSubmit = vi.fn()
      renderWithTheme(<TestForm onSubmit={handleSubmit} />)
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
      await waitFor(() => {
        expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
      })
      expect(handleSubmit).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('links label to control via htmlFor', () => {
      renderWithTheme(<TestForm />)
      const label = screen.getByText('Email')
      const input = screen.getByLabelText('email')
      expect(label).toHaveAttribute('for', input.id)
    })

    it('sets aria-invalid on control when field has an error', async () => {
      renderWithTheme(<TestForm />)
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
      await waitFor(() => {
        expect(screen.getByLabelText('name')).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('sets aria-invalid to false when field is valid', () => {
      renderWithTheme(<TestForm />)
      expect(screen.getByLabelText('email')).toHaveAttribute('aria-invalid', 'false')
    })

    it('links control to description via aria-describedby when no error', () => {
      renderWithTheme(<TestForm />)
      const input = screen.getByLabelText('email')
      const description = screen.getByText('Enter your email address.')
      expect(input.getAttribute('aria-describedby')).toContain(description.id)
    })

    it('error message has role="alert"', async () => {
      renderWithTheme(<TestForm />)
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
      await waitFor(() => {
        const alerts = screen.getAllByRole('alert')
        expect(alerts.length).toBeGreaterThan(0)
      })
    })
  })

  describe('SealFormMessage children fallback', () => {
    it('renders children when there is no field error', () => {
      function FormWithStaticMessage() {
        const form = useForm({ defaultValues: { x: 'valid' } })
        return (
          <SealForm {...form}>
            <SealFormField
              control={form.control}
              name="x"
              render={({ field }) => (
                <SealFormItem>
                  <SealFormControl>
                    <input aria-label="x" {...field} />
                  </SealFormControl>
                  <SealFormMessage>Static helper</SealFormMessage>
                </SealFormItem>
              )}
            />
          </SealForm>
        )
      }
      renderWithTheme(<FormWithStaticMessage />)
      expect(screen.getByText('Static helper')).toBeInTheDocument()
    })
  })

  describe('useFormField context guard', () => {
    it('throws when used outside SealFormField', () => {
      function ThrowingChild() {
        useFormField()
        return null
      }

      function BadConsumer() {
        const form = useForm({ defaultValues: { x: '' } })
        return (
          <SealForm {...form}>
            <SealFormItem>
              <ThrowingChild />
            </SealFormItem>
          </SealForm>
        )
      }

      const spy = vi.spyOn(console, 'error').mockImplementation(vi.fn())
      expect(() => renderWithTheme(<BadConsumer />)).toThrow(
        'useFormField must be used within <SealFormField>',
      )
      spy.mockRestore()
    })
  })
})
