import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Features/Auth/service/Auth.slice.js"
import chatSlice from "../Features/Chat/chatSlice.js"

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        chat:chatSlice
    }
})