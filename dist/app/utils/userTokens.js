"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokens = void 0;
const jwt_1 = require("./jwt");
const createUserTokens = (user) => {
    const jwtPayloade = {
        userId: user._id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.genaretToken)(jwtPayloade, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.genaretToken)(jwtPayloade, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken,
    };
};
exports.createUserTokens = createUserTokens;
