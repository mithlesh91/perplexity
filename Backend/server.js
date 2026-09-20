import { app } from "./src/app.js";
import dotenv from "dotenv"
dotenv.config()
// import { runAgent } from "./src/service/service.ai.js";
import { dbconnection } from "./src/config/database.js";
dbconnection()
// runAgent()
app.listen(3000, () => {
    console.log("port is runnin in 3000")
})