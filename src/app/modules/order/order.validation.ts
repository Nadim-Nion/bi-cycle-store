import { z } from 'zod';
import { ORDER_STATUS_ARR } from './order.constant';

// Define Zod validation schema for the Order
const createOrderValidationSchema = z.object({
  body: z.object({
    product: z.string().min(1, 'product id required').max(50),

    quantity: z
      .number()
      .int({ message: 'Quantity must be an integer' })
      .min(0, { message: 'Quantity must be a positive number' }),

    totalPrice: z
      .number()
      .min(0, { message: 'Total price must be a positive number' })
      .optional(),

    status: z
      .enum(ORDER_STATUS_ARR, {
        message:
          'Status must be one of: pending, paid, shipped, completed, cancelled',
      })
      .default('pending'),
  }),
});

const updateOrderStatusValidationSchema = z.object({
  params: z.object({
    orderId: z.string().min(1, 'Order ID is required'),
  }),
  body: z.object({
    status: z.enum(ORDER_STATUS_ARR, {
      message:
        'Status must be one of: pending, paid, shipped, completed, cancelled',
    }),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
  updateOrderStatusValidationSchema,
};
