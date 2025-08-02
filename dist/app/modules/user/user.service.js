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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = require("http-status-codes");
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const ride_model_1 = require("../ride/ride.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = payload, restPayload = __rest(payload, ["email", "password", "role"]);
    const isuserExixst = yield user_model_1.User.findOne({ email });
    if (isuserExixst) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User with this email already exists");
    }
    const hashPassword = yield bcryptjs_1.default.hash(password, 10);
    const authProvider = { provider: "credentials", providerId: email };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashPassword, role: role, auths: [authProvider] }, restPayload));
    const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return userWithoutPassword;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({}, { password: 0 });
    const allUser = yield user_model_1.User.countDocuments();
    return {
        data: users,
        meta: {
            total: allUser
        }
    };
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield user_model_1.User.findById(userId).lean();
    if (!userProfile) {
        return null;
    }
    if (userProfile.role === 'RIDER') {
        const rideCount = yield ride_model_1.Ride.countDocuments({ riderId: userId });
        userProfile.totalRidesRequested = rideCount;
    }
    else if (userProfile.role === 'DRIVER') {
        const rideCount = yield ride_model_1.Ride.countDocuments({
            driverId: userId,
            status: 'completed'
        });
        userProfile.totalRidesCompleted = rideCount;
    }
    return userProfile;
});
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    if (payload.role) {
        if (decodedToken.role !== user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorize");
        }
    }
    if (payload.isActive || payload.isDelete || payload.approvalStatus) {
        if (decodedToken.role !== user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorize");
        }
    }
    if (payload.password) {
        payload.password = yield bcryptjs_1.default.hash(payload.password, process.env.BCRYPT_SALT_ROUND);
    }
    ;
    const newUpdateUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return newUpdateUser;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser
};
