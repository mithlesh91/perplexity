import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

export const register = async (username ,email,password)=>{
    const response = await api.post("/register", { username, email , password })
    return response.data
}

export const login = async (email,password)=>{
    const response = await api.post("/login", { email, password })
    return response.data
}

export const getUser = async () => {
    const response = await api.get("/user")
    return response.data
}   

export const logout = async () => {
    const response = await api.post("/logout")
    return response.data
}

export const chatbot = async (message)=>{
    const response = await api.post("/ai", { message })
    return response.data
}