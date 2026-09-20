import { createBrowserRouter } from "react-router-dom";

import Login from "./Features/pages/Login";
import Register from "./Features/pages/Register";
import Home from "./Features/pages/Home";
import Chat from "./Features/pages/Chat";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/chat",
        element: <Chat />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }
])

export default router