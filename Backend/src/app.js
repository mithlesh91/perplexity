import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();

// ===============================
// ES MODULE __dirname
// ===============================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// MIDDLEWARE
// ===============================

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ===============================
// CORS
// ===============================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// ===============================
// API ROUTES
// ===============================

// User router
import { Rrouter } from "./routes.js/user.router.js";

app.use("/api", Rrouter);

// AI router
import { agent } from "./routes.js/agent.router.js";

app.use("/api", agent);

// ===============================
// FRONTEND
// ===============================

const frontendPath = path.join(__dirname, "public");

app.use(express.static(frontendPath));

// React Router fallback
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});