import { ICar } from './car.interface';
import Car from './car.model';

const createCar = async (payload: ICar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCars = async (searchTerm?: string) => {
  let filter = {};
  if (searchTerm) {
    filter = {
      $or: [
        { brand: { $regex: searchTerm, $options: 'i' } },
        { model: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }

  const result = await Car.find(filter);

  return result;
};

const getSingleCar = async (carId: string) => {
  const result = await Car.findById(carId);
  return result;
};

const updateCar = async (carId: string, payload: Partial<ICar>) => {
  const result = await Car.findByIdAndUpdate(carId, payload, { new: true });

  return result;
};

const deleteCar = async (carId: string) => {
  const result = await Car.findByIdAndDelete(carId);

  return result;
};

export const carService = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};
