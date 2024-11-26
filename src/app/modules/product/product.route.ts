import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/createProduct', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/updateProduct/:productId', ProductControllers.updateProduct);
router.delete('/:productId', ProductControllers.deleteProduct);

export const StudentRouts = router;
