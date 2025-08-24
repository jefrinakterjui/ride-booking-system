/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../../errorHelper/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";
import { setAuthCookeis } from "../../utils/setCookies";
import { createUserTokens } from "../../utils/userTokens";

const creadentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
        const logininfo = await authService.creadentialLogin(req.body)
            
        const userToken = await createUserTokens(logininfo.user)
        setAuthCookeis(res, userToken)
            sendResponse(res, {
                success: true,
                statusCode: StatusCodes.OK,
                message: "User Logged In Successfully",
                data: logininfo
            })
});

const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            throw new AppError(StatusCodes.BAD_REQUEST, "No refresh Token recived from cookeis")
        }
        const tokenInfo = await authService.getNewAccessToken(refreshToken)

        setAuthCookeis(res, tokenInfo);
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "New Access Token Retrive Successfully",
            data: tokenInfo
        })
})
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
        res.clearCookie("accessToken",{
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        });
        res.clearCookie("refreshToken",{
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        })
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "User Log out Successfully",
            data: null
        })
})

export const authControllers ={
    creadentialLogin,
    getNewAccessToken,
    logout
}