import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    tokens:{
        type:String,
        
    }
},{timestamps:true})

const blackemodel = mongoose.model("blacklist",blacklistSchema)

export default blackemodel