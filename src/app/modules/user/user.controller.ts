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
});

const getAllUsers = (async(req: Request, res: Response)=>{
        const result = await UserService.getAllUsers()

        if(!result || !result.data || result.data.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No Users found!"
            })
        } 
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "Users retrieved successfully",
            data: result.data,
            meta: result.meta
        })
})

export const UserControllers={
    createUser,
    getAllUsers
}