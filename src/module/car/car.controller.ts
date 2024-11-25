import { Request, Response } from 'express';
import { carService } from './car.service';

const createCar = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    payload.createdAt = new Date();
    payload.updatedAt = new Date();

    const result = await carService.createCar(payload);

    res.json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: {
          name: error.name,
          errors: error.message,
        },
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the car',
        error: {
          name: error.name,
        },
        stack: error.stack,
      });
    }
  }
};

const getAllCars = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { searchTerm } = req.query;

    const result = await carService.getAllCars(searchTerm as string);

    // no cars found
    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No cars match the search criteria',
        data: result,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cars fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cars',
      error: {
        name: error.name,
        errors: error.message,
      },
      stack: error.stack,
    });
  }
};

// get a single car
const getASingleCar = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const carId = req.params.carId;

    const result = await carService.getSingleCar(carId);

    // no cars found
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'No cars match the search criteria',
        data: result,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Single ar fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch single car',
      error: {
        name: error.name,
        errors: error.message,
      },
      stack: error.stack,
    });
  }
};

// update car
const updateCar = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const carId = req.params.carId;
    const payload = req.body;
    payload.updatedAt = new Date();

    const result = await carService.updateCar(carId, payload);

    // no cars found
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'No cars match the search criteria',
        data: result,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update car',
      error: {
        name: error.name,
        errors: error.message,
      },
      stack: error.stack,
    });
  }
};

// delete car
const deleteCar = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const carId = req.params.carId;

    const result = await carService.deleteCar(carId);

    // no cars found
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'No cars match the search criteria',
        data: result,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete car',
      error: {
        name: error.name,
        errors: error.message,
      },
      stack: error.stack,
    });
  }
};

export const carController = {
  createCar,
  getAllCars,
  getASingleCar,
  updateCar,
  deleteCar,
};
