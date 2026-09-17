import { createBrowserRouter } from "react-router-dom";

import Login from "./Features/pages/Login";
import Register from "./Features/pages/Register";
import Home from "./Features/pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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