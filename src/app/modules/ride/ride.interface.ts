import { Schema } from 'mongoose';

export type TRideStatus = 'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled';

export interface IRide {
    riderId: Schema.Types.ObjectId;
    driverId?: Schema.Types.ObjectId;
    pickupLocation: {
        lat: number;
        lng: number;
    };
    destinationLocation: {
        lat: number;
        lng: number;
    };
    status: TRideStatus;
    fare?: number;
}