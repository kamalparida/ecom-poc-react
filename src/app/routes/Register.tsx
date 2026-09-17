import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Navigate, useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/auth'
import FormField, { SectionLabel, authInputClass } from '../components/FormField/FormField'
import { US_STATES } from '../constants/usStates'
import { useAuthStore } from '../store/authStore'
import {
  registerDefaultValues,
  registerSchema,
  type RegisterFormValues,
} from '../validation/registerSchema'

export default function Register() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [apiError, setApiError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: registerDefaultValues,
    mode: 'onBlur',
  })

  if (user) return <Navigate to="/" replace />

  const onSubmit = async (values: RegisterFormValues) => {
    setApiError('')
    const street = values.address2?.trim()
      ? `${values.address1.trim()}, ${values.address2.trim()}`
      : values.address1.trim()

    try {
      await registerUser({
        username: values.username.trim(),
        password: values.password,
        fullName: `${values.firstName.trim()} ${values.lastName.trim()}`,
        email: values.email.trim(),
        address: {
          street,
          city: values.city.trim(),
          state: values.state,
          zip: values.zip.trim(),
        },
      })
      navigate('/login', { replace: true, state: { justRegistered: true } })
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Registration failed')
    }
  }

  return (
    <div className="flex justify-center bg-[#f6f6f4] px-4 py-10">
      <div className="h-fit w-full max-w-[640px] rounded-2xl bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-neutral-900">Create your account</h1>
        <p className="mb-7 text-sm text-neutral-400">
          Fill in your details to register with Cartly.
        </p>

        {apiError ? (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{apiError}</p>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <FormField label="First name" error={errors.firstName?.message}>
              <input {...register('firstName')} className={authInputClass} placeholder="John" />
            </FormField>
            <FormField label="Last name" error={errors.lastName?.message}>
              <input {...register('lastName')} className={authInputClass} placeholder="Doe" />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <FormField label="Age" error={errors.age?.message}>
              <input {...register('age')} type="number" className={authInputClass} placeholder="28" />
            </FormField>
            <FormField label="Phone" error={errors.phone?.message}>
              <input {...register('phone')} className={authInputClass} placeholder="+1 (555) 123-4567" />
            </FormField>
          </div>

          <FormField label="Email" error={errors.email?.message}>
            <input {...register('email')} type="email" className={authInputClass} placeholder="john.doe@example.com" />
          </FormField>

          <SectionLabel>ADDRESS</SectionLabel>

          <FormField label="Address line 1" error={errors.address1?.message}>
            <input {...register('address1')} className={authInputClass} placeholder="123 Market Street" />
          </FormField>

          <FormField label="Address line 2" error={errors.address2?.message}>
            <input {...register('address2')} className={authInputClass} placeholder="Apt 4B (optional)" />
          </FormField>

          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <FormField label="City" error={errors.city?.message}>
              <input {...register('city')} className={authInputClass} placeholder="San Francisco" />
            </FormField>
            <FormField label="State" error={errors.state?.message}>
              <div className="relative">
                <select {...register('state')} className={`${authInputClass} appearance-none pr-10`}>
                  <option value="">Select a state</option>
                  {US_STATES.map((state) => (
                    <option key={state.code} value={state.code}>{state.name}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </FormField>
          </div>

          <div className="sm:max-w-[50%] sm:pr-2">
            <FormField label="Zip code" error={errors.zip?.message}>
              <input {...register('zip')} className={authInputClass} placeholder="94103" />
            </FormField>
          </div>

          <SectionLabel>ACCOUNT</SectionLabel>

          <FormField label="Username" error={errors.username?.message}>
            <input {...register('username')} className={authInputClass} placeholder="johndoe28" autoComplete="username" />
          </FormField>

          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <FormField label="Password" error={errors.password?.message}>
              <input {...register('password')} type="password" className={authInputClass} placeholder="••••••••" autoComplete="new-password" />
            </FormField>
            <FormField label="Confirm password" error={errors.confirmPassword?.message}>
              <input {...register('confirmPassword')} type="password" className={authInputClass} placeholder="••••••••" autoComplete="new-password" />
            </FormField>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isSubmitting ? 'Registering…' : 'Register'}
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-xl border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
