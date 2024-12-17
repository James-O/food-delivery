import App from "../App";
import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../pages/Home";
import ErrorPage from "../error";
import ProtectedRoute from "../auth/ProtectedRoute";
import VerifyOtp from "../auth/verifyOtp";
import Addfood from "../pages/admin/Addfood";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute><Home /> </ProtectedRoute>,
                //element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/verifyOtp",
                element: <ProtectedRoute><VerifyOtp/></ProtectedRoute>,
            },
            {
                path: "/addfood",
                element: <ProtectedRoute><Addfood /></ProtectedRoute>,
            },
        ],
    },

]);

export default router;