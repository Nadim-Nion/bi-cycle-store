import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async ({
  email,
  product,
  quantity,
  totalPrice,
}: TOrder) => {
  // Find the product
  const productData = await Product.findById(product);

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

  await productData.save();

  // Create a new order
  const result = await Order.create({ email, product, quantity, totalPrice });
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
