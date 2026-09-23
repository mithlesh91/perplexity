import { app } from "./src/app.js";
import dotenv from "dotenv"
dotenv.config()

import http from "http"
import { dbconnection } from "./src/config/database.js";
import { initsocket } from "./src/socketio/server.socketio.js";

const httpServer = http.createServer(app)
initsocket(httpServer)

dbconnection()
httpServer.listen(3000, () => {
    console.log("port is runnin in 3000")
})