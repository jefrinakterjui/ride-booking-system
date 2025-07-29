import { Router } from "express"
import { UserControllers } from "./user.controller"
import { validateRequest } from "../../middleware/valodationRequest"
import { createUserZodSchema } from "./user.validation"

const router = Router()

router.post('/register', 
    validateRequest(createUserZodSchema), 
    UserControllers.createUser)

export const UserRoutes = router

