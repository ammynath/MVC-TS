"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signUpUser = void 0;
const argon2_1 = __importDefault(require("argon2"));
const userModel_1 = require("../model/userModel");
const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please all fileds are required" });
            return;
        }
        const findUser = await userModel_1.userModel.findOne({ email });
        if (findUser) {
            res.status(409).json({ message: "Email already exists" });
            return;
        }
        const hashPasword = await argon2_1.default.hash(password);
        const createUser = await userModel_1.userModel.create({
            name,
            email,
            password: hashPasword
        });
        res.status(201).json({ success: true, message: "User created successfully", data: createUser });
    }
    catch (err) {
        res.status(500).json({ message: " error occured", error: err.message });
        // res.status(500).json({message: " error occured", error: (err as Error).message || err})
    }
};
exports.signUpUser = signUpUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Missing email or password" });
            return;
        }
        const user = await userModel_1.userModel.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await argon2_1.default.verify(user.password, password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        res.status(200).json({ message: "Login successfully", name: user.name, email: user.email });
    }
    catch (err) {
        res.status(500).json({ message: "An error occured", err: err.message });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map