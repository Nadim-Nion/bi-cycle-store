import express from 'express';
import { OrderRoutes } from '../modules/order/order.route';
import { ProductRouts } from '../modules/product/product.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRouts,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

/* 
Hard Coded Ways to add routes =>
------------------------------------
router.use('/api/products', StudentRouts);
router.use('/api/orders', OrderRouts);
*/

/* Programmatically Add Routes */
moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route),
);

export default router;
