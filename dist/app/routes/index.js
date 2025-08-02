"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoutes = exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const ride_routes_1 = require("../modules/ride/ride.routes");
const driver_routes_1 = require("../modules/driver/driver.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
exports.router = (0, express_1.Router)();
exports.moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoute
    },
    {
        path: "/rides",
        route: ride_routes_1.RideRoutes
    },
    {
        path: "/drivers",
        route: driver_routes_1.DriverRoutes
    },
    {
        path: "/admin",
        route: admin_routes_1.AdminRoutes
    }
];
exports.moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
