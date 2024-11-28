import { z } from 'zod';

const productValidationSchema = z
  .object({
    name: z.string().min(1, 'Product name is required.'),
    brand: z.string().min(1, 'Brand name is required.'),

    price: z
      .number()
      .positive('Price must be a positive number.')
      .min(1, 'Product price is required.'),

    type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      errorMap: () => ({
        message:
          'Product type must be one of: Mountain, Road, Hybrid, BMX, Electric.',
      }),
    }),

    description: z.string().min(1, 'Product description is required.'),

    quantity: z
      .number()
      .positive('Quantity must be a positive number.')
      .min(1, 'Product quantity is required.'),

    inStock: z.boolean().default(true), // Optional with default value
    isDeleted: z.boolean().default(false), // Optional with default value
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict(); // Prevents extra fields

export default productValidationSchema;
