import { register, login, getUser, logout } from "../Auth/auth.api"
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
            dispatch(seterror(error.message || "Registration failed"))
        } finally {
            dispatch(setloading(false))
        }
    }

    const handleLogin = async (email, password) => {
        try {
            dispatch(setloading(true))
            const data = await login(email, password)
            dispatch(setuser(data))
            return true
        } catch (error) {
            dispatch(seterror(error.message || "Login failed"))
        } finally {
            dispatch(setloading(false))
        }

    }

    const handleGetUser = async () => {
        try {
            dispatch(setloading(true))
            const data = await getUser()
            dispatch(setuser(data))
        } catch (error) {
            dispatch(seterror(error.message || "Fetching user failed"))
        } finally {
            dispatch(setloading(false))
        }
    }

    const handleLogout = async () => {
        try {
            dispatch(setloading(true))
            const data = await logout()
            dispatch(setuser(null))
        } catch (error) {
            dispatch(seterror(error.message || "Logout failed"))
        } finally {
            dispatch(setloading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetUser,
        handleLogout
    }
}