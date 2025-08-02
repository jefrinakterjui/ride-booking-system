"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: zod_1.default
        .string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: zod_1.default
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
    role: zod_1.default
        .enum(["RIDER", "DRIVER"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be either RIDER or DRIVER"
    }),
    vehicleInfo: zod_1.default
        .object({
        vehicleType: zod_1.default.string({ required_error: 'Vehicle model is required' }),
        model: zod_1.default.string({ required_error: 'Vehicle model is required' }),
    })
        .optional(),
    availabilityStatus: zod_1.default
        .nativeEnum(user_interface_1.AvailabilityStatus, {
        invalid_type_error: "Availability status must be either 'ONLINE' or 'OFFLINE'",
    })
        .optional()
})
    .superRefine((data, ctx) => {
    if (data.role === user_interface_1.Role.DRIVER) {
        if (!data.vehicleInfo) {
            ctx.addIssue({
                code: zod_1.default.ZodIssueCode.custom,
                message: 'Vehicle information is required for drivers',
                path: ['vehicleInfo'],
            });
        }
    }
});
exports.updateUserZodSchema = zod_1.default.object({
    role: zod_1.default
        .enum(Object.values(user_interface_1.Role), {
        invalid_type_error: 'Role must be a valid string value'
    })
        .optional(),
    isActive: zod_1.default
        .enum(Object.values(user_interface_1.IsActive), {
        invalid_type_error: 'isActive must be a valid status'
    })
        .optional(),
    isDelete: zod_1.default
        .boolean({ invalid_type_error: "isDeleted must be true or false" })
        .optional(),
    approvalStatus: zod_1.default
        .enum(Object.values(user_interface_1.ApprovalStatus), {
        invalid_type_error: 'Approval status must be a valid value'
    })
        .optional(),
    availabilityStatus: zod_1.default
        .enum(Object.values(user_interface_1.AvailabilityStatus), {
        invalid_type_error: 'Availability Status be a valid value'
    })
});
