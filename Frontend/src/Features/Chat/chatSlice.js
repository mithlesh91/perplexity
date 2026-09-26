import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentchatId: null,
        isLoading: false,
        error: null
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentchatId:(state,action)=>{
            state.currentchatId = action.payload
        },
        setisLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        seterror:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const {setChats,setCurrentchatId,setisLoading,seterror} = chatSlice.actions
export default chatSlice.reducer