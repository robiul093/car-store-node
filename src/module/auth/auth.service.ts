import config from "../../app/config";
import { TUser } from "./auth.interface"
import User from "./auth.model"
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'


const createUserIntoDB = async (payload: TUser) =>{
    const res = await User.create(payload);

    const jsonPayload = {
        name: res.name,
        email: res.email,
        role: res.role,
        id: res._id
    };

    const token = jwt.sign(jsonPayload, config.jwt_secret as string, {expiresIn: '3d'});

    const user = {
        name: res.name,
        email: res.email,
        role: res.role,
        id: res._id,
    }

    return token;
};


const userLoginIntoDB = async (payload: {email: string, password: string}) => {
    const user = await User.findOne({email: payload.email});

    if(!user){
        throw new Error('This user not exist')
    };

    const isPasswordMatch = await bycript.compare(
        payload.password,
        user.password
    );

    if(!isPasswordMatch){
        throw new Error('Password not match')
    };

    const jsonPayload = {
        name: user?.name,
        email: user?.email,
        role: user?.role,
        id: user?._id,
    };

    const token = jwt.sign(jsonPayload, config.jwt_secret as string, {expiresIn: '3d'})

    return token;
}


export const authService = {
    createUserIntoDB,
    userLoginIntoDB,
}