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
});

const cancelRide = catchAsync(async (req: Request, res: Response) => {
    const { id: rideId } = req.params
    const riderId = req.user.userId

    const result = await RideService.cancelRide(rideId, riderId)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Ride cancelled successfully',
        data: result
    })
});

const getAllRides = async(req: Request, res: Response) =>{
    const result = await RideService.getAllRides()
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Rides retrieved successfully",
        data: result.data,
        meta: result.meta
    })
}

const getAvailableRides = catchAsync(async (req: Request, res: Response) => {
    const result = await RideService.getAvailableRides()

    if (!result || result.length === 0) {
        return sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: 'No available rides found at the moment',
            data: []
        });
    }
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Available rides retrieved successfully',
        data: result
    })
});

export const RideControllers = {
  createRide,
  getRideHistory,
  cancelRide,
  getAllRides,
  getAvailableRides
};