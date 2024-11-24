import { Request, Response } from 'express';
import { carService } from './car.service';

const createCar = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    payload.createdAt = new Date();
    payload.updatedAt = new Date();

    const result = await carService.createCar(payload);

    res.json({
      message: 'Car created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        message: 'An error occurred while creating the car',
        success: false,
        error: {
          name: error.name,
        },
        stack: error.stack,
      });
    }
  }
};



const getAllCars = async (req: Request, res: Response) => {
  try {

    const {searchTerm} = req.query;
    
    const result = await carService.getAllCars(searchTerm as string);


    // no cars found
    if(result.length === 0){
      return res.status(200).json({
        message: "No cars match the search criteria",
          success: true,
          data: result,
      })
    }
    
    
    res.status(200).json({
      message: 'Cars fetched successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch cars',
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
      stack: error.stack,
    });
  }
};

export const carController = {
  createCar,
  getAllCars,
};
