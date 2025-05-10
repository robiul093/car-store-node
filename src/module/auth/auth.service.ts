import config from "../../app/config";
import { TChangePassword, TUser } from "./auth.interface"
import User from "./auth.model"
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'


type TDbUser = {
    createdAt: string,
    email: string,
    isActive: boolean,
    name: string,
    password: string,
    role: string,
    updatedAt: string,
    __v: number,
    _id: string,
}

const createUserIntoDB = async (payload: TUser) => {
    const res = await User.create(payload);

    const jsonPayload = {
        name: res.name,
        email: res.email,
        role: res.role,
        id: res._id
    };

    const token = jwt.sign(jsonPayload, config.jwt_secret as string, { expiresIn: '3d' });

    const user = {
        name: res.name,
        email: res.email,
        role: res.role,
        id: res._id,
    }

    return token;
};


const userLoginIntoDB = async (payload: { email: string, password: string }) => {
    const user = await User.findOne({ email: payload.email });

    if (!user) {
        throw new Error('This user not exist')
    };

    const isPasswordMatch = await bycript.compare(
        payload.password,
        user.password
    );

    if (!isPasswordMatch) {
        throw new Error('Password not match')
    };

    const jsonPayload = {
        name: user?.name,
        email: user?.email,
        role: user?.role,
        id: user?._id,
    };

    const token = jwt.sign(jsonPayload, config.jwt_secret as string, { expiresIn: '10d' })

    return token;
};


const changePasswordService = async (payload: TChangePassword) => {
    const user = await User.findById(payload.userId);

    if (!user) {
        throw new Error('This user not exist');
    };

    const isPasswordMatch = await bycript.compare(
        payload.currentPassword,
        user.password
    );

    if (!isPasswordMatch) {
        throw new Error('Password not match')
    };

    const hashedPassword = await bycript.hash(payload.newPassword, Number(config.bcrypt_salt_round));

    const result = User.findByIdAndUpdate(payload.userId, { password: hashedPassword }, { new: true });

    return result;
};


const getAllUserFromDB = async () => {
    const result = await User.find();

    return result;
};


const updateUserStatusIntoDb = async (payload: TDbUser) => {
    const { _id, isActive } = payload;
    const result = await User.findByIdAndUpdate(_id, { $set: { isActive: !isActive } }, { new: true })

    return result
};


export const authService = {
    createUserIntoDB,
    userLoginIntoDB,
    changePasswordService,
    getAllUserFromDB,
    updateUserStatusIntoDb
}