import { z } from 'zod';
import { USER_ROLES_ARR, USER_ROLES_OBJ } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),

    email: z.string().email('Invalid email address'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(100, 'Password is too long'),

    role: z
      .enum(USER_ROLES_ARR, {
        errorMap: () => ({
          message: `Role must be one of: ${USER_ROLES_ARR.join(', ')}`,
        }),
      })
      .default(USER_ROLES_OBJ.USER),

    isActive: z.boolean().optional().default(true),

    isDeleted: z.boolean().optional().default(false),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
