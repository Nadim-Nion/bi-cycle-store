import status from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (user: string, payload: TOrder) => {
  const { product, quantity, totalPrice } = payload;

  // Find the user details using the email
  const userData = await User.findOne({ email: user });

  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  // Find the product
  const productData = await Product.findById(product);

  if (!productData) {
    throw new AppError(status.NOT_FOUND, 'Product not found');
  }

  //Check sufficient product stock is available
  if (productData.quantity < quantity) {
    throw new AppError(status.BAD_REQUEST, 'Insufficient stock');
  }

  // Reduce the product quantity
  productData.quantity = productData.quantity - quantity;

  // Update inStock flag if quantity becomes zero
  if (productData.quantity === 0) {
    productData.inStock = false;
  }

  // Save the updated product data
  await productData.save();

  const orderPayload = {
    user: userData?._id,
    product,
    quantity,
    totalPrice,
  };

  // Create a new order
  const result = await Order.create(orderPayload);
  return result;
};

const calculateTotalRevenue = async () => {
  const result = await Order.aggregate([
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
};

export const OrderServices = {
  createOrderIntoDB,
  calculateTotalRevenue,
};
