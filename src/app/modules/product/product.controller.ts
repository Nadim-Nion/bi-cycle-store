import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    const zodParsedData = productValidationSchema.parse(productData);

    // Will call the service function
    const result = await ProductServices.createProductIntoDB(zodParsedData);

    // send the response to the client
    res.status(200).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await ProductServices.getAllProductsFromDB(
      searchTerm as string,
    );

    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    // console.log(productId);
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Bicycle retrieved successfully',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      updatedData,
    );

    res.status(200).json({
      success: true,
      message: 'Bicycle updated successfully',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Bicycle deleted successfully',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
