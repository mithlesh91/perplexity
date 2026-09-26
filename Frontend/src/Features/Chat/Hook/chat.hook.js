import { initlazationSocket } from "../service/chat.socketio";
import { sendsmessage,getchats,getmessage,deletechat } from "../service/chatApi.js"
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

    async function handlegetchats() {
        dispatch(setisLoading(true))
        dispatch(seterror(null))
        try {
            const data = await getchats()
            const loadedChats = Object.fromEntries(
                (data.chat || []).map((chat) => [
                    chat._id,
                    { ...chat, messages: chats[chat._id]?.messages || [] }
                ])
            )
            dispatch(setChats(loadedChats))
            return data
        } catch (error) {
            dispatch(seterror(error.response?.data?.message || error.message || "Unable to fetch chats."))
            throw error
        } finally {
            dispatch(setisLoading(false))
        }
    }
 
    async function handlegetmesage(chatId = currentchatId) {
        if (!chatId) return null
        dispatch(setisLoading(true))
        dispatch(seterror(null))
        try {
            const data = await getmessage(chatId)
            const loadedChat = data.chat
            dispatch(setChats({
                ...chats,
                [chatId]: {
                    ...(chats[chatId] || {}),
                    ...loadedChat,
                    messages: loadedChat?.messages || []
                }
            }))
            return data
        } catch (error) {
            dispatch(seterror(error.response?.data?.message || error.message || "Unable to fetch messages."))
            throw error
        } finally {
            dispatch(setisLoading(false))
        }
    }
    
    async function handledeletechat(chatId = currentchatId) {
        if (!chatId) return null
        dispatch(setisLoading(true))
        dispatch(seterror(null))
        try {
            const data = await deletechat(chatId)
            const remainingChats = { ...chats }
            delete remainingChats[chatId]
            dispatch(setChats(remainingChats))
            if (currentchatId === chatId) dispatch(setCurrentchatId(null))
            return data
        } catch (error) {
            dispatch(seterror(error.response?.data?.message || error.message || "Unable to delete chat."))
            throw error
        } finally {
            dispatch(setisLoading(false))
        }
    }

    async function handleSelectChat(chatId) {
        dispatch(setCurrentchatId(chatId))
        return handlegetmesage(chatId)
    }

    function handleNewChat() {
        dispatch(setCurrentchatId(null))
    }


    return {
        initlazationSocket,
        handleSendmsg,
        handlegetchats,
        handlegetmesage,
        handledeletechat,
        handleSelectChat,
        handleNewChat,
        
        chats,
        currentchatId,
        isLoading,
        error
    }
}