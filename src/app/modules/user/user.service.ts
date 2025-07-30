/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"

const createUser = async (payload: Partial<IUser>)=>{
    const {  email, password, ...rest } = payload
    const isuserExixst = await User.findOne({email})

    const hashPassword =await bcryptjs.hash(password  as string, 10)
    const authProvider : IAuthProvider = { provider: "credentials", providerId: email as string}

    const user = await User.create({ 
        email,
        password: hashPassword, 
        auths: [authProvider],
        ...rest})

    return user
};

const getAllUsers = async()=>{
    const users = await User.find()
    const allUser = await User.countDocuments()

    return {
        data: users,
        meta:{
            total: allUser
        }
    }
}

export const UserService={
    createUser,
    getAllUsers
}