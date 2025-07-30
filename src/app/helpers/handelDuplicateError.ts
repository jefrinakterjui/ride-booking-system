/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericError } from "../interface/errorTypes"

export const handelDuplicateError = (error: any): TGenericError =>{
    const duplicate = error.message.match(/"([^"]*)"/)
    return{
        StatusCodes : 400,
        message : `${duplicate?.[1]} already exist`
    }
}