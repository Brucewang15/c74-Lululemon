import {Router} from "express";
import user from "./user";
import authController from "../controllers/authController";
import auth from "./auth"
import change from "./change";


const rootRouter = Router()
rootRouter.use('/user', user)
rootRouter.use('/auth', auth)
rootRouter.use('/change', change)
export default rootRouter
