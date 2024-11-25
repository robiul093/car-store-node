import { model, Schema } from 'mongoose';
import { ICarOrder } from './order.interface';

const orderSchema = new Schema(
  {
    email: { type: String, required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

const Order = model<ICarOrder>('Order', orderSchema);

export default Order;
