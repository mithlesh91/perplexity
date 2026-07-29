import mongoose from "mongoose";

export function dbconnection(){
    try {
        mongoose.connect(process.env.MONGOOSE_URI)
        console.log("dt is connected")
    } catch (error) {
        console.log(error)
    }
}