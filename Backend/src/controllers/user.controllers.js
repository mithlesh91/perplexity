import { user } from "../models/user.model.js"
import { sendMail } from "../service/node.mailer.js";
import blackemodel from "../models/blacklistoken.model.js";
import jwt from "jsonwebtoken"


export async function usercontroller(req, res) {
   try {
      const { username, password, email } = req.body

      //input check
      if (!username || !email || !password) {
         return res.status(400).json({
            message: "fill all input required"
         })
      }
      const userexits = await user.findOne({
         $or: [
            { email },
            { username }
         ]
      })

      if (userexits) {
         return res.status(400).json({
            message: "user is already exists"
         })
      }

      const newuser = await user.create({
         username, email, name: username, password
      })
      const emailverifytoken = jwt.sign(
         {
            // id:newuser._id,
            email: newuser.email

         }, process.env.JWT_SECRET,
         {
            expiresIn: "3d"

         })

      await sendMail({
         to: email,
         subject: "welcome to perplexity",
         html: `hi ${username} <p> thanku for registring our perplexity we are excited to you on perplexity 
         <p>please verify you email address click below link <a href="http://localhost:3000/api/verify-email?token=${emailverifytoken}"><br>verify email</p>
         <br>the perplexity team</p>
      `
      })

      //  res.cookie("user_token",token)
      res.status(200).json({
         message: "user is register is successfully",
         newuser: {
            id: newuser._id,
            email: newuser.email,
            password: newuser.password,
            newuser: newuser.username,
            name: newuser.name
         }
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         message: "internal server error"
      })
   }

}

export async function logincontroller(req, res) {
   try {
      const { password, email } = req.body

      const newuser = await user.findOne({
         email
      })
      if (!newuser) {
         return res.status(400).json({
            message: 'invalid user'
         })
      }

      const matchpassword = await newuser.comparePassword(password)

      if (!matchpassword) {
         return res.status(400).json({
            message: 'invalid user'
         })
      }

      if (!newuser.verified) {
         return res.status(400).json({
            message: "email is not verfied",
            success: false,
            err: "email is not valid"
         })
      }
      const token = jwt.sign({
         id: newuser._id,
         email: newuser.email
      }, process.env.JWT_SECRET)
      res.cookie("logintoken", token)
      res.status(200).json({
         message:"user is login successfully",
         newuser: {
            username: newuser.username,
            email: newuser.email,
            id: newuser._id
         }
      })
   } catch (error) {
      console.error(error);
      res.status(500).json({
         message: "internal server errors"
      })

   }
}

export async function logout(req,res) {
   const tokens = req.cookies.logintoken

   const user = await blackemodel.create({
      tokens:tokens
   })
    
   res.clearCookie("logintoken")
   
   res.status(200).json({
      message:"user is logout"
   })
   
}



export async function verifyEmail(req, res) {
   try {
      const { token } = req.query;

      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET
      );

      const newuser = await user.findOne({
         email: decoded.email
      });

      if (!newuser) {
         return res.status(400).json({
            message: "invalid token",
            success: false,
         });
      }

      newuser.verified = true;
      console.log(newuser.verified)
      await newuser.save();
      console.log("saved")

      const html = `
      <h1>Welcome to Perplexity</h1>
      <p>Your email has been verified. You can log in to your account.</p>
      <a href="http://localhost:3000/api/login">Go to Login</a>
    `;

      res.send(html);
   } catch (error) {
      res.status(400).json({
         message: "Invalid or expired token",
      });
   }
}

