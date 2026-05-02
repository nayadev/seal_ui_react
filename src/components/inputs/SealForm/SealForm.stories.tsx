import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  SealForm,
  SealFormControl,
  SealFormDescription,
  SealFormField,
  SealFormItem,
  SealFormLabel,
  SealFormMessage,
} from './SealForm'

import { SealFilledButton } from '@/components/buttons/SealFilledButton'
import { SealCheckbox } from '@/components/inputs/SealCheckbox'
import { SealSelect } from '@/components/inputs/SealSelect'
import { SealTextField } from '@/components/inputs/SealTextField'

const meta = {
  title: 'Inputs/SealForm',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Default — simple login form
// ---------------------------------------------------------------------------

const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const [submitted, setSubmitted] = React.useState<string | null>(null)

  return (
    <div className="w-[360px]">
      <SealForm {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit((values) => {
              setSubmitted(values.email)
            })(e)
          }}
          noValidate
          className="flex flex-col gap-[var(--seal-dimension-md)]"
        >
          <SealFormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <SealFormItem>
                <SealFormLabel>Email</SealFormLabel>
                <SealFormControl>
                  <SealTextField
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    onChange={(v) => {
                      field.onChange(v)
                    }}
                  />
                </SealFormControl>
                <SealFormDescription>We will never share your email.</SealFormDescription>
                <SealFormMessage />
              </SealFormItem>
            )}
          />
          <SealFormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <SealFormItem>
                <SealFormLabel>Password</SealFormLabel>
                <SealFormControl>
                  <SealTextField
                    obscureText
                    placeholder="••••••••"
                    {...field}
                    onChange={(v) => {
                      field.onChange(v)
                    }}
                  />
                </SealFormControl>
                <SealFormMessage />
              </SealFormItem>
            )}
          />
          <SealFilledButton.Primary type="submit">Sign in</SealFilledButton.Primary>
          {submitted !== null && (
            <p
              style={{
                fontSize: 'var(--seal-style-caption-font-size)',
                color: 'var(--seal-text-secondary)',
                textAlign: 'center',
              }}
            >
              Signed in as {submitted}
            </p>
          )}
        </form>
      </SealForm>
    </div>
  )
}

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `const schema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

function LoginForm() {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } })

  return (
    <SealForm {...form}>
      <form onSubmit={(e) => { void form.handleSubmit(onSubmit)(e) }} noValidate>
        <SealFormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <SealFormItem>
              <SealFormLabel>Email</SealFormLabel>
              <SealFormControl>
                <SealTextField type="email" placeholder="you@example.com" {...field} onChange={(v) => { field.onChange(v) }} />
              </SealFormControl>
              <SealFormDescription>We will never share your email.</SealFormDescription>
              <SealFormMessage />
            </SealFormItem>
          )}
        />
        <SealFormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <SealFormItem>
              <SealFormLabel>Password</SealFormLabel>
              <SealFormControl>
                <SealTextField obscureText placeholder="••••••••" {...field} onChange={(v) => { field.onChange(v) }} />
              </SealFormControl>
              <SealFormMessage />
            </SealFormItem>
          )}
        />
        <SealFilledButton.Primary type="submit">Sign in</SealFilledButton.Primary>
      </form>
    </SealForm>
  )
}`,
      },
    },
  },
  render: () => <LoginForm />,
}

// ---------------------------------------------------------------------------
// WithValidationErrors — pre-triggered validation state
// ---------------------------------------------------------------------------

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  role: z.string().min(1, 'Please select a role'),
})

function ProfileFormWithErrors() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: 'ab', role: '' },
  })

  React.useEffect(() => {
    void form.trigger()
  }, [form])

  return (
    <div className="w-[360px]">
      <SealForm {...form}>
        <form noValidate className="flex flex-col gap-[var(--seal-dimension-md)]">
          <SealFormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <SealFormItem>
                <SealFormLabel>Username</SealFormLabel>
                <SealFormControl>
                  <SealTextField
                    placeholder="cooluser"
                    {...field}
                    onChange={(v) => {
                      field.onChange(v)
                    }}
                  />
                </SealFormControl>
                <SealFormMessage />
              </SealFormItem>
            )}
          />
          <SealFormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <SealFormItem>
                <SealFormLabel>Role</SealFormLabel>
                <SealFormControl>
                  <SealSelect
                    placeholder="Select a role"
                    options={[
                      { value: 'admin', label: 'Admin' },
                      { value: 'editor', label: 'Editor' },
                      { value: 'viewer', label: 'Viewer' },
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  />
                </SealFormControl>
                <SealFormMessage />
              </SealFormItem>
            )}
          />
        </form>
      </SealForm>
    </div>
  )
}

export const WithValidationErrors: Story = {
  parameters: {
    docs: {
      source: {
        code: `// Fields pre-validated to show error state styling`,
      },
    },
  },
  render: () => <ProfileFormWithErrors />,
}

// ---------------------------------------------------------------------------
// WithCheckbox — form with a checkbox field
// ---------------------------------------------------------------------------

const termsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  terms: z.boolean().refine((v) => v, 'You must accept the terms'),
})

function TermsForm() {
  const form = useForm<z.infer<typeof termsSchema>>({
    resolver: zodResolver(termsSchema),
    defaultValues: { name: '', terms: false },
  })

  const [submitted, setSubmitted] = React.useState(false)

  return (
    <div className="w-[360px]">
      <SealForm {...form}>
        <form
          onSubmit={(e) => {
            void form.handleSubmit(() => {
              setSubmitted(true)
            })(e)
          }}
          noValidate
          className="flex flex-col gap-[var(--seal-dimension-md)]"
        >
          <SealFormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <SealFormItem>
                <SealFormLabel>Full name</SealFormLabel>
                <SealFormControl>
                  <SealTextField
                    placeholder="Alice Seal"
                    {...field}
                    onChange={(v) => {
                      field.onChange(v)
                    }}
                  />
                </SealFormControl>
                <SealFormMessage />
              </SealFormItem>
            )}
          />
          <SealFormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <SealFormItem>
                <SealFormControl>
                  <SealCheckbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    label="I accept the terms and conditions"
                  />
                </SealFormControl>
                <SealFormMessage />
              </SealFormItem>
            )}
          />
          <SealFilledButton.Primary type="submit">Register</SealFilledButton.Primary>
          {submitted && (
            <p
              style={{
                fontSize: 'var(--seal-style-caption-font-size)',
                color: 'var(--seal-text-secondary)',
                textAlign: 'center',
              }}
            >
              Registered successfully!
            </p>
          )}
        </form>
      </SealForm>
    </div>
  )
}

export const WithCheckbox: Story = {
  parameters: {
    docs: {
      source: {
        code: `<SealForm {...form}>
  <form onSubmit={(e) => { void form.handleSubmit(onSubmit)(e) }} noValidate>
    <SealFormField
      control={form.control}
      name="terms"
      render={({ field }) => (
        <SealFormItem>
          <SealFormControl>
            <SealCheckbox
              checked={field.value}
              onCheckedChange={field.onChange}
              label="I accept the terms and conditions"
            />
          </SealFormControl>
          <SealFormMessage />
        </SealFormItem>
      )}
    />
  </form>
</SealForm>`,
      },
    },
  },
  render: () => <TermsForm />,
}
