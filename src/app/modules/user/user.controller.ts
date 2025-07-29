import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { StatusCodes } from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse"
import { UserService } from "./user.service"

const createUser = catchAsync(async (req: Request, res: Response)=>{
    const user = await UserService.createUser(req.body)
        
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Created Successfully",
        data: user
    })
})

export const UserControllers={
    createUser
}