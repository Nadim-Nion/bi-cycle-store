import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
import SSLCommerzPayment from 'sslcommerz-lts';
import config from './app/config';


const store_id = config.ssl_commerz_store_id!;
const store_passwd = config.ssl_commerz_store_password!;
const is_live = false //true for live, false for sandbox

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
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('This is my Bi-Cycle Store application 😊');
});

// Not Found Route
app.use(notFound);

// Handle all Global Errors of the Express Application
app.use(globalErrorHandler);

export default app;
