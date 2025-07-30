import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import bcryptjs from "bcryptjs"
import { createUserTokens } from "../../utils/userTokens";

/* eslint-disable no-console */
const creadentialLogin = async (paylode: Partial<IUser>)=>{
    if (!paylode) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No data provided in request body");
    }
    console.log(paylode.email)
    const { email , password } = paylode;

    const isUserExist = await User.findOne({email});

    if(!isUserExist){
        throw new AppError(StatusCodes.BAD_REQUEST , " Email dose not exist ")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string , isUserExist.password as string)

    if(!isPasswordMatched){
        throw new AppError(StatusCodes.BAD_REQUEST , " Incorrect Password")
    }

    const userTokens = createUserTokens(isUserExist)


    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const {password: pass , ...rest}= isUserExist.toObject()
    return{
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }
}


export const authService ={
    creadentialLogin
}