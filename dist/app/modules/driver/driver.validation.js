"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverValidation = exports.updateAvailabilitySchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("../user/user.interface");
exports.updateAvailabilitySchema = zod_1.z.object({
    availabilityStatus: zod_1.z.nativeEnum(user_interface_1.AvailabilityStatus, {
        required_error: 'Availability status is required',
        invalid_type_error: "Status must be either 'ONLINE' or 'OFFLINE'",
    }),
});
exports.DriverValidation = {
    updateAvailabilitySchema: exports.updateAvailabilitySchema
};
