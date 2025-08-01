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
    const earnings = await Ride.aggregate([
        {
            $match: {
                driverId: driverId,
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

export const DriverService = {
    updatedDriverAvailability,
    getDriverEarnings
};