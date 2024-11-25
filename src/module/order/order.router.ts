import { Router } from 'express';
import { calculateRevenue, createOrder } from './order.controller';

const orderRouter = Router();

orderRouter.post('/orders', createOrder);
orderRouter.get('/orders/revenue', calculateRevenue);

export default orderRouter;
