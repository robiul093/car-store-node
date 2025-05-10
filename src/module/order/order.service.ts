import { TUser } from '../auth/auth.interface';
import Car from '../car/car.model';
import { ICarOrder } from './order.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';

export const createOrderService = async (user: TUser,
  payload: { carId: string, quantity: number },
  client_ip: string
) => {
  const { carId, quantity, } = payload;

  const car = await Car.findById(carId);
  console.log(car)
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

  const totalPrice = car.price * quantity;

  car.quantity -= quantity;
  car.inStock = car.quantity > 0;
  await car.save();

  let order = await Order.create({
    user,
    car: carId,
    quantity,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: 'N/A',
    customer_email: user.email,
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
  };


  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};


export const getOrderService = async () => {
  const result = await Order.find();
  return result
};


export const verifyPaymentSercice = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
              ? "Pending"
              : verifiedPayment[0].bank_status == "Cancel"
                ? "Cancelled"
                : "",
      }
    );
  }

  return verifiedPayment;
};


export const getSingleUserOrderService = async ({ _id }: { _id: string }) => {
  const result = await Order.find({ user: _id })

  return result
}


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


// admin
export const manageAllOrderIntoDb = async () => {
  const result =await Order.find();

  return result;
};
