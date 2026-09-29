import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

import { Rrouter } from "./routes.js/user.router.js"
import { agent } from "./routes.js/agent.router.js"

export const app = express()

// ✅ Create __dirname manually for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(morgan("dev"))
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())

// User routes
app.use("/api", Rrouter)

// AI routes
app.use("/api", agent)

// Check directory
console.log("__dirname:", __dirname)

// Serve React build
app.use(express.static(path.join(__dirname, "../public")))

// React Router fallback
app.get("*name", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../public/index.html")
    )
})