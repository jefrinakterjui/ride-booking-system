"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fun) => (req, res, next) => {
    Promise.resolve(fun(req, res, next)).catch((error) => {
        next(error);
    });
};
exports.catchAsync = catchAsync;
