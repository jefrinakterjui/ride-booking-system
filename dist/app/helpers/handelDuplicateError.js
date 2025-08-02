"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelDuplicateError = void 0;
const handelDuplicateError = (error) => {
    const duplicate = error.message.match(/"([^"]*)"/);
    return {
        StatusCodes: 400,
        message: `${duplicate === null || duplicate === void 0 ? void 0 : duplicate[1]} already exist`
    };
};
exports.handelDuplicateError = handelDuplicateError;
