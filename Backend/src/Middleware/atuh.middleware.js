import jwt from "jsonwebtoken"
import blackemodel from "../models/blacklistoken.model.js"

export async function identify(req, res, next) {

    try {
        const token = req.cookies.logintoken
        if (!token) {
            return res.status(400).json({
                message: "invilade token"
            })
        }

        const blocklist = await blackemodel.findOne({ tokens: token })
        if (blocklist) {
            return res.status(400).json({
                message: "this code is inviled bb"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Invalid token"
        });
    }

}