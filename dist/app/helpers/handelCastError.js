"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelCastError = void 0;
const handelCastError = (error) => {
    return {
        StatusCodes: 400,
        message: "Invalid MongoDB ObjectId , Please provide a valid Id"
    };
};
exports.handelCastError = handelCastError;
