import {Router} from "express";
import authController from "../controllers/authController";


const router = Router()
router.post("/forgot-password", authController.checking)

export default router
