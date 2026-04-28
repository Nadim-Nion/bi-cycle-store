import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES_OBJ } from '../user/user.constant';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES_OBJ.ADMIN),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get('/', ProductControllers.getAllProducts);

router.get(
  '/:productId',
  ProductControllers.getSingleProduct,
);

router.put(
  '/:productId',
  auth(USER_ROLES_OBJ.ADMIN),
  ProductControllers.updateProduct,
);

router.delete(
  '/:productId',
  auth(USER_ROLES_OBJ.ADMIN),
  ProductControllers.deleteProduct,
);

export const ProductRouts = router;
