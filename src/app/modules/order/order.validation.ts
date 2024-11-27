import { z } from 'zod';

// Define Zod validation schema for the Order
const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email must be a valid email address' })
    .min(1, { message: 'Email is required' }),

  product: z.string().min(1, 'product id required').max(50),

  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .min(0, { message: 'Quantity must be a positive number' }),

  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a positive number' }),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default orderValidationSchema;
