import status from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { orderSearchableFields } from './order.constant';
import { TOrder, TOrderStatus } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (user: string, payload: TOrder) => {
  const { product, quantity } = payload;

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

  // Check if the product is in stock
  if (!productData.inStock) {
    throw new AppError(status.BAD_REQUEST, 'Product is out of stock');
  }

  //Check sufficient product stock is available
  if (productData.quantity < quantity) {
    throw new AppError(status.BAD_REQUEST, 'Insufficient stock');
  }

  // Save the updated product data
  await productData.save();

  // Dynamically update the totalPrice of an order
  const totalPrice = productData.price * quantity;

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

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find().populate('user').populate('product'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldLimiting();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleOrderFromDB = async (orderId: string, userEmail: string) => {
  const result = await Order.findById(orderId)
    .populate('user')
    .populate('product');

  // Find the user details using the email
  const userData = await User.findOne({ email: userEmail });

  // Check if the order belongs to the user
  if (result && result?.user?._id.toString() !== userData?._id.toString()) {
    throw new AppError(status.FORBIDDEN, 'You are not the owner of this order');
  }

  return result;
};

const updateOrderStatusIntoDB = async (
  orderId: string,
  status: TOrderStatus,
) => {
  const result = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true },
  );

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
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderStatusIntoDB,
  calculateTotalRevenue,
};
