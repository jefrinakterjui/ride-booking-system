import { Schema, model } from 'mongoose';
import { IRide } from './ride.interface';


const rideSchema = new Schema<IRide>(
  {
    riderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    pickupLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    destinationLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['requested', 'accepted', 'picked_up', 'in_transit', 'completed', 'cancelled'],
      default: 'requested',
    },
    fare: {
      type: Number,
    },
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

export const Ride = model<IRide>('Ride', rideSchema);
