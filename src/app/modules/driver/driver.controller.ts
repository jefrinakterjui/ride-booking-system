import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DriverService } from "./driver.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const updatedDriverAvailability = catchAsync(async (req: Request, res: Response) => {
    const driverId = req.user.userId
    const { availabilityStatus } = req.body

    const result = await DriverService.updatedDriverAvailability(driverId, availabilityStatus)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Availability status updated successfully',
        data: result
    })
});

export const DriverControllers = {
  updatedDriverAvailability,
};