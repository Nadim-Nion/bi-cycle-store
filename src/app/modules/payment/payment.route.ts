import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES_OBJ } from '../user/user.constant';
import { PaymentControllers } from './payment.controller';
import { Paymentvalidations } from './payment.validation';

const router = express.Router();

router.post(
  '/initiate/:orderId',
  auth(USER_ROLES_OBJ.USER),
  validateRequest(Paymentvalidations.createPaymentValidationSchema),
  PaymentControllers.initPayment,
);

router.post(
  '/success/:transactionId',
  //   auth(USER_ROLES_OBJ.USER),
  validateRequest(Paymentvalidations.paymentSuccessvalidationSchema),
  PaymentControllers.paymentSuccess,
);

export const PaymentRoutes = router;
