/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import AppError from "../../errorHelper/AppError";
import { JwtPayload } from "jsonwebtoken";
import { Ride } from "../ride/ride.model";

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

const getSingleUser = async (userId: string) => {
    const userProfile = await User.findById(userId).lean()
    if (!userProfile) {
        return null
    }
    if (userProfile.role === 'RIDER') {
        const rideCount = await Ride.countDocuments({ riderId: userId })
        userProfile.totalRidesRequested = rideCount
    } 
    else if (userProfile.role === 'DRIVER') {
        const rideCount = await Ride.countDocuments({
            driverId: userId,
            status: 'completed'
        })
        userProfile.totalRidesCompleted = rideCount
    }
    return userProfile
};

const updateUser = async(userId: string, payload: Partial<IUser>, decodedToken: JwtPayload)=>{
    const isUserExist = await User.findById(userId)

    if(!isUserExist){
        throw new AppError(StatusCodes.NOT_FOUND, "User not found")
    }

    if(payload.role){
        if(decodedToken.role !== Role.ADMIN){
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorize")
        }
    }
    if(payload.isActive || payload.isDelete || payload.approvalStatus){
        if(decodedToken.role !== Role.ADMIN){
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorize")
        }
    }
    if(payload.password){
        payload.password = await bcryptjs.hash(payload.password, process.env.BCRYPT_SALT_ROUND as string)
    };
    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true})
    return newUpdateUser
}

export const UserService={
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser
}