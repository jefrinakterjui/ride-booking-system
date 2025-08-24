/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { Ride } from "../ride/ride.model";
import { AvailabilityStatus } from "../user/user.interface";
import { User } from "../user/user.model";


const updatedDriverAvailability = async (driverId: string, status: AvailabilityStatus) => {
    const updatedDriver = await User.findByIdAndUpdate(
        driverId,
        { availabilityStatus: status },
        { new: true, runValidators: true, select: '-password' }
    );
    return updatedDriver;
};


const getDriverEarnings= async (driverId: string) => {
    const driverObjectId = new mongoose.Types.ObjectId(driverId);
    const earnings = await Ride.aggregate([
        {
            $match: {
                driverId: driverObjectId,
                status: 'completed',
            }
        },
        {
            $group: {
                _id: null, 
                totalEarnings: { $sum: '$fare' }, 
                totalRides: { $sum: 1 },
            }
        }
    ]);
    if (earnings.length === 0) {
        return {
            totalEarnings: 0,
            totalRides: 0,
        };
    }
    return earnings[0]
};

// const getMyHistory = async (driverId: string) => {
//   const rides = await Ride.find({ driverId: driverId }).populate(
//     'riderId',
//     'name email', 
//   );

//   return rides;
// };
const getMyHistory = async (driverId: string, query: Record<string, any>) => {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const skip = (page - 1) * limit
    const filter: any = { driverId: driverId }

    if (query.status) {
        filter.status = query.status;
    }

    if (query.startDate && query.endDate) {
        filter.createdAt = {
            $gte: new Date(query.startDate as string),
            $lte: new Date(query.endDate as string),
        }
    }

    const [rides, total] = await Promise.all([
        Ride.find(filter).skip(skip).limit(limit).populate('riderId', 'name email'),
        Ride.countDocuments(filter)
    ])

    return {
        data: rides,
        meta: {
            page,
            limit,
            total
        }
    }
};


export const DriverService = {
    updatedDriverAvailability,
    getDriverEarnings,
    getMyHistory
};