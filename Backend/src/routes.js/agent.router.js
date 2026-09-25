import { Router } from "express";
import agents from "../controllers/agent.controllers.js"
import { identify } from "../Middleware/atuh.middleware.js";
import { getchat,getmessage,deletechat } from "../controllers/agent.controllers.js";

export const agent = Router()

agent.post("/ai",identify,agents)
agent.get("/chat",identify,getchat)
agent.get("/:chatId/message",identify,getmessage)
agent.delete("/delete/:chatId/message",identify,deletechat)