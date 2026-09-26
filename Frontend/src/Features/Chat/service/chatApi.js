import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function sendsmessage({ message, chatId }) {
    try {
        const response = await api.post("ai", { message, chatId })
        return response.data
    } catch (error) {
        console.error("error form chatresponse" + chatsresponse)
    }
}

export async function getchats() {
    try {
        const response = await api.get("/chat")
        return response.data
    } catch (error) {
        console.log("error from getchats " + error)
    }
}

export async function getmessage() {
    try {
        const response = await api.get(`/${chatId}/message`)
        return response.data
    } catch (error) {
        console.error("error form getmessages" + error)
    }

}

export async function deletechat() {
    try {
        const response = api.delete(`/delete/${chatId}/message`)
        return response.data
    } catch (error) {
        console.error("error form deletechat" + error)
    }

}