import status from 'http-status';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';
import AppError from '../../errors/AppError';
import { Order } from '../order/order.model';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { Payment } from './payment.model';

const store_id = config.ssl_commerz_store_id!;
const store_passwd = config.ssl_commerz_store_password!;
const is_live = false; //true for live, false for sandbox

const initiatePayment = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('user');
  if (!order) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }

  const user = await User.findById(order.user);
  if (!user) throw new AppError(status.NOT_FOUND, 'User not found');

  // Generate Transaction ID
  const transactionId = `TXN-${Date.now()}`;

  const data = {
    total_amount: order?.totalPrice,
    currency: 'BDT',
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/v1/payments/success/${transactionId}`,
    fail_url: `http://localhost:5000/api/v1/payments/fail`,
    cancel_url: `http://localhost:5000/api/v1/payments/cancel`,
    ipn_url: `http://localhost:5000/api/v1/payments/ipn`,
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: user?.name,
    cus_email: user?.email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  // sslcz.init(data).then((apiResponse) => {
  //   // Redirect the user to payment gateway
  //   const GatewayPageURL = apiResponse.GatewayPageURL;
  //   res.send({ url: GatewayPageURL });
  //   console.log('Redirecting to: ', GatewayPageURL);
  // });
  const apiResponse = (await sslcz.init(data)) as Record<string, unknown>;
  if (!apiResponse?.GatewayPageURL) {
    throw new AppError(
      status.BAD_GATEWAY,
      'Failed to initialize payment gateway',
    );
  }

  // Create Payment
  const payment = await Payment.create({
    order: order?._id,
    transactionId,
    amount: order?.totalPrice,
    status: 'pending',
  });

  return {
    payment,
    url: apiResponse.GatewayPageURL,
  };
};

const handlePaymentSuccess = async (transactionId: string) => {
  // Find the payment by transaction ID
  const payment = await Payment.findOne({ transactionId });
  if (!payment) {
    throw new AppError(status.NOT_FOUND, 'Payment not found');
  }

  // Update payment status to "paid"
  await Payment.findByIdAndUpdate(
    payment._id,
    {
      status: 'paid',
    },
    {
      new: true,
      runValidators: true,
    },
  );

  // Update order status to "paid"
  await Order.findOneAndUpdate(
    payment.order,
    {
      status: 'paid',
    },
    {
      new: true,
      runValidators: true,
    },
  );

  // Reduce the product quantity and update inStock flag if necessary
  const order = await Order.findById(payment.order);
  if (!order) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }

  const product = await Product.findById(order.product);
  if (!product) {
    throw new AppError(status.NOT_FOUND, 'Product not found');
  }

  product.quantity = product.quantity - order.quantity;

  // Update inStock flag if quantity becomes zero or less
  if (product.quantity <= 0) {
    product.inStock = false;
  }

  await product.save();
};

const handlePaymentFail = async (transactionId: string) => {
  // Find the payment by transaction ID
  const payment = await Payment.findOne({ transactionId });
  if (!payment) {
    throw new AppError(status.NOT_FOUND, 'Payment not found');
  }

  // Update payment status to "failed"
  await Payment.findByIdAndUpdate(
    payment._id,
    { status: 'failed' },
    {
      new: true,
      runValidators: true,
    },
  );

  // Remove the order when payment fails
  await Order.findOneAndDelete({ _id: payment.order });
};

export const PaymentServices = {
  initiatePayment,
  handlePaymentSuccess,
  handlePaymentFail,
};
