import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { loginUser, toAuthUser } from '../../api/auth'
import FormField, { authInputClass } from '../components/FormField/FormField'
import { useAuthStore } from '../store/authStore'
import {
  loginDefaultValues,
  loginSchema,
  type LoginFormValues,
} from '../validation/loginSchema'

type LoginLocationState = {
  justRegistered?: boolean
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const justRegistered = Boolean((location.state as LoginLocationState | null)?.justRegistered)
  const user = useAuthStore((s) => s.user)
  const signIn = useAuthStore((s) => s.signIn)
  const [apiError, setApiError] = useState('')
  const [forgotMessage, setForgotMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefaultValues,
    mode: 'onBlur',
  })

  if (user) return <Navigate to="/" replace />

  const onSubmit = async (values: LoginFormValues) => {
    setApiError('')
    try {
      const data = await loginUser({
        username: values.username.trim(),
        password: values.password,
      })
      signIn(toAuthUser(data, values.username.trim()), Boolean(values.rememberMe))
      navigate('/', { replace: true })
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Login failed')
    }
  }

  return (
    <div className="flex justify-center bg-[#f6f6f4] px-4 py-16">
      <div className="h-fit w-full max-w-[460px] rounded-2xl bg-white px-8 py-10 shadow-sm sm:px-10">
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-neutral-900">Welcome back</h1>
        <p className="mb-7 text-sm text-neutral-400">Sign in to your Cartly account.</p>

        {justRegistered ? (
          <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Account created. Please sign in with your username and password.
          </p>
        ) : null}

        {apiError ? (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{apiError}</p>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField label="Username" error={errors.username?.message}>
            <input
              {...register('username')}
              className={authInputClass}
              placeholder="johndoe28"
              autoComplete="username"
            />
          </FormField>

          <FormField
            label="Password"
            error={errors.password?.message}
            extra={
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-0 text-sm text-neutral-400 hover:text-neutral-600"
                onClick={() => setForgotMessage('Password reset is not available in this POC.')}
              >
                Forgot password?
              </button>
            }
          >
            <input
              {...register('password')}
              type="password"
              className={authInputClass}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </FormField>

          {forgotMessage ? (
            <p className="mb-4 text-xs text-neutral-500">{forgotMessage}</p>
          ) : null}

          <label className="mb-6 flex items-center gap-2.5 text-sm text-neutral-700">
            <input
              {...register('rememberMe')}
              type="checkbox"
              className="h-4 w-4 rounded border-neutral-300 text-neutral-900 accent-neutral-900"
            />
            Remember me
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mb-6 w-full cursor-pointer rounded-xl bg-neutral-900 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400">
          New to Cartly?{' '}
          <Link to="/register" className="font-semibold text-neutral-900 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
