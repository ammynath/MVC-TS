import express, { Express,} from "express"
// import * as dotenv from "dotenv"
import "dotenv/config"
import { userRouter } from "./routes/userRoute";
import { connectDB } from "./config/db";
// dotenv.config


const app: Express = express();
const port = process.env.PORT
connectDB()
// const dotenv = process.env

app.use(express.json())

app.use("/api", userRouter)

app.listen(port, () => {
    console.log (`Our port is here http://localhost:${port}`)
});

