import { initlazationSocket } from "../service/chat.socketio";
import { sendsmessage } from "../service/chatApi.js"
import { setChats, setCurrentchatId, setisLoading, seterror } from "../chatSlice.js"

import { useDispatch, useSelector } from "react-redux"

export const usechat = () => {

    const dispatch = useDispatch()
    const { chats, currentchatId, isLoading, error } = useSelector((state) => state.chat)

    async function handleSendmsg({ message, chatId }) {
        dispatch(setisLoading(true))
        dispatch(seterror(null))
        try {
            const data = await sendsmessage({ message, chatId })
            const resolvedChatId = chatId || data.chat?._id

            if (!resolvedChatId) {
                throw new Error("The response did not include a chat ID.")
            }

            const currentChat = chats[resolvedChatId]
            dispatch(setChats({
                ...chats,
                [resolvedChatId]: {
                    ...(data.chat || currentChat),
                    messages: [
                        ...(currentChat?.messages || []),
                        data.userMessage || { content: message, role: "user" },
                        data.aiMessage
                    ].filter(Boolean)
                }
            }))
            dispatch(setCurrentchatId(resolvedChatId))
            return data
        } catch (requestError) {
            dispatch(seterror(requestError.message || "Unable to send your message."))
            throw requestError
        } finally {
            dispatch(setisLoading(false))
        }
    }

    


    return {
        initlazationSocket,
        handleSendmsg,
        
        chats,
        currentchatId,
        isLoading,
        error
    }
}