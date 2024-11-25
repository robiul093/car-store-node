import Car from '../car/car.model';
import { ICarOrder } from './order.interface';
import Order from './order.model';

export const createOrderService = async (payload: ICarOrder) => {
  const { email, car: carId, quantity, totalPrice } = payload;

  const car = await Car.findById(carId);

  if (!car) {
    throw {
      status: 404,
      message: 'Car not found',
      name: 'NotFoundError',
    };
  }

  if (car.quantity < quantity) {
    throw {
      status: 400,
      message: 'Insufficient stock available',
      name: 'StockError',
      availableStock: car.quantity,
    };
  }

  car.quantity -= quantity;
  car.inStock = car.quantity > 0;
  await car.save();

  const result = await Order.create({
    email,
    car: carId,
    quantity,
    totalPrice,
  });

  return result;
};

export const calculateRevenueService = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ['$totalPrice', '$quantity'] } },
      },
    },
  ]);
  return result[0]?.totalRevenue || 0;
};
