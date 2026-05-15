import { model, Schema } from 'mongoose';
import { TPayment } from './payment.interface';
import { PAYMENT_STATUS } from './payment.utils';

const paymentSchema = new Schema<TPayment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: PAYMENT_STATUS,
      default: 'pending',
    },
    paymentGateway: {
      type: String,
      default: 'sslcommerz',
    },
    gatewayResponse: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = model<TPayment>('Payment', paymentSchema);
