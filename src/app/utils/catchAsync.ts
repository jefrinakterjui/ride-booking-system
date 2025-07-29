/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const catchAsync = (fun: AsyncHandler)=>(req: Request, res: Response, next: NextFunction)=>{
    Promise.resolve(fun(req, res, next)).catch((error: any)=>{
        next(error)
    })
}