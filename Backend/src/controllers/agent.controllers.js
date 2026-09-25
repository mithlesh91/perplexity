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


        const messages = await massegemodel.find({ chat: chatId || chat._id })

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

export async function getchat(req, res) {
    try {
        const user = req.body
        const chat = await chatmodel.find({ user: req.user.id })

        res.status(200).json({
            message: "chat is fatched",
            chat
        })
    } catch (error) {
        console.log("error form chatgets" + error)
    }

}

export async function getmessage(req, res) {
    try {
        const { chatId } = req.params
        const chats = await chatmodel.find({
            id: chatId,
            user: req.user.id
        })
        if (!chats) {
            return res.status(404).json({
                message: "user is not found"
            })
        }

        const message = await massegemodel.find({
            chat: chatId
        })

        res.status(200).json({
            message: "message is fatched",
            chats,
            message
        })

    } catch (error) {
        console.error("error fom getmessage" + error)
    }

}



export async function deletechat(req, res) {
   try {
     const  {chatId}  = req.params
    const chat = await chatmodel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })
    await massegemodel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "chat is not found"
        })
    }

    res.status(200).json({
        message:"chat is deleted"
    })
   } catch (error) {
     console.error("error form deletechat" + error)
   }

}



export default agentcontroller