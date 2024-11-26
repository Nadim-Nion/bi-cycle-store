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
  //   console.log(productData);

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

export const OrderServices = {
  createOrderIntoDB,
};
