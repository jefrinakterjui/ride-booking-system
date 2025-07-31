import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.routes";
import { RideRoutes } from "../modules/ride/ride.routes";

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
        path:"/ride",
        route: RideRoutes
    }
];

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})
