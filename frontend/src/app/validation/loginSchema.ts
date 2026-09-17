import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup.string().trim().required('This field is required'),
  password: yup.string().required('This field is required'),
  rememberMe: yup.boolean().default(false),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>

export const loginDefaultValues: LoginFormValues = {
  username: '',
  password: '',
  rememberMe: false,
}
