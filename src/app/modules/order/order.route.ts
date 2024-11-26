import express from 'express';
import { OrderControllers } from './order.controller';
const router = express.Router();

router.post('/createOrder', OrderControllers.createOrder);

export const OrderRoutes = router;
