import { Schema, model } from 'mongoose';
import { ORDER_STATUS_ARR } from './order.constant';
import { TOrder } from './order.interface';

/* This code snippet is defining a Mongoose schema for an order document in a MongoDB database. Let's
break down what each part of the schema is doing: */
const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product reference is required'],
    },

    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },

    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },

    status: {
      type: String,
      enum: {
        values: ORDER_STATUS_ARR,
        message: `{VALUE} is not a valid status. Status must be one of the following: ${ORDER_STATUS_ARR.join(', ')}`,
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

// Create a model
export const Order = model<TOrder>('Order', orderSchema);
