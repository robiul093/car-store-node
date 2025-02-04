import mongoose, { Schema } from "mongoose";
import { TUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import config from "../../app/config";


const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        trim: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });


userSchema.pre('save', async function(next){
    const user = this;

    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_round)
    )

    next()
})


const User = mongoose.model<TUser>('User', userSchema);

export default User;