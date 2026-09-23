import { Router } from "express";
import agents from "../controllers/agent.controllers.js"

export const agent = Router()

agent.post("/ai",agents)