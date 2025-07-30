import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { StatusCodes } from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse"
import { UserService } from "./user.service"
import AppError from "../../errorHelper/AppError"

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

const getSingleUser = (async(req: Request, res: Response)=>{
        const id = req.params.id 
        const requester = req.user

        if (requester.role !== 'ADMIN' && requester._id !== id) {
            throw new AppError(403, 'Forbidden! You are not authorized to view this profile.');
        }
        const result = await UserService.getSingleUser(id)
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "Users retrieved successfully",
            data: result
        })
});


export const UserControllers={
    createUser,
    getAllUsers,
    getSingleUser
}