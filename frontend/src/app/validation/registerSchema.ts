import * as yup from 'yup'

const emailRegex =
  /^[a-zA-Z0-9!$%&'*+\-/=?^_`{|}~]+(?:[._-][a-zA-Z0-9!$%&'*+\-/=?^_`{|}~]+)*@([a-zA-Z0-9]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/

export const registerSchema = yup.object({
  firstName: yup.string().trim().required('This field is required'),
  lastName: yup.string().trim().required('This field is required'),
  age: yup
    .string()
    .required('Enter a valid age')
    .test('age', 'Enter a valid age', (value) => {
      const age = Number(value)
      return !Number.isNaN(age) && age >= 1 && age <= 120
    }),
  phone: yup
    .string()
    .required('Enter a valid phone number')
    .test('phone', 'Enter a valid phone number', (value) => {
      const digits = (value ?? '').replace(/\D/g, '')
      return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
    }),
  email: yup
    .string()
    .required('Enter a valid email address')
    .matches(emailRegex, 'Enter a valid email address'),
  address1: yup.string().trim().required('This field is required'),
  address2: yup.string().default(''),
  city: yup.string().trim().required('This field is required'),
  state: yup.string().required('This field is required'),
  zip: yup
    .string()
    .required('Enter a valid zip code')
    .matches(/^\d{5}(-\d{4})?$/, 'Enter a valid zip code'),
  username: yup
    .string()
    .trim()
    .required('This field is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9._-]+$/, 'Use letters, numbers, dots, hyphens, or underscores'),
  password: yup
    .string()
    .required('This field is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export type RegisterFormValues = yup.InferType<typeof registerSchema>

export const registerDefaultValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  age: '',
  phone: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  username: '',
  password: '',
  confirmPassword: '',
}
