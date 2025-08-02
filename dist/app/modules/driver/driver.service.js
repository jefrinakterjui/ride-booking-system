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
exports.DriverService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ride_model_1 = require("../ride/ride.model");
const user_model_1 = require("../user/user.model");
const updatedDriverAvailability = (driverId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDriver = yield user_model_1.User.findByIdAndUpdate(driverId, { availabilityStatus: status }, { new: true, runValidators: true, select: '-password' });
    return updatedDriver;
});
const getDriverEarnings = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driverObjectId = new mongoose_1.default.Types.ObjectId(driverId);
    const earnings = yield ride_model_1.Ride.aggregate([
        {
            $match: {
                driverId: driverObjectId,
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
    return earnings[0];
});
exports.DriverService = {
    updatedDriverAvailability,
    getDriverEarnings
};
