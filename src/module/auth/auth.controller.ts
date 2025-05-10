import { Request, Response } from "express";
import { authService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";


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

        const result = await authService.userLoginIntoDB(req.body);

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
};


const changePassword = catchAsync(async (req, res) => {
    const result = await authService.changePasswordService(req.body)

    res.json({
        success: true,
        message: 'Password updated successfully!',
        data: result,
    });
});


const getAllUser = catchAsync(async (req, res) => {
    const result = await authService.getAllUserFromDB();

    res.json({
        success: true,
        message: 'User retrived successfully!',
        data: result,
    });
});


const updateUserStatus = catchAsync(async (req, res) => {
    const result = await authService.updateUserStatusIntoDb(req.body);

    res.json({
        success: true,
        message: 'Status updated successfully!',
        data: result,
    });
})


export const authController = {
    createUser,
    userLogin,
    changePassword,
    getAllUser,
    updateUserStatus
}