import { initlazationSocket } from "../service/chat.socketio";
import { sendsmessage, getchats, getmessage, deletechat } from "../service/chatApi.js"
import { setChats, setCurrentchatId, setisLoading, seterror } from "../chatSlice.js"

import { useDispatch } from "react-redux"

export const usechat = () => {

    const dispatch = useDispatch()

    async function handleSendmsg({ message, chatId }) {
        dispatch(setisLoading(true))
        const data = await sendsmessage({ message, chatId })
        const { chat, aiMessage } = data
        dispatch(setChats((prev) => {
            return {
                ...prev,
                [chat._id]: {
                    ...chat,
                    messages: [{ content: message, role: "user" }, aiMessage]
                }
            }
        }))
        dispatch(setCurrentchatId(chat._id))
    }


    return {
        initlazationSocket,
        handleSendmsg
    }
}