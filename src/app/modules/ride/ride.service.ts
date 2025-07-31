import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IRide } from "./ride.interface";
import { Ride } from "./ride.model";


const createRide = async ( riderId: string, payload: Partial<IRide>) => {
    const { pickupLocation, destinationLocation } = payload

    const existingActiveRide = await Ride.findOne({
        riderId: riderId,
        status: { $in: ['requested', 'accepted', 'in_transit'] }
    })
    if (existingActiveRide) {
        throw new AppError(StatusCodes.BAD_REQUEST,'You already have an active ride request.');
    }
    const rideData = {
        riderId,
        pickupLocation,
        destinationLocation
    }
    const newRide = await Ride.create(rideData);
    return newRide;
};

const getRideHistory = async(riderId: string)=>{
    const rides = await Ride.find({riderId: riderId})

    return rides
}

export const RideService = {
    createRide,
    getRideHistory
};