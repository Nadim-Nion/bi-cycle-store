import { Types } from 'mongoose';

export type TPaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export type TPayment = {
  order: Types.ObjectId;
  transactionId: string;
  amount: number;
  status: TPaymentStatus;
  paymentGateway?: 'sslcommerz';
  gatewayResponse?: Record<string, unknown>;
};
