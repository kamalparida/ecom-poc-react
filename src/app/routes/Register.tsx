import type { ReactNode } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import {
  registerDefaultValues,
  registerSchema,
  type RegisterFormValues,
} from '../validation/registerSchema'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
]

const fieldControlClass =
  'w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500'

export default function Register() {
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const signIn = useAuthStore((s) => s.signIn)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: registerDefaultValues,
    mode: 'onBlur',
  })

  const onSubmit = (values: RegisterFormValues) => {
    signIn({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <SuccessPanel
        title="Account created successfully!"
        message={`Welcome, ${getValues('firstName')}. You can now explore the app.`}
        onHome={() => navigate('/')}
      />
    )
  }

  if (user) {
    return (
      <SuccessPanel
        title="You're already registered!"
        message={`Welcome back, ${user.firstName}. You already have an account.`}
        onHome={() => navigate('/')}
      />
    )
  }

  return (
    <div className="flex min-h-screen justify-center bg-neutral-100 px-4 py-12">
      <div className="h-fit w-full max-w-[620px] rounded-lg border border-neutral-200 bg-white px-12 py-10">
        <h1 className="mb-1.5 text-[1.6rem] font-bold text-neutral-900">Create your account</h1>
        <p className="mb-7 text-[0.95rem] text-neutral-500">
          Fill in your details to register with Cartly.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First name" error={errors.firstName?.message}>
              <input {...register('firstName')} className={fieldControlClass} placeholder="John" />
            </Field>
            <Field label="Last name" error={errors.lastName?.message}>
              <input {...register('lastName')} className={fieldControlClass} placeholder="Doe" />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Age" error={errors.age?.message}>
              <input {...register('age')} type="number" className={fieldControlClass} placeholder="28" />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register('phone')} className={fieldControlClass} placeholder="5551234567" />
            </Field>
          </div>

          <Field label="Email" error={errors.email?.message}>
            <input {...register('email')} type="email" className={fieldControlClass} placeholder="john.doe@example.com" />
          </Field>

          <div className="mb-3 mt-6 text-xs font-semibold tracking-[0.08em] text-neutral-400">
            ADDRESS
          </div>

          <Field label="Address line 1" error={errors.address1?.message}>
            <input {...register('address1')} className={fieldControlClass} placeholder="123 Market Street" />
          </Field>

          <Field label="Address line 2" error={errors.address2?.message}>
            <input {...register('address2')} className={fieldControlClass} placeholder="Apt 4B (optional)" />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="City" error={errors.city?.message}>
              <input {...register('city')} className={fieldControlClass} placeholder="San Francisco" />
            </Field>
            <Field label="State" error={errors.state?.message}>
              <select {...register('state')} className={fieldControlClass}>
                <option value="">Select a state</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="max-w-full sm:max-w-[50%]">
            <Field label="Zip code" error={errors.zip?.message}>
              <input {...register('zip')} className={fieldControlClass} placeholder="94103" />
            </Field>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-neutral-900 px-3 py-3 text-[0.95rem] font-semibold text-white transition-opacity hover:opacity-85"
            >
              Register
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-md border border-neutral-300 bg-white px-3 py-3 text-[0.95rem] font-semibold text-neutral-900 transition-opacity hover:opacity-85"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-1.5 text-sm font-medium text-neutral-800">{label}</label>
      {children}
      {error ? <span className="mt-1 text-xs text-red-600">{error}</span> : null}
    </div>
  )
}

function SuccessPanel({
  title,
  message,
  onHome,
}: {
  title: string
  message: string
  onHome: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center">
        <h2 className="mb-3 text-neutral-900">{title}</h2>
        <p className="mb-6 text-neutral-500">{message}</p>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-neutral-900 px-8 py-3 text-[0.95rem] font-semibold text-white transition-opacity hover:opacity-85"
          onClick={onHome}
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}
