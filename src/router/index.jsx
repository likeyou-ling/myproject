import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/layout/Layout";
import Login from "@/pages/login/Login";
import AuthRoute from "@/components/AuthRoute";

/**
 * create rouer rules
 */
const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login"></Navigate>
    },
    {
        path: "/layout",
        element: <AuthRoute><Layout /></AuthRoute>
    },
    {
        path: "/login",
        element: <Login />
    },
])

export default router;