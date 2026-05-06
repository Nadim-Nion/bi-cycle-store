import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES_OBJ } from '../user/user.constant';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';
const router = express.Router();

router.get(
  '/revenue',
  auth(USER_ROLES_OBJ.ADMIN),
  OrderControllers.calculateRevenue,
);

router.post(
  '/create-order',
  auth(USER_ROLES_OBJ.USER, USER_ROLES_OBJ.ADMIN),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

router.get('/', auth(USER_ROLES_OBJ.ADMIN), OrderControllers.getAllOrders);

router.get(
  '/:orderId',
  auth(USER_ROLES_OBJ.USER),
  OrderControllers.getSingleOrder,
);

router.patch(
  '/:orderId/status',
  auth(USER_ROLES_OBJ.ADMIN),
  validateRequest(OrderValidations.updateOrderStatusValidationSchema),
  OrderControllers.updateOrderStatus,
);

export const OrderRoutes = router;
