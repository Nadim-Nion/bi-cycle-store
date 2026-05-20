import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES_OBJ } from '../user/user.constant';
import { PaymentControllers } from './payment.controller';
import { PaymentValidations } from './payment.validation';

const router = express.Router();

router.post(
  '/initiate/:orderId',
  auth(USER_ROLES_OBJ.USER),
  validateRequest(PaymentValidations.createPaymentValidationSchema),
  PaymentControllers.initPayment,
);

router.post(
  '/success/:transactionId',
  validateRequest(PaymentValidations.paymentValidationSchema),
  PaymentControllers.paymentSuccess,
);

router.post(
  '/fail/:transactionId',
  validateRequest(PaymentValidations.paymentValidationSchema),
  PaymentControllers.paymentFail,
);

export const PaymentRoutes = router;
