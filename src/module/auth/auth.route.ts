import { Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";


const authRoute = Router();

authRoute.post('/register', authController.createUser);
authRoute.post('/login', authController.userLogin);
authRoute.post('/change-password', authController.changePassword);

// admin route
authRoute.get('/admin/get-user', auth('admin'), authController.getAllUser);
authRoute.post('/admin/manage-status', auth('admin'), authController.updateUserStatus);

export default authRoute;