import express, { Router } from "express"
import {loginUser, signUpUser} from "../controller/userController"


const userRouter: Router = express.Router()

userRouter.post("/signup", signUpUser);
userRouter.post("/login", loginUser)

export {userRouter}
