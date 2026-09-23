import { createBrowserRouter } from "react-router-dom";

import Login from "../Features/Auth/pages/Login";
import Register from "../Features/Auth/pages/Register";
import Dashboard from "../Features/Chat/pages/Dasboard"
import ProtectedRoute from "../Features/Auth/components/ProtectedRoute";

const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>
        ),
    },
])

export default router