import { Router } from 'express';
import { calculateRevenue, createOrder, getOrderController, getSingleUserOrderController, manageAllOrder, verifyPayment } from './order.controller';
import auth from '../../middlewares/auth';

const orderRouter = Router();

orderRouter.post('/orders', auth('user'), createOrder);
orderRouter.get('/orders', auth('user'), getOrderController);
orderRouter.get('/orders/verify', auth('user'), verifyPayment);
orderRouter.get('/user/orders', auth('user'), getSingleUserOrderController);
orderRouter.get('/orders/revenue', calculateRevenue);

// admin
orderRouter.get('/admin/manage-all-order', auth('admin'), manageAllOrder);

export default orderRouter;
