import { io } from "socket.io-client";

export const initlazationSocket = () => {
    const socket = io("http://localhost:3000", {
        withCredentials: true,
    });

    socket.on("connect", () => {
        console.log("Socket ID:", socket.id);
    });

    socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
    });

    return socket;
};