import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"


export const app = express()  
app.use(morgan("dev"))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

//user router

import { Rrouter } from "./routes.js/user.router.js"
app.use("/api",Rrouter)
