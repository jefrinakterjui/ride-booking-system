import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { RideControllers } from "./ride.controller";

const router = Router()

router.post("/request", checkAuth(Role.RIDER), RideControllers.createRide)
router.get("/my-history", checkAuth(Role.RIDER), RideControllers.getRideHistory)
router.get("/all-rides", checkAuth(Role.ADMIN), RideControllers.getAllRides)
router.get("/available", checkAuth(Role.DRIVER), RideControllers.getAvailableRides)
router.patch("/:id/cancel",checkAuth(Role.RIDER), RideControllers.cancelRide)
router.patch("/:id/accept", checkAuth(Role.DRIVER), RideControllers.acceptRide)
router.patch("/:id/status", checkAuth(Role.DRIVER), RideControllers.updateRideStatus)
router.get('/:id', checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN), RideControllers.getSingleRide)
export const RideRoutes = router;