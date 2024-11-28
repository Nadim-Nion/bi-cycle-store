"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, product, quantity, totalPrice, }) {
    // Find the product
    const productData = yield product_model_1.Product.findById(product);
    if (!productData) {
        throw new Error('Product not found');
    }
    //Check sufficient product stock is available
    if (productData.quantity < quantity) {
        throw new Error('Insufficient stock');
    }
    // Reduce the product quantity
    productData.quantity = productData.quantity - quantity;
    // Update inStock flag if quantity becomes zero
    if (productData.quantity === 0) {
        productData.inStock = false;
    }
    yield productData.save();
    // Create a new order
    const result = yield order_model_1.Order.create({ email, product, quantity, totalPrice });
    return result;
});
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.aggregate([
        // Stage 1: Calculate total price for each order
        {
            $project: {
                newPrice: { $multiply: ['$quantity', '$totalPrice'] },
            },
        },
        // Stage 2: Group all orders and sum up their total prices
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$newPrice' },
            },
        },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
});
exports.OrderServices = {
    createOrderIntoDB,
    calculateTotalRevenue,
};
