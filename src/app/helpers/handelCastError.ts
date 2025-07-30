/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose from "mongoose"
import { TGenericError } from "../interface/errorTypes"

export const handelCastError = (error: mongoose.Error.CastError): TGenericError =>{
    return{
        StatusCodes : 400,
        message : "Invalid MongoDB ObjectId , Please provide a valid Id"
    }
}