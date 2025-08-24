import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { StatusCodes } from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse"
import { UserService } from "./user.service"
import { JwtPayload } from "jsonwebtoken"

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
        const result = await UserService.getAllUsers(req.query)

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

// const getSingleUser = (async(req: Request, res: Response)=>{
//         const id = req.params.id 
//         const requester = req.user

//         if (requester.role !== 'ADMIN' && requester._id !== id) {
//             throw new AppError(403, 'Forbidden! You are not authorized to view this profile.');
//         }
//         const result = await UserService.getSingleUser(id)
//         sendResponse(res, {
//             success: true,
//             statusCode: StatusCodes.OK,
//             message: "Users retrieved successfully",
//             data: result
//         })
// });
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId

    const result = await UserService.getSingleUser(userId)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Profile retrieved successfully',
        data: result
    })
});

const updatedUser = catchAsync(async (req: Request, res: Response)=>{
        const userId = req.params.id;
        const verifiedToken = req.user
        const payload = req.body
        const user = await UserService.updateUser(userId, payload, verifiedToken as JwtPayload)
        
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "User Updated Successfully",
            data: user
        })
})

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as JwtPayload).userId;
    const payload = req.body
    const result = await UserService.updateMyProfile(userId, payload)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Profile updated successfully',
        data: result,
    });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as JwtPayload).userId; 
    const { oldPassword, newPassword } = req.body;

    await UserService.changePassword(userId, {
        oldPassword,
        newPassword
    });

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Password changed successfully',
        data: {
        message: 'Your password has been updated.'
        }
    });
});



export const UserControllers={
    createUser,
    getAllUsers,
    getSingleUser,
    updatedUser,
    updateMyProfile,
    changePassword
}