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
    .matches(/^\d{10}$/, 'Enter a valid phone number'),
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
}
