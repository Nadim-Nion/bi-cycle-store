import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouts } from './app/modules/product/product.route';
const app: Application = express();
// const port = 3000;

// Parser
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1/products', StudentRouts);

app.get('/', (req: Request, res: Response) => {
  res.send('This is my Bi-Cycle Store application');
});

export default app;
