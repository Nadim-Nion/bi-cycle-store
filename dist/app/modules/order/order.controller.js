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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { email, product, quantity, totalPrice } = req.body.order;
        const { email, product, quantity, totalPrice } = req.body;
        const zodParsedData = order_validation_1.default.parse({
            email,
            product,
            quantity,
            totalPrice,
        });
        const result = yield order_service_1.OrderServices.createOrderIntoDB(zodParsedData);
        // send the response to the client
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
            stack: error.stack || 'No stack trace available',
        });
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.calculateTotalRevenue();
        // send the response to the client
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
            stack: error.stack || 'No stack trace available',
        });
    }
});
exports.OrderControllers = {
    createOrder,
    calculateRevenue,
};
