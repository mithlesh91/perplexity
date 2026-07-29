import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true["name is required"]
    },
    username:{
        type:String,
        required:true["username is required"],
        unique:true 
    },
    email:{
      type:String,
    //   unique:true,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true}) 

UserSchema.pre("save", async function(){
    if(!this.isModified("password"))
        return
    this.password= await bcrypt.hash(this.password,10)
})
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

export const user = mongoose.model("user",UserSchema)