"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRideValidationSchema = void 0;
const zod_1 = require("zod");
exports.createRideValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        pickupLocation: zod_1.z.object({
            lat: zod_1.z.number({
                required_error: 'Pickup latitude is required',
                invalid_type_error: 'Latitude must be a number',
            }),
            lng: zod_1.z.number({
                required_error: 'Pickup longitude is required',
                invalid_type_error: 'Longitude must be a number',
            }),
        }, { required_error: 'Pickup location is required' }),
        destinationLocation: zod_1.z.object({
            lat: zod_1.z.number({
                required_error: 'Destination latitude is required',
                invalid_type_error: 'Latitude must be a number',
            }),
            lng: zod_1.z.number({
                required_error: 'Destination longitude is required',
                invalid_type_error: 'Longitude must be a number',
            }),
        }, { required_error: 'Destination location is required' }),
    }),
});
