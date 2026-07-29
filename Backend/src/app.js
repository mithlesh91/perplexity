import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"


export const app = express()  
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

//user router

import { Rrouter } from "./routes.js/user.router.js"
app.use("/api",Rrouter)
