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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { product: productData } = req.body;
        const productData = req.body;
        const zodParsedData = product_validation_1.default.parse(productData);
        // Will call the service function
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        // send the response to the client
        res.status(200).json({
            success: true,
            message: 'Bicycle created successfully',
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
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductServices.getAllProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Bicycles retrieved successfully',
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // console.log(productId);
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Bicycle retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
            stack: error.stack || 'No stack trace available',
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedData = req.body;
        const result = yield product_service_1.ProductServices.updateSingleProductIntoDB(productId, updatedData);
        res.status(200).json({
            success: true,
            message: 'Bicycle updated successfully',
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Bicycle deleted successfully',
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
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
