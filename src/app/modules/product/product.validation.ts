import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, 'Product name is required.'),

      brand: z.string().min(1, 'Brand name is required.'),

      model: z.string().min(1, 'Model name is required.'),

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
    })
    .strict(), // Prevents extra fields
});

const updateProductValidationSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, 'Product name cannot be empty.').optional(),

      brand: z.string().min(1, 'Brand name cannot be empty.').optional(),

      model: z.string().min(1, 'Model name cannot be empty.').optional(),

      price: z.number().positive('Price must be a positive number.').optional(),

      type: z
        .enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
          errorMap: () => ({
            message:
              'Product type must be one of: Mountain, Road, Hybrid, BMX, Electric.',
          }),
        })
        .optional(),

      description: z
        .string()
        .min(1, 'Product description cannot be empty.')
        .optional(),

      quantity: z
        .number()
        .positive('Quantity must be a positive number.')
        .optional(),

      inStock: z.boolean().optional(),

      isDeleted: z.boolean().optional(),
    })
    .strict(),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
