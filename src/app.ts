import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouts } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1/products', StudentRouts);
app.use('/api/v1/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('This is my Bi-Cycle Store application');
});

export default app;
