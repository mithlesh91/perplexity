import { createBrowserRouter } from "react-router";
import { Router } from "react-router";

import Login from "./Features/pages/Login";
import Register from "./Features/pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>,
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/Register",
        element: <Register />,
    }
])

export default router