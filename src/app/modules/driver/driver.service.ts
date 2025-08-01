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

export const DriverService = {
    updatedDriverAvailability
};