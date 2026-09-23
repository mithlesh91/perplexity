import { register, login, getUser, logout, chatbot } from "../Auth/auth.api"
import { useDispatch } from "react-redux"
import { setuser, setloading, seterror } from "../Auth/Auth.slice"

export const useAuth = () => {
    const dispatch = useDispatch()

    const handleRegister = async (username, email, password) => {
        try {
            dispatch(setloading(true))
            const data = await register(username, email, password)
            return data
            // dispatch(setuser(data))
        } catch (error) {
            dispatch(seterror(error.response?.data?.message || error.message || "Registration failed"))
            throw error
        } finally {
            dispatch(setloading(false))
        }
    }

    const handleLogin = async (email, password) => {
        try {
            dispatch(setloading(true))
            const data = await login(email, password)
            console.log("login data", data)
            dispatch(setuser(data.newuser))
            return data

        } catch (error) {
            dispatch(seterror(error.response?.data?.message || error.message || "Login failed"))
            throw error
        } finally {
            dispatch(setloading(false))
        }

    }

    const handleGetUser = async () => {
        try {
            dispatch(setloading(true))
            const data = await getUser()
            dispatch(setuser(data.user))
            return data
        } catch (error) {
            dispatch(setuser(null));
            dispatch(seterror(error.message || "Fetching user failed"))
        } finally {
            dispatch(setloading(false))
        }
    }

    const handleLogout = async () => {
        try {
            dispatch(setloading(true))
            await logout()
            dispatch(setuser(null))
        } catch (error) {
            dispatch(seterror(error.message || "Logout failed"))
            throw error
        } finally {
            dispatch(setloading(false))
        }
    }

    const handlechatbot = async (message) => {

        try {
            dispatch(setloading(true))
            return await chatbot()
        } catch (error) {
            dispatch(seterror(error.response?.data?.message || error.message || "chatbot failed"))
            throw error
        } finally {
            dispatch(setloading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetUser,
        handleLogout,
        handlechatbot
    }
}