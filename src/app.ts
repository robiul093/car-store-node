import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import carRouter from './module/car/car.router';
import orderRouter from './module/order/order.router';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api', carRouter);
app.use('/api', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('This is care store!');
});

app.use((error: any, req: Request, res: Response) => {
  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
    success: false,
    error: error.name || 'UnknownError',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
});

export default app;
