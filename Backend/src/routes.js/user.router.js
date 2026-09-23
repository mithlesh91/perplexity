import { Router } from "express";
import uservalidation from "../allvalidation/validation.js";
import { usercontroller } from "../controllers/user.controllers.js";
import { verifyEmail } from "../controllers/user.controllers.js";
import { logincontroller } from "../controllers/user.controllers.js";
import loginvalidation from "../allvalidation/login.validation.js";
import { logout } from "../controllers/user.controllers.js";
import { getcotroller } from "../controllers/get.controller.js";
import { identify } from "../Middleware/atuh.middleware.js";
export const Rrouter = Router()

Rrouter.post("/register",uservalidation,usercontroller)
Rrouter.post("/login",loginvalidation,logincontroller)
Rrouter.get('/verify-email',verifyEmail)
Rrouter.post("/logout",logout)
Rrouter.get("/profile",identify,getcotroller)