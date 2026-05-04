import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Bicycle created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Bicycles retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.getSingleProductFromDB(productId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bicycle retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;

  const result = await ProductServices.updateSingleProductIntoDB(
    productId,
    updatedData,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bicycle updated successfully',
    data: result,
  });
});

/* 
async (req: Request, res: Response) => {
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
*/

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.deleteProductFromDB(productId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bicycle deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
