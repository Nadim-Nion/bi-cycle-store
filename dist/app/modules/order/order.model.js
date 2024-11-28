"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
/* This code snippet is defining a Mongoose schema for an order document in a MongoDB database. Let's
break down what each part of the schema is doing: */
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    product: {
        type: String,
        ref: 'Product',
        required: [true, 'Product reference is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be a positive number.'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price must be a positive number'],
    },
}, {
    timestamps: true,
});
// Create a model
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
