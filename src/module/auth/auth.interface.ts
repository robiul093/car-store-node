

export type TUser = {
    name: string;
    email: string;
    password: string;
    role?: string;
    isActive: boolean;
};


export type TChangePassword = {
    userId: string,
    currentPassword: string,
    newPassword: string,
}