import { body,validationResult } from "express-validator";

const validation = (req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty){
        return res.status(400).json({
            message:error.array()
        })
    }
    next()
}

const loginvalidation =[
    body("username").trim().notEmpty().withMessage("please fill the username input").isString().withMessage("write yoou username"),
    body("password").notEmpty("please write password").isLength({min:6,max:8}).withMessage("write password min:6 and max :8"),
    body("email").isEmail().withMessage("wirte email formate").trim().withMessage("don't write with space"),
    validation
]

export default loginvalidation