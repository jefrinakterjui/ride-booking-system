"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const rideSchema = new mongoose_1.Schema({
    riderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    driverId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    versionKey: false
});
exports.Ride = (0, mongoose_1.model)('Ride', rideSchema);
