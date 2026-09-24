import { Router } from "express";
import agents from "../controllers/agent.controllers.js"
import { identify } from "../Middleware/atuh.middleware.js";

export const agent = Router()

agent.post("/ai",identify,agents)