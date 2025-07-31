import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { RideControllers } from "./ride.controller";

const router = Router()

router.post("/request", checkAuth(Role.RIDER), RideControllers.createRide)

export const RideRoutes = router;