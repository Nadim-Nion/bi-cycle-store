import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/createProduct', ProductControllers.createProduct);

export const StudentRouts = router;
