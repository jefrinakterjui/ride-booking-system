import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RideService } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";


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

const acceptRide = catchAsync(async (req: Request, res: Response) => {
    const { id: rideId } = req.params
    const driverId = req.user.userId

    const result = await RideService.acceptRide(rideId, driverId)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Ride accepted successfully',
        data: result
    });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
    const { id: rideId } = req.params
    const driverId = req.user.userId
    const { status: newStatus } = req.body

    const result = await RideService.updateRideStatus(
        rideId,
        driverId,
        newStatus
    )

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Ride status updated successfully',
        data: result
    })
});

const getSingleRide = catchAsync(async (req: Request, res: Response) => {
    const { id: rideId } = req.params;
    const requester = req.user;

    const ride = await RideService.getSingleRide(rideId);

    if (!ride) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.NOT_FOUND,
            message: 'Ride not found',
            data: null
        })
    }
    const requesterId = (requester as { userId: string }).userId.toString();

    const isRiderOfThisRide = ride.riderId?._id.toString() === requesterId;

    const isDriverOfThisRide = ride.driverId?._id.toString() === requesterId;


    if (requester.role !== 'ADMIN' && !isRiderOfThisRide && !isDriverOfThisRide) {
        throw new AppError(
            StatusCodes.FORBIDDEN,
            'You are not authorized to view this ride'
        );
    }

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Ride details retrieved successfully',
        data: ride,
    });
});

export const RideControllers = {
  createRide,
  getRideHistory,
  cancelRide,
  getAllRides,
  getAvailableRides,
  acceptRide,
  updateRideStatus,
  getSingleRide
};