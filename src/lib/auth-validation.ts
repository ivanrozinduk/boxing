import { z } from 'zod';

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const emailSchema = z.string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces');

export const validateCredentials = (email: string, password: string) => {
  const result = z.object({
    email: emailSchema,
    password: passwordSchema,
  }).safeParse({ email, password });

  if (!result.success) {
    return result.error.errors.map(err => ({
      field: err.path[0] as string,
      message: err.message
    }));
  }

  return [];
};

export const validateName = (name: string) => {
  const result = nameSchema.safeParse(name);
  if (!result.success) {
    return result.error.errors.map(err => ({
      field: 'name',
      message: err.message
    }));
  }
  return [];
};