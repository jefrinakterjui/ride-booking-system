/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import AppError from "../../errorHelper/AppError";

const createUser = async (payload: Partial<IUser>)=>{
    const {  email, password, role, ...restPayload } = payload
    const isuserExixst = await User.findOne({email})

    if(isuserExixst){
        throw new AppError(StatusCodes.BAD_REQUEST, "User with this email already exists")
    }

    const hashPassword =await bcryptjs.hash(password  as string, 10)
    const authProvider : IAuthProvider = { provider: "credentials", providerId: email as string}

    

    const user = await User.create({ 
        email,
        password: hashPassword,
        role:  role,
        auths: [authProvider],
        ...restPayload
    })
    const { password: _, ...userWithoutPassword } = user.toObject()

    return userWithoutPassword
};



const getAllUsers = async()=>{
    const users = await User.find({}, { password: 0 })
    const allUser = await User.countDocuments()

    return {
        data: users,
        meta:{
            total: allUser
        }
    }
}

const getSingleUser = async(_id: string)=>{
    const user = await User.findById({_id})

    return {
        data:user
    }
}

export const UserService={
    createUser,
    getAllUsers,
    getSingleUser,
}