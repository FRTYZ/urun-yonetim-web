import { Navigate } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/Error/NotFound";

const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/", exact:true, component: <Home /> },
    {
        path: '/404',
        component: <NotFound />,
    },
    {
        path: '*',
        component: <Navigate to="/404" replace />,
    },
]

export {publicRoutes}