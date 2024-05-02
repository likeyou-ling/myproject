import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/layout/Layout";
import Login from "@/pages/login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
    },
    {
        path: "/login",
        element: <Login />
    },
])

export default router;