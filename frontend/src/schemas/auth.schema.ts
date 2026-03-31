import * as Yup from 'yup'
import { USER_ROLES } from '../types/auth'

export const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Use at least 6 characters')
    .required('Password is required'),
})

export const signupSchema = Yup.object({
  name: Yup.string().trim().min(1, 'Name is required').required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Use at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
  role: Yup.string()
    .oneOf([...USER_ROLES], 'Pick a valid role')
    .required('Role is required'),
})
