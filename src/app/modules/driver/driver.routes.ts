
import { checkAuth } from '../../middleware/checkAuth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middleware/valodationRequest';
import { Router } from 'express';
import { DriverValidation } from './driver.validation';
import { DriverControllers } from './driver.controller';

const router = Router();

router.get("/me/earnings",checkAuth(Role.DRIVER),DriverControllers.getDriverEarnings );
router.patch(
    '/me/availability',
    checkAuth(Role.DRIVER), 
    validateRequest(DriverValidation.updateAvailabilitySchema), 
    DriverControllers.updatedDriverAvailability
);
router.get(
    '/me/history',
    checkAuth(Role.DRIVER),
    DriverControllers.getMyHistory
);

export const DriverRoutes = router;