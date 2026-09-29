import axios from "axios"

const api = axios.create({
    baseURL: "https://perplexity-y1l5.onrender.com",
    withCredentials: true
})

export async function sendsmessage({ message, chatId }) {
    try {
        const response = await api.post("/api/ai", { message, chatId })
        return response.data
    } catch (error) {
        console.error("error from chat response", error)
        throw error
    }
}

export async function getchats() {
    try {
        const response = await api.get("/api/chat")
        return response.data
    } catch (error) {
        console.error("error from getchats", error)
        throw error
    }
}

export async function getmessage(chatId) {
    try {
        const response = await api.get(`/api/${chatId}/message`)
        return response.data
    } catch (error) {
        console.error("error from getmessages", error)
        throw error
    }

}

export async function deletechat(chatId) {
    try {
        const response = await api.delete(`/api/delete/${chatId}/message`)
        return response.data
    } catch (error) {
        console.error("error from deletechat", error)
        throw error
    }

}