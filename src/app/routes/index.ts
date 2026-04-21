import express from 'express';
import { OrderRoutes } from '../modules/order/order.route';
import { StudentRouts } from '../modules/product/product.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: StudentRouts,
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
