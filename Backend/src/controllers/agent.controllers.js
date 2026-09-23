import { agent } from "../service/service.ai.js";
import { HumanMessage } from "@langchain/core/messages";


 async function agentcontroller (req, res)  {
    try {
        const { message } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                message: "Message is required",
            });
        }

        const response = await agent.invoke({
            messages: [
                new HumanMessage(message.trim())
            ],
        });

        const lastMessage =
            response.messages[response.messages.length - 1];

        res.status(200).json({
            message: lastMessage.content,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "AI agent failed",
            error: error.message || "Unknown AI error",
        });
    }
}

export default agentcontroller