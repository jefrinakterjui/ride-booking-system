import { Router } from "express"
import { UserControllers } from "./user.controller"
import { validateRequest } from "../../middleware/valodationRequest"
import { changePasswordValidationSchema, createUserZodSchema, updateUserProfileValidationSchema } from "./user.validation"
import { checkAuth } from "../../middleware/checkAuth"
import { Role } from "./user.interface"

const router = Router()

router.post('/register', 
    validateRequest(createUserZodSchema), 
    UserControllers.createUser)


router.get('/me', checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN), UserControllers.getSingleUser)
router.patch(
    '/me',
    checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN), 
    validateRequest(updateUserProfileValidationSchema), 
    UserControllers.updateMyProfile 
);
router.patch(
    '/change-password',
    checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN),
    validateRequest(changePasswordValidationSchema),
    UserControllers.changePassword
);
router.patch('/:id', checkAuth(Role.ADMIN), UserControllers.updatedUser)

export const UserRoutes = router

