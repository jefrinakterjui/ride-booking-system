"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelValidationError = void 0;
const handelValidationError = (error) => {
    const errorSource = [];
    const errors = Object.values(error.errors);
    errors.forEach((errorObject) => errorSource.push({
        path: errorObject.path,
        message: errorObject.message
    }));
    return {
        StatusCodes: 400,
        message: "Valodation Error",
        errorSource
    };
};
exports.handelValidationError = handelValidationError;
