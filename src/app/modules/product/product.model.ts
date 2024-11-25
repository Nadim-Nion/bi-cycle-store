import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

/* This code snippet is defining a Mongoose schema for a product entity. Let's break it down: */
const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

// Create a Model
export const Product = model<TProduct>('Product', productSchema);
