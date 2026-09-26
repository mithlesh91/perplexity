import { initlazationSocket } from "../service/chat.socketio";
import { deletechat, getchats, getmessage, sendsmessage } from "../service/chatApi.js"
import { setChats, setCurrentchatId, setisLoading, seterror } from "../chatSlice.js"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const usechat = () => {

    const dispatch = useDispatch()
    const { chats, currentchatId, isLoading, error } = useSelector((state) => state.chat)

    async function handleGetChats() {
        dispatch(setisLoading(true))
        dispatch(seterror(null))
        try {
            const data = await getchats()
            const loadedChats = Object.fromEntries(
                (data.chat || []).map((chat) => [chat._id, chat])
            )
            dispatch(setChats(loadedChats))
            return loadedChats
        } catch (requestError) {
            dispatch(seterror(requestError.message || "Unable to load your chats."))
            throw requestError
        } finally {
            dispatch(setisLoading(false))
        }
    }

    async function handleOpenChat(chatId) {
        if (!chatId) return
        if (chats[chatId]?.messages) {
            dispatch(setCurrentchatId(chatId))
            return chats[chatId]
        }

        dispatch(setisLoading(true))
        dispatch(seterror(null))
        try {
            const data = await getmessage(chatId)
            if (!data.chat) {
                throw new Error("The response did not include the requested chat.")
            }
            dispatch(setChats({ ...chats, [chatId]: data.chat }))
            dispatch(setCurrentchatId(chatId))
            return data.chat
        } catch (requestError) {
            dispatch(seterror(requestError.message || "Unable to open this chat."))
            throw requestError
        } finally {
            dispatch(setisLoading(false))
        }
    }

    async function handleDeleteChat(chatId) {
        dispatch(setisLoading(true))
        dispatch(seterror(null))
        try {
            await deletechat(chatId)
            const remainingChats = { ...chats }
            delete remainingChats[chatId]
            dispatch(setChats(remainingChats))
            if (currentchatId === chatId) {
                dispatch(setCurrentchatId(null))
            }
        } catch (requestError) {
            dispatch(seterror(requestError.message || "Unable to delete this chat."))
            throw requestError
        } finally {
            dispatch(setisLoading(false))
        }
    }

    useEffect(() => {
        handleGetChats().catch(() => {})
    }, [])

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

    function handleNewChat() {
        dispatch(setCurrentchatId(null))
        dispatch(seterror(null))
    }

    function handleSelectChat(chatId) {
        handleOpenChat(chatId).catch(() => {})
    }



    return {
        initlazationSocket,
        handleSendmsg,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat,
        handleNewChat,
        handleSelectChat,

        chats,
        currentchatId,
        isLoading,
        error
    }
}