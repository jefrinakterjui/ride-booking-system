import express from 'express';
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middleware/valodationRequest';
import { DriverValidation } from './driver.validation';
import { DriverControllers } from './driver.controller';

const router = express.Router();

router.patch(
    '/me/availability',
    checkAuth(Role.DRIVER), 
    validateRequest(DriverValidation.updateAvailabilitySchema), 
    DriverControllers.updatedDriverAvailability
);

export const DriverRoutes = router;