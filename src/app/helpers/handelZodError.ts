/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSource, TGenericError } from "../interface/errorTypes"

export const handelZodError =( error: any): TGenericError =>{
    const errorSource: TErrorSource[] = []
    error.issues.forEach((issue: any)=>{
        errorSource.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        })
    })
    return{
        StatusCodes: 400,
        message: "Zod Error",
        errorSource
    }
}