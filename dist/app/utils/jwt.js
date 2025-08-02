"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genaretToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genaretToken = (paylode, secret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(paylode, secret, {
        expiresIn
    });
    return token;
};
exports.genaretToken = genaretToken;
const verifyToken = (token, secret) => {
    const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
    return verifiedToken;
};
exports.verifyToken = verifyToken;
