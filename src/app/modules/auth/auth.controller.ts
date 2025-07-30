/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../../errorHelper/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";

const creadentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
        const logininfo = await authService.creadentialLogin(req.body)
            
            sendResponse(res, {
                success: true,
                statusCode: StatusCodes.OK,
                message: "User Logged In Successfully",
                data: logininfo
            })
});

export const authControllers ={
    creadentialLogin
}