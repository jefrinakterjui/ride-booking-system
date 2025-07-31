import { z } from 'zod';

export const createRideValidationSchema = z.object({
    body: z.object({
        pickupLocation: z.object(
            {
                lat: z.number({
                    required_error: 'Pickup latitude is required',
                    invalid_type_error: 'Latitude must be a number',
                }),
                lng: z.number({
                    required_error: 'Pickup longitude is required',
                    invalid_type_error: 'Longitude must be a number',
                }),
            },
            { required_error: 'Pickup location is required' },
        ),
        destinationLocation: z.object(
            {
                lat: z.number({
                    required_error: 'Destination latitude is required',
                    invalid_type_error: 'Latitude must be a number',
                }),
                lng: z.number({
                    required_error: 'Destination longitude is required',
                    invalid_type_error: 'Longitude must be a number',
                }),
            },
            { required_error: 'Destination location is required' },
        ),
    }),
});