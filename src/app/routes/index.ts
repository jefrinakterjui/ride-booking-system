import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.routes";
import { RideRoutes } from "../modules/ride/ride.routes";
import { DriverRoutes } from "../modules/driver/driver.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";

export const router= Router()

export const moduleRoutes = [
    {
        path:"/user",
        route: UserRoutes
    },
    {
        path:"/auth",
        route: AuthRoute
    },
    {
        path:"/rides",
        route: RideRoutes
    },
    {
        path:"/drivers",
        route: DriverRoutes
    },
    {
        path:"/admin",
        route: AdminRoutes
    }
];

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})
