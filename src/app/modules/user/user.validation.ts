import z from "zod";
import { ApprovalStatus, AvailabilityStatus, IsActive, Role } from "./user.interface";

export  const createUserZodSchema = z.object({
    name: z
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: z
        .string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: z
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
    role: z
        .enum(["RIDER", "DRIVER"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be either RIDER or DRIVER"
        }),
    vehicleInfo: z
        .object({
            vehicleType: z.string({ required_error: 'Vehicle model is required' }),
            model: z.string({ required_error: 'Vehicle model is required' }),
        })
        .optional(),
    availabilityStatus: z
        .nativeEnum(AvailabilityStatus, {
            invalid_type_error: "Availability status must be either 'ONLINE' or 'OFFLINE'",
        })
        .optional()
})
.superRefine((data, ctx) => {
    if (data.role === Role.DRIVER) {
        if (!data.vehicleInfo) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Vehicle information is required for drivers',
                path: ['vehicleInfo'], 
            });
        }
    }
})

export  const updateUserZodSchema = z.object({
    role: z
        .enum(Object.values(Role) as [string],{
            invalid_type_error: 'Role must be a valid string value'
        })
        .optional(),
    isActive: z
        .enum(Object.values(IsActive) as [string],{
            invalid_type_error: 'isActive must be a valid status'
        })
        .optional(),
    isDelete: z
        .boolean({ invalid_type_error: "isDeleted must be true or false" })
        .optional(),
    approvalStatus: z
        .enum(Object.values(ApprovalStatus) as [string],{
            invalid_type_error: 'Approval status must be a valid value'
        })
        .optional(),
    availabilityStatus: z
        .enum(Object.values(AvailabilityStatus) as [string],{
            invalid_type_error:'Availability Status be a valid value'
        })
})

export const updateUserProfileValidationSchema = z.object({
    name: z.string().optional(),
    vehicleInfo: z
        .object({
            vehicleType: z.string({ required_error: 'Vehicle model is required' }),
            model: z.string({ required_error: 'Vehicle model is required' }),
        })
        .optional(),
});
