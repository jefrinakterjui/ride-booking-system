import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RideService } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createRide = catchAsync(async (req: Request, res: Response) => {
    const riderId = req.user.userId
    const result = await RideService.createRide(riderId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Ride requested successfully',
        data: result
    })
});

const getRideHistory = (async(req: Request, res: Response)=>{
    const riderId = req.user.userId 

    const result = await RideService.getRideHistory(riderId)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Ride history retrieved successfully",
        data: result
    })
})

export const RideControllers = {
  createRide,
  getRideHistory
};