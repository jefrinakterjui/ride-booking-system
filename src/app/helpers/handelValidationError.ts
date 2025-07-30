/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import { TErrorSource, TGenericError } from "../interface/errorTypes"

export const handelValidationError = (error: mongoose.Error.ValidationError): TGenericError =>{
    const errorSource: TErrorSource[] = []
    const errors = Object.values((error as any).errors)

    errors.forEach((errorObject: any)=> errorSource.push({
        path: errorObject.path,
        message: errorObject.message
    }))
    return{
        StatusCodes: 400,
        message: "Valodation Error",
        errorSource
    }
}