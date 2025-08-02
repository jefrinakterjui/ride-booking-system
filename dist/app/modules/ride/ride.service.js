"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const ride_model_1 = require("./ride.model");
const user_model_1 = require("../user/user.model");
const calculateDistance_1 = require("../../helpers/calculateDistance ");
const createRide = (riderId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield user_model_1.User.findById(riderId);
    if (!rider) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Rider not found.');
    }
    if (rider.isDelete) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Your account has been deleted.');
    }
    if (rider.isActive !== 'ACTIVE') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Your account is blocked. Please contact support.');
    }
    const { pickupLocation, destinationLocation } = payload;
    const existingActiveRide = yield ride_model_1.Ride.findOne({
        riderId: riderId,
        status: { $in: ['requested', 'accepted', 'in_transit'] }
    });
    if (existingActiveRide) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'You already have an active ride request.');
    }
    const rideData = {
        riderId,
        pickupLocation,
        destinationLocation
    };
    const newRide = yield ride_model_1.Ride.create(rideData);
    yield user_model_1.User.findByIdAndUpdate(riderId, {
        $inc: { totalRidesRequested: 1 }
    });
    return newRide;
});
const getRideHistory = (riderId) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({ riderId: riderId });
    return rides;
});
const cancelRide = (rideId, riderId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Ride not found');
    }
    if (ride.riderId.toString() !== riderId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to cancel this ride');
    }
    if (ride.status !== 'requested') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'This ride can no longer be cancelled');
    }
    const updatedRide = yield ride_model_1.Ride.findByIdAndUpdate(rideId, { status: 'cancelled' }, { new: true, runValidators: true });
    return updatedRide;
});
const getAllRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({});
    const allRides = yield ride_model_1.Ride.countDocuments();
    return {
        data: rides,
        meta: {
            total: allRides
        }
    };
});
const getAvailableRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const availableRides = yield ride_model_1.Ride.find({ status: "requested" });
    return availableRides;
});
const acceptRide = (rideId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield user_model_1.User.findById(driverId);
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Driver not found.');
    }
    if (driver.approvalStatus !== 'APPROVED') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not approved to accept rides.');
    }
    if (driver.availabilityStatus !== 'ONLINE') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You must be online to accept a ride.');
    }
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Ride not found');
    }
    if (ride.status !== 'requested') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'This ride is no longer available.');
    }
    const updatedRide = yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
        status: 'accepted',
        driverId: driverId
    }, { new: true, runValidators: true });
    return updatedRide;
});
const updateRideStatus = (rideId, driverId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Ride not found');
    }
    if (((_a = ride.driverId) === null || _a === void 0 ? void 0 : _a.toString()) !== driverId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to update this ride');
    }
    const validTransitions = {
        accepted: ['picked_up'],
        picked_up: ['in_transit'],
        in_transit: ['completed']
    };
    if (!((_b = validTransitions[ride.status]) === null || _b === void 0 ? void 0 : _b.includes(newStatus))) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Cannot change status from ${ride.status} to ${newStatus}`);
    }
    const updatePayload = {
        status: newStatus,
    };
    if (newStatus === 'completed') {
        const distanceInKm = (0, calculateDistance_1.calculateDistance)(ride.pickupLocation, ride.destinationLocation);
        const baseFare = 50;
        const ratePerKm = 25;
        updatePayload.fare = Math.round(baseFare + distanceInKm * ratePerKm);
    }
    const updatedRideStatus = yield ride_model_1.Ride.findByIdAndUpdate(rideId, updatePayload, {
        new: true, runValidators: true
    });
    if (newStatus === 'completed' && updatedRideStatus) {
        yield user_model_1.User.findByIdAndUpdate(driverId, {
            $inc: { totalRidesCompleted: 1 }
        });
    }
    return updatedRideStatus;
});
exports.RideService = {
    createRide,
    getRideHistory,
    cancelRide,
    getAllRides,
    getAvailableRides,
    acceptRide,
    updateRideStatus
};
