import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
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

// Not Found Route
app.use(notFound);

// Handle all Global Errors of the Express Application
app.use(globalErrorHandler);


export default app;
