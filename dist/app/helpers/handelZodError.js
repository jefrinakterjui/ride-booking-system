"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelZodError = void 0;
const handelZodError = (error) => {
    const errorSource = [];
    error.issues.forEach((issue) => {
        errorSource.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        });
    });
    return {
        StatusCodes: 400,
        message: "Zod Error",
        errorSource
    };
};
exports.handelZodError = handelZodError;
