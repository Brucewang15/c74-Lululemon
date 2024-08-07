import {Router} from "express";
import UserController from "../controllers/UserController";


const router = Router()
router.get("/addOne", UserController.addOne)

export default router
