import { user } from "../models/user.model.js"

export async function getcotroller(req, res) {

    try { 
        const users = await user.findById(req.user.id)

        res.status(200).json({
            message: "user is fatched",
            users
        })
    } catch (error) {
    
        console.error(error,"error on getcontroller");
        res.status(500).json({
            message:"internal server errors"
        })
        
    }

}