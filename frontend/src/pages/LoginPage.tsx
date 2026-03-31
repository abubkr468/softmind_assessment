import * as Label from '@radix-ui/react-label'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import {
  fieldErrorClass,
  fieldInputClass,
  fieldLabelClass,
  ghostLinkClass,
  primaryButtonClass,
} from '../components/ui/form-classes'
import { useLoginMutation } from '../hooks/auth'
import { loginSchema } from '../schemas/auth.schema'

export default function LoginPage() {
  const loginMutation = useLoginMutation()

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in with your email and password to continue."
      footer={
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link className={ghostLinkClass} to="/signup">
            Create one
          </Link>
        </p>
      }
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await loginMutation.mutateAsync(values)
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div className="space-y-2">
              <Label.Root className={fieldLabelClass} htmlFor="login-email">
                Email
              </Label.Root>
              <Field
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                className={fieldInputClass}
                placeholder="you@company.com"
              />
              <ErrorMessage name="email" component="p" className={fieldErrorClass} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label.Root className={fieldLabelClass} htmlFor="login-password">
                  Password
                </Label.Root>
              </div>
              <Field
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={fieldInputClass}
                placeholder="••••••••"
              />
              <ErrorMessage name="password" component="p" className={fieldErrorClass} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loginMutation.isPending}
              className={primaryButtonClass}
            >
              {isSubmitting || loginMutation.isPending ? 'Signing in…' : 'Sign in'}
            </button>
          </Form>
        )}
      </Formik>
    </AuthShell>
  )
}
