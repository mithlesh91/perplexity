import mongoose from "mongoose";

const chatShema = new mongoose.Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    title:{
       type:String,
       default:"New chat"
    }
},{timestamps:true})

export const chatmodel = mongoose.model("chat",chatShema)