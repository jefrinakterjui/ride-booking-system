"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role)
    },
    isDelete: { type: Boolean, default: false },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE
    },
    vehicleInfo: {
        vehicleType: { type: String },
        model: { type: String }
    },
    approvalStatus: {
        type: String,
        enum: Object.values(user_interface_1.ApprovalStatus),
        default: user_interface_1.ApprovalStatus.PENDING
    },
    availabilityStatus: {
        type: String,
        enum: Object.values(user_interface_1.AvailabilityStatus),
        default: user_interface_1.AvailabilityStatus.OFFLINE
    },
    totalRidesRequested: {
        type: Number,
        default: 0
    },
    totalRidesCompleted: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});
userSchema.pre("save", function (next) {
    if (this.role !== 'DRIVER') {
        this.vehicleInfo = undefined;
        this.approvalStatus = undefined;
        this.availabilityStatus = undefined;
        this.totalRidesCompleted = undefined;
    }
    if (this.role !== 'RIDER') {
        this.totalRidesRequested = undefined;
    }
    next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);
