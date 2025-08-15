"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import * as dotenv from "dotenv"
require("dotenv/config");
const userRoute_1 = require("./routes/userRoute");
// dotenv.config
const app = (0, express_1.default)();
const port = process.env.PORT;
// const dotenv = process.env
app.use(express_1.default.json());
app.use("/api", userRoute_1.userRouter);
app.listen(port, () => {
    console.log(`Our port is here http://localhost:${port}`);
});
//# sourceMappingURL=Server.js.map