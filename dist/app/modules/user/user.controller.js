"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.createUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "User Created Successfully",
        data: user
    });
}));
const getAllUsers = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers();
    if (!result || !result.data || result.data.length === 0) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            message: "No Users found!"
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Users retrieved successfully",
        data: result.data,
        meta: result.meta
    });
}));
// const getSingleUser = (async(req: Request, res: Response)=>{
//         const id = req.params.id 
//         const requester = req.user
//         if (requester.role !== 'ADMIN' && requester._id !== id) {
//             throw new AppError(403, 'Forbidden! You are not authorized to view this profile.');
//         }
//         const result = await UserService.getSingleUser(id)
//         sendResponse(res, {
//             success: true,
//             statusCode: StatusCodes.OK,
//             message: "Users retrieved successfully",
//             data: result
//         })
// });
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield user_service_1.UserService.getSingleUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Profile retrieved successfully',
        data: result
    });
}));
const updatedUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = yield user_service_1.UserService.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User Updated Successfully",
        data: user
    });
}));
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updatedUser
};
