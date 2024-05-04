import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/layout/Layout";
import Login from "@/pages/login/Login";
import AuthRoute from "@/components/AuthRoute";
import Home from "@/pages/home/Home";
import Publish from "@/pages/publish/Publish";
import Article from "@/pages/article/Article";

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
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "publish",
                element: <Publish />
            },
            {
                path: "article",
                element: <Article />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
])

export default router;