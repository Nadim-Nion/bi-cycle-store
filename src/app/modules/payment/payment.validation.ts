import z from 'zod';

const createPaymentValidationSchema = z.object({
  params: z.object({
    orderId: z.string(),
  }),
});

const paymentValidationSchema = z.object({
  params: z.object({
    transactionId: z.string(),
  }),
});

export const PaymentValidations = {
  createPaymentValidationSchema,
  paymentValidationSchema,
};
