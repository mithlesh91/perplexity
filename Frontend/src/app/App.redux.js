import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Features/Auth/Store/Auth.slice.js"

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})