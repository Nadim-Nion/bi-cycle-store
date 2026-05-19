import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';

const initPayment = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const result = await PaymentServices.initiatePayment(orderId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Payment initiated successfully',
    data: result,
  });
});

const paymentSuccess = catchAsync(async (req, res) => {
  const { transactionId } = req.params;

  await PaymentServices.handlePaymentSuccess(transactionId);

  // sendResponse(res, {
  //   statusCode: status.OK,
  //   success: true,
  //   message: 'Payment successful',
  //   data: result,
  // });

  res.redirect(`http://localhost:5173/payment/success/${transactionId}`);
});

export const PaymentControllers = {
  initPayment,
  paymentSuccess,
};
