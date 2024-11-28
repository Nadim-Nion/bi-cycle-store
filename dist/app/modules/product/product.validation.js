"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productValidationSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1, 'Product name is required.'),
    brand: zod_1.z.string().min(1, 'Brand name is required.'),
    price: zod_1.z
        .number()
        .positive('Price must be a positive number.')
        .min(1, 'Product price is required.'),
    type: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
        errorMap: () => ({
            message: 'Product type must be one of: Mountain, Road, Hybrid, BMX, Electric.',
        }),
    }),
    description: zod_1.z.string().min(1, 'Product description is required.'),
    quantity: zod_1.z
        .number()
        .positive('Quantity must be a positive number.')
        .min(1, 'Product quantity is required.'),
    inStock: zod_1.z.boolean().default(true), // Optional with default value
    isDeleted: zod_1.z.boolean().default(false), // Optional with default value
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
})
    .strict(); // Prevents extra fields
exports.default = productValidationSchema;
