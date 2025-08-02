import { Router } from "express"
import { checkAuth } from "../../middleware/checkAuth"
import { Role } from "../user/user.interface"
import { UserControllers } from "../user/user.controller"

const router = Router()

router.get('/users', checkAuth(Role.ADMIN), UserControllers.getAllUsers)
router.patch('/:id', checkAuth(Role.ADMIN), UserControllers.updatedUser)

export const AdminRoutes = router

