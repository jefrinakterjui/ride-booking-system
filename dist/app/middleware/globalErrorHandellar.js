"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandeller = void 0;
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const handelCastError_1 = require("../helpers/handelCastError");
const handelDuplicateError_1 = require("../helpers/handelDuplicateError");
const handelZodError_1 = require("../helpers/handelZodError");
const handelValidationError_1 = require("../helpers/handelValidationError");
const globalErrorHandeller = (error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        console.log(error);
    }
    let StatusCodes = 500;
    let message = `Something went eorng`;
    let errorSource = [];
    if (error.code === 11000) {
        const simplifyError = (0, handelDuplicateError_1.handelDuplicateError)(error);
        StatusCodes = simplifyError.StatusCodes;
        message = simplifyError.message;
    }
    else if (error.name === "CastError") {
        const simplifyError = (0, handelCastError_1.handelCastError)(error);
        StatusCodes = simplifyError.StatusCodes;
        message = simplifyError.message;
    }
    else if (error.name === "ZodError") {
        const simplifyError = (0, handelZodError_1.handelZodError)(error);
        StatusCodes = simplifyError.StatusCodes;
        message = simplifyError.message;
        errorSource = simplifyError.errorSource;
    }
    else if (error.name === "ValidationError") {
        const simplifyError = (0, handelValidationError_1.handelValidationError)(error);
        StatusCodes = simplifyError.StatusCodes;
        errorSource = simplifyError.errorSource;
        message = simplifyError.message;
    }
    else if (error instanceof AppError_1.default) {
        StatusCodes = error.statusCode;
        message = error.message;
    }
    else if (error instanceof Error) {
        StatusCodes = 500;
        message = error.message;
    }
    res.status(StatusCodes).json({
        success: false,
        message,
        errorSource,
        error: process.env.NODE_ENV === "development" ? error : null,
        stack: process.env.NODE_ENV === "development" ? error.stack : null
    });
};
exports.globalErrorHandeller = globalErrorHandeller;
