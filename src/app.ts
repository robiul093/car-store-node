import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import carRouter from './module/car/car.router';
import orderRouter from './module/order/order.router';
import authRoute from './module/auth/auth.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({
  origin: [
    "https://car-store-clint.vercel.app",
    "http://localhost:5173",
  ],
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api', carRouter);
app.use('/api', orderRouter);
app.use('/api', authRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('This is care store!');
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
    success: false,
    error: error.name || 'UnknownError',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
});

export default app;
