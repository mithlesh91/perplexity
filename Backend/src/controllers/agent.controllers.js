import { generateresponse, generatechattitle } from "../service/service.ai.js"
import { chatmodel } from "../models/chat.model.js"
import { massegemodel } from "../models/message.model.js"

async function agentcontroller(req, res) {
    try {
        const { message, chatId } = req.body

        let title = null, chat = null;

        if (!chatId) {
            title = await generatechattitle(message)
            chat = await chatmodel.create({
                user: req.user.id,
                title

            })
        }

        const userMessage = await massegemodel.create({
            chat: chatId || chat._id,
            content: message,
            role: "user"
        })


        const messages = await massegemodel.find({ chat: chatId })

        const result = await generateresponse(messages)



        const aiMessage = await massegemodel.create({
            chat: chatId || chat._id,
            content: result,
            role: "ai"
        })

        res.status(200).json({
            title,
            chat,
            userMessage,
            aiMessage

        })
    } catch (error) {
        console.error("error from ai controller" + error)
    }
}

export default agentcontroller