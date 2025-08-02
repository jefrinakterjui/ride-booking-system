import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IRide, TRideStatus } from "./ride.interface";
import { Ride } from "./ride.model";
import { User } from "../user/user.model";


const createRide = async (riderId: string, payload: Partial<IRide>) => {
    const rider = await User.findById(riderId);

    if (!rider) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Rider not found.');
    }
    if (rider.isDelete) {
        throw new AppError(StatusCodes.FORBIDDEN, 'Your account has been deleted.');
    }
    if (rider.isActive !== 'ACTIVE') {
        throw new AppError(StatusCodes.FORBIDDEN,'Your account is blocked. Please contact support.')
    }
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

    await User.findByIdAndUpdate(riderId, {
        $inc: { totalRidesRequested: 1 }
    })
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

const getAvailableRides = async()=>{
    const availableRides = await Ride.find({status: "requested"})

    return availableRides
}

const acceptRide = async (rideId: string, driverId: string) => {
    const driver = await User.findById(driverId)

    if (!driver) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Driver not found.')
    }
    if (driver.approvalStatus !== 'APPROVED') {
        throw new AppError(StatusCodes.FORBIDDEN,'You are not approved to accept rides.')
    }
    const ride = await Ride.findById(rideId)
    if (!ride) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Ride not found')
    }
    if (ride.status !== 'requested') {
        throw new AppError(StatusCodes.BAD_REQUEST,'This ride is no longer available.')
    }
    const updatedRide = await Ride.findByIdAndUpdate(
        rideId,
        {
            status: 'accepted',
            driverId: driverId
        },
        { new: true, runValidators: true }
    );
    return updatedRide
};

const updateRideStatus= async (rideId: string, driverId: string, newStatus: TRideStatus) => {
    const ride = await Ride.findById(rideId)

    if (!ride) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Ride not found')
    }
    if (ride.driverId?.toString() !== driverId) {
        throw new AppError(StatusCodes.FORBIDDEN,'You are not authorized to update this ride')
    }
    const validTransitions: Partial<Record<TRideStatus, TRideStatus[]>> = {
        accepted: ['picked_up'],
        picked_up: ['in_transit'],
        in_transit: ['completed']
    }
    if (!validTransitions[ride.status]?.includes(newStatus)) {
        throw new AppError(StatusCodes.BAD_REQUEST,`Cannot change status from ${ride.status} to ${newStatus}`)
    }
    const updatedRideStatus = await Ride.findByIdAndUpdate(
        rideId,
        { status: newStatus },
        { new: true }
    )
    if (newStatus === 'completed' && updatedRideStatus) {
        await User.findByIdAndUpdate(driverId, {
            $inc: { totalRidesCompleted: 1 }
        })
    }
    return updatedRideStatus
};

export const RideService = {
    createRide,
    getRideHistory,
    cancelRide,
    getAllRides,
    getAvailableRides,
    acceptRide,
    updateRideStatus
};