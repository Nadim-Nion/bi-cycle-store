"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define Zod validation schema for the Order
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: 'Email must be a valid email address' })
        .min(1, { message: 'Email is required' }),
    product: zod_1.z.string().min(1, 'product id required').max(50),
    quantity: zod_1.z
        .number()
        .int({ message: 'Quantity must be an integer' })
        .min(0, { message: 'Quantity must be a positive number' }),
    totalPrice: zod_1.z
        .number()
        .min(0, { message: 'Total price must be a positive number' }),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.default = orderValidationSchema;
