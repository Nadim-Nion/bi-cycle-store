import z from 'zod';

const createPaymentValidationSchema = z.object({
  params: z.object({
    orderId: z.string(),
  }),
});

const paymentSuccessvalidationSchema = z.object({
  params: z.object({
    transactionId: z.string(),
  }),
});

export const Paymentvalidations = {
  createPaymentValidationSchema,
  paymentSuccessvalidationSchema,
};
