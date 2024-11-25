import { Request, Response } from 'express';
import { calculateRevenueService, createOrderService } from './order.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    if (
      !payload.email ||
      !payload.car ||
      !payload.quantity ||
      !payload.totalPrice
    ) {
      return res.status(400).json({
        message: 'Missing required fields',
        status: false,
        error: { name: 'ValidationError' },
      });
    }

    payload.createdAt = new Date();
    payload.updatedAt = new Date();

    const result = await createOrderService(payload);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: {
        name: error.name,
        errors: error.message,
      },
      stack: error.stack,
    });
  }
};

export const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await calculateRevenueService();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate revenue',
      error: {
        name: error.name,
        errors: error.message,
      },
      stack: error.stack,
    });
  }
};
