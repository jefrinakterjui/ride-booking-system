import { Router } from "express"
import { UserControllers } from "./user.controller"
import { validateRequest } from "../../middleware/valodationRequest"
import { createUserZodSchema } from "./user.validation"
import { checkAuth } from "../../middleware/checkAuth"
import { Role } from "./user.interface"

const router = Router()

router.post('/register', 
    validateRequest(createUserZodSchema), 
    UserControllers.createUser)


router.get('/', checkAuth(Role.ADMIN), UserControllers.getAllUsers)
router.get('/:id', checkAuth(Role.RIDER, Role.ADMIN), UserControllers.getSingleUser)

export const UserRoutes = router

