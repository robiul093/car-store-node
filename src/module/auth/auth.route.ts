import { Router } from "express";
import { authController } from "./auth.controller";


const authRoute = Router();

authRoute.post('/register', authController.createUser);
authRoute.post('/login', authController.userLogin);

export default authRoute;