import { Router } from 'express';
import { carController } from './car.controller';

const carRouter = Router();

carRouter.post('/cars', carController.createCar);
carRouter.get('/cars/:carId', carController.getASingleCar);
carRouter.get('/cars', carController.getAllCars);
carRouter.put('/cars/:carId', carController.updateCar);
carRouter.delete('/cars/:carId', carController.deleteCar);

export default carRouter;
