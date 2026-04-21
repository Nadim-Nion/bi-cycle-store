import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
const app: Application = express();

// Parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// Application Routes
// app.use('/api/products', StudentRouts);
// app.use('/api/orders', OrderRoutes);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('This is my Bi-Cycle Store application 😊');
});

export default app;
