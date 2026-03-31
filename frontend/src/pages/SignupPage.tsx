import * as Label from '@radix-ui/react-label'
import * as Select from '@radix-ui/react-select'
import * as Separator from '@radix-ui/react-separator'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import {
  fieldErrorClass,
  fieldInputClass,
  fieldLabelClass,
  ghostLinkClass,
  primaryButtonClass,
} from '../components/ui/form-classes'
import { useSignupMutation } from '../hooks/auth'
import { signupSchema } from '../schemas/auth.schema'
import { USER_ROLES } from '../types/auth'

export default function SignupPage() {
  const signupMutation = useSignupMutation()

  return (
    <AuthShell
      title="Create your account"
      description="Choose a role and set a strong password. You can change details later."
      footer={
        <p className="text-sm text-slate-600">
          Already registered?{' '}
          <Link className={ghostLinkClass} to="/login">
            Log in instead
          </Link>
        </p>
      }
    >
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'User' as (typeof USER_ROLES)[number],
        }}
        validationSchema={signupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await signupMutation.mutateAsync({
              name: values.name,
              email: values.email,
              password: values.password,
              role: values.role,
            })
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-5">
            <div className="space-y-2">
              <Label.Root className={fieldLabelClass} htmlFor="signup-name">
                Full name
              </Label.Root>
              <Field
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                className={fieldInputClass}
                placeholder="Jane Doe"
              />
              <ErrorMessage name="name" component="p" className={fieldErrorClass} />
            </div>

            <div className="space-y-2">
              <Label.Root className={fieldLabelClass} htmlFor="signup-email">
                Work email
              </Label.Root>
              <Field
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                className={fieldInputClass}
                placeholder="you@company.com"
              />
              <ErrorMessage name="email" component="p" className={fieldErrorClass} />
            </div>

            <div className="space-y-2">
              <Label.Root className={fieldLabelClass} htmlFor="signup-role">
                Role
              </Label.Root>
              <Select.Root
                value={values.role}
                onValueChange={(v) => setFieldValue('role', v)}
              >
                <Select.Trigger
                  id="signup-role"
                  className={`${fieldInputClass} flex h-11 items-center justify-between gap-2 text-left`}
                  aria-label="Role"
                >
                  <Select.Value placeholder="Select a role" />
                  <Select.Icon>
                    <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    className="z-[100] max-h-[min(24rem,var(--radix-select-content-available-height))] overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5"
                    position="popper"
                    sideOffset={6}
                    align="start"
                  >
                    <Select.Viewport className="p-1">
                      {USER_ROLES.map((role) => (
                        <Select.Item
                          key={role}
                          value={role}
                          className="relative flex cursor-pointer select-none rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-900 data-[state=checked]:font-semibold"
                        >
                          <Select.ItemText>{role}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              <ErrorMessage name="role" component="p" className={fieldErrorClass} />
            </div>

            <Separator.Root
              decorative
              className="my-1 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"
            />

            <div className="space-y-2">
              <Label.Root className={fieldLabelClass} htmlFor="signup-password">
                Password
              </Label.Root>
              <Field
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                className={fieldInputClass}
                placeholder="At least 8 characters"
              />
              <ErrorMessage name="password" component="p" className={fieldErrorClass} />
            </div>

            <div className="space-y-2">
              <Label.Root className={fieldLabelClass} htmlFor="signup-confirm">
                Confirm password
              </Label.Root>
              <Field
                id="signup-confirm"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={fieldInputClass}
                placeholder="Repeat password"
              />
              <ErrorMessage name="confirmPassword" component="p" className={fieldErrorClass} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || signupMutation.isPending}
              className={primaryButtonClass}
            >
              {isSubmitting || signupMutation.isPending ? 'Creating account…' : 'Create account'}
            </button>
          </Form>
        )}
      </Formik>
    </AuthShell>
  )
}
