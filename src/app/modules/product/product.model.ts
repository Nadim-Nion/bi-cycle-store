import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';
import { PRODUCT_TYPES_ARR } from './product.constant';

/* This code snippet is defining a Mongoose schema for a product entity. Let's break it down: */
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required.'],
    },
    model: {
      type: String,
      required: [true, 'Model name is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
      min: [0, 'Price must be a positive number'],
    },
    type: {
      type: String,
      enum: {
        values: PRODUCT_TYPES_ARR,
        message:
          'Product type must be one of: Mountain, Road, Hybrid, BMX, Electric.',
      },
      required: [true, 'Product type is required.'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required.'],
      min: [0, 'Quantity must be a positive number.'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Query Middleware
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// Create a Model
export const Product = model<TProduct>('Product', productSchema);
