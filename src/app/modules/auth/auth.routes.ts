import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post('/login', authControllers.creadentialLogin );
router.post('/logout', authControllers.logout )
router.post('/refresh-token', authControllers.getNewAccessToken )

export const AuthRoute = router;