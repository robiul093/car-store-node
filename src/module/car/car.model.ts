import mongoose, { Schema } from 'mongoose';
import { ICar } from './car.interface';

const carSchema = new Schema<ICar>(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    price: {
      type: Number,
      min: [0, 'Price must be a positive number'],
      required: [true, 'Price is required'],
    },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      min: [0, 'Quantity must be a positive number'],
      required: [true, 'Quantity is required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock is required'],
    },
  },
  { timestamps: true },
);

const Car = mongoose.model<ICar>('Car', carSchema);

export default Car;
