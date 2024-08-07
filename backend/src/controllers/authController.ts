import gDB from "../InitDataSource";
import {UserEntity} from "../entity/User.entity";
import {validate} from "class-validator";
import {CLog} from "../AppHelper";
import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";


class authController {

    static async checking(req: Request, res: Response) {

        const email= req.body
        console.log(email)

        if (!email) {
            return res.status(401).send(`invalid email or password`)
        }


        const db = gDB.getRepository(UserEntity)

        try { // figure this out
            const user = await db.findOneOrFail({where: email})

            user.generateResetToken();
            await db.save(user)


            console.log("test", user.resetToken)
            return res.status(201).send({ message: "Password reset token generated", token: user.resetToken })

        } catch (err) {
            CLog.bad("Login failed", err)
            res.status(400).send(  `Login failed:, ${err}`)
        }

    }
}
export default authController
