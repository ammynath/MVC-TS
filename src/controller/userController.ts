import { Request, Response } from "express";
import argon2 from "argon2";
import {IUser, userModel} from "../model/userModel"

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, email, password} = req.body as Pick<IUser, "name" | "password" | "email">

        if (!name || !email || !password) {
            res.status(400).json({message: "Please all fileds are required"});
            return;
        }
        const findUser = await userModel.findOne({email})

        if (findUser) {
            res.status(409).json({MESSAGE: "Email already exists"})
        }
        const hashPasword = await argon2.hash(password)
        const createUser = await userModel.create({
            name,
            email,
            password: hashPasword
        })

        res.status(201).json({message: "User created successfully", data: createUser})
    } catch (err: any) {
        res.status(500).json({message: " error occured", error: err.message})
        // res.status(500).json({message: " error occured", error: (err as Error).message || err})
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> =>{
    try {

        const {email, password} = req.body as Pick<IUser, "email" | "password">

        if (!email || !password) {
            res.status(400).json({message: "Missing email or password"});
            return;
        }

        const user: any = await userModel.findOne({email})

        if (!user) {
            res.status(401).json({message: "Invalid credentials"})
        }
        const isMatch = await argon2.verify(user.password, password)

        if (!isMatch) {
            res.status(401).json({message: "Invalid credentials"});
            return;
        }
        res.status(200).json({message: "Login successfully", name: user.name, email: user.email})
    } catch (err: any) {
        res.status(500). json({message: "An error occured", err: err.message})
    }
}