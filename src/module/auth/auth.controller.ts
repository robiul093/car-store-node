import { Request, Response } from "express";
import { authService } from "./auth.service";


const createUser = async (req: Request, res: Response,) => {
    try {
        const payload = req.body;
        console.log(payload)

        const result = await authService.createUserIntoDB(payload);

        res.json({
            success: true,
            message: 'User register successfully',
            data: result,
        });
    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: 'Failed to fetch cars',
            error: {
                name: err.name,
                errors: err.message,
            },
            stack: err.stack,
        });
    }
};


const userLogin = async (req: Request, res: Response) => {
    try {

        const payload = req.body;

        const result = await authService.userLoginIntoDB(payload);

        res.json({
            success: true,
            message: 'User login successfully',
            data: result,
        });
    } catch (err: any) {

        res.status(500).json({
            success: false,
            message: 'Failed to login',
            error: {
                name: err.name,
                errors: err.message,
            },
            stack: err.stack,
        });
    }
}


export const authController = {
    createUser,
    userLogin,
}