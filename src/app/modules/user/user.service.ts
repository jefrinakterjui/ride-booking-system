import { StatusCodes } from "http-status-codes";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import AppError from "../../errorHelper/AppError";

const createUser = async (payload: Partial<IUser>)=>{
    const {  email, password, ...rest } = payload
    const isuserExixst = await User.findOne({email})

    if(isuserExixst){
        throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist")
    }
    const hashPassword =await bcryptjs.hash(password  as string, 10)
    const authProvider : IAuthProvider = { provider: "credentials", providerId: email as string}

    const user = await User.create({ 
        email,
        password: hashPassword, 
        auths: [authProvider],
        ...rest})

    return user
};

export const UserService={
    createUser
}