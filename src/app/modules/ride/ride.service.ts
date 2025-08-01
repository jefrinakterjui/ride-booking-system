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
};

const cancelRide = async (rideId: string, riderId: string) => {
    const ride = await Ride.findById(rideId);
    if (!ride) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Ride not found');
    }

    if (ride.riderId.toString() !== riderId) {
        throw new AppError(StatusCodes.FORBIDDEN,'You are not authorized to cancel this ride');
    }
    if (ride.status !== 'requested') {
        throw new AppError(StatusCodes.BAD_REQUEST,'This ride can no longer be cancelled');
    }
    const updatedRide = await Ride.findByIdAndUpdate(
        rideId,
        { status: 'cancelled' },
        { new: true, runValidators: true }
    );
    return updatedRide
};

const getAllRides = async()=>{
    const rides = await Ride.find({})
    const allRides = await Ride.countDocuments()

    return {
        data: rides,
        meta:{
            total: allRides
        }
    }
}
export const RideService = {
    createRide,
    getRideHistory,
    cancelRide,
    getAllRides
};