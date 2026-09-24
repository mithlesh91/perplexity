import mongoose from "mongoose";

const massageSchema = new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chatmodel"
    }, 
    content:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","ai"],
        required:true
    }
},{timestamps:true})

export const massegemodel = mongoose.model("massage",massageSchema)