import { createBrowserRouter } from "react-router-dom";

import Login from "../Features/pages/Login";
import Register from "../Features/pages/Register";
import Dashboard from "../Features/pages/Dasboard"
import ProtectedRoute from "../Features/components/ProtectedRoute";

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