import * as yup from 'yup';

export const loginSchema = yup.object({
  email:    yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Min 8 chars').required('Password is required'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;