import mongoose, { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

/* This code snippet is defining a Mongoose schema for an order document in a MongoDB database. Let's
break down what each part of the schema is doing: */
const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
    },
  },
  {
    timestamps: true,
  },
);

// Create a model
export const Order = model<TOrder>('Order', orderSchema);
