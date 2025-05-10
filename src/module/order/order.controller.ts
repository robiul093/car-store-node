import catchAsync from '../../utils/catchAsync';
import { calculateRevenueService, createOrderService, getOrderService, getSingleUserOrderService, manageAllOrderIntoDb, verifyPaymentSercice } from './order.service';

export const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;

  if (
    !payload.carId ||
    !payload.quantity
  ) {
    res.status(400).json({
      message: 'Missing required fields',
      status: false,
      error: { name: 'ValidationError' },
    });
    return
  };

  payload.createdAt = new Date();
  payload.updatedAt = new Date();

  const result = await createOrderService(user, payload, req.ip!);

  res.status(200).json({
    success: true,
    message: 'Order created successfully',
    data: result,
  });

});

export const getSingleUserOrderController = catchAsync(async (req, res) => {
  const result = await getSingleUserOrderService(req.user);
  console.log(req.user)
  res.status(200).json({
    success: true,
    message: 'Orders retrived successfully',
    data: result,
  });
})

export const getOrderController = catchAsync(async (req, res) => {
  const result = await getOrderService();

  res.status(200).json({
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});


export const verifyPayment = catchAsync(async (req, res) => {
  const order = await verifyPaymentSercice(req.query.order_id as string);

  res.status(200).json({
    success: true,
    message: "Order verified successfully",
    data: order,
  });
});


export const calculateRevenue = catchAsync(async (req, res) => {

  const totalRevenue = await calculateRevenueService();

  res.status(200).json({
    message: 'Revenue calculated successfully',
    status: true,
    data: { totalRevenue },
  });

});


// admin
export const manageAllOrder = catchAsync(async (req, res) => {
  const result =await manageAllOrderIntoDb();

  res.status(200).json({
    message: 'Order retrived successfully',
    status: true,
    data: result,
  });

})

