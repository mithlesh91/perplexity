import { body, validationResult } from "express-validator";

const validation = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({
            message: error.array()
        })
    }
    next()
}

const uservalidation = [
    body("username").trim().isString().notEmpty().withMessage("user name fill compelsury"),
    body("password").notEmpty().trim().isLength({ min: 6, max: 8 }).withMessage("requird password must"),
    body("email").notEmpty().trim().isEmail().withMessage("required email"),
    validation
]

export default uservalidation