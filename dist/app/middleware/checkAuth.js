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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../modules/user/user.model");
const http_status_codes_1 = require("http-status-codes");
const user_interface_1 = require("../modules/user/user.interface");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.default(403, "No token recived");
        }
        const veryfiedToken = (0, jwt_1.verifyToken)(accessToken, process.env.JWT_ACCESS_SECRET);
        const isUserExist = yield user_model_1.User.findOne({ email: veryfiedToken.email });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User dose not exist");
        }
        if (isUserExist.isActive === user_interface_1.IsActive.BLOCKED || isUserExist.isActive === user_interface_1.IsActive.INACTIVE) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `User is ${isUserExist.isActive}`);
        }
        ;
        if (isUserExist.isDelete) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, " User is deleted");
        }
        if (!authRoles.includes(veryfiedToken.role)) {
            throw new AppError_1.default(403, "You are not permitted to view this route!!");
        }
        req.user = veryfiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
