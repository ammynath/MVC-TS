"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", userController_1.signUpUser);
userRouter.post("/login", userController_1.loginUser);
//# sourceMappingURL=userRoute.js.map