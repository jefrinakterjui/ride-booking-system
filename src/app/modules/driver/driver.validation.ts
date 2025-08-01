import { z } from 'zod';
import { AvailabilityStatus } from '../user/user.interface';

export const updateAvailabilitySchema = z.object({
  availabilityStatus: z.nativeEnum(AvailabilityStatus, {
    required_error: 'Availability status is required',
    invalid_type_error: "Status must be either 'ONLINE' or 'OFFLINE'",
  }),
});


export const DriverValidation = {
    updateAvailabilitySchema
}