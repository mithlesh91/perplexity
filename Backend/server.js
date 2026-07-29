import { app } from "./src/app.js";
import dotenv from "dotenv"
dotenv.config()
import { dbconnection } from "./src/config/database.js";
dbconnection()
app.listen(3000,()=>{
    console.log("port is runnin in 3000")
})