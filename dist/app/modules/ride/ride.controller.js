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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const ride_service_1 = require("./ride.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const createRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const riderId = req.user.userId;
    const result = yield ride_service_1.RideService.createRide(riderId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Ride requested successfully',
        data: result
    });
}));
const getRideHistory = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const riderId = req.user.userId;
    const result = yield ride_service_1.RideService.getRideHistory(riderId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Ride history retrieved successfully",
        data: result
    });
}));
const cancelRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: rideId } = req.params;
    const riderId = req.user.userId;
    const result = yield ride_service_1.RideService.cancelRide(rideId, riderId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Ride cancelled successfully',
        data: result
    });
}));
const getAllRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ride_service_1.RideService.getAllRides();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Rides retrieved successfully",
        data: result.data,
        meta: result.meta
    });
});
const getAvailableRides = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ride_service_1.RideService.getAvailableRides();
    if (!result || result.length === 0) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: 'No available rides found at the moment',
            data: []
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Available rides retrieved successfully',
        data: result
    });
}));
const acceptRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: rideId } = req.params;
    const driverId = req.user.userId;
    const result = yield ride_service_1.RideService.acceptRide(rideId, driverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Ride accepted successfully',
        data: result
    });
}));
const updateRideStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: rideId } = req.params;
    const driverId = req.user.userId;
    const { status: newStatus } = req.body;
    const result = yield ride_service_1.RideService.updateRideStatus(rideId, driverId, newStatus);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Ride status updated successfully',
        data: result
    });
}));
exports.RideControllers = {
    createRide,
    getRideHistory,
    cancelRide,
    getAllRides,
    getAvailableRides,
    acceptRide,
    updateRideStatus
};
