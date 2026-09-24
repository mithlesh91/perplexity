import { generateresponse, generatechattitle } from "../service/service.ai.js"
import { chatmodel } from "../models/chat.model.js"
import { massegemodel } from "../models/message.model.js"

async function agentcontroller(req, res) {
    try {
        const { message } = req.body
        const title = await generatechattitle(message)
        const result = await generateresponse(message)

        const chat = await chatmodel.create({
            user: req.user.id,
            title

        })

        const userMessage = await massegemodel.create({
            chat: chat._id,
            content: message,
            role: "user"
        })

        const aiMessage = await massegemodel.create({
            chat: chat._id,
            content: result,
            role: "ai"
        })

        res.status(200).json({
            chat,
            userMessage,
            aiMessage

        })
    } catch (error) {
        console.error("error from " + error)
    }
}

export default agentcontroller