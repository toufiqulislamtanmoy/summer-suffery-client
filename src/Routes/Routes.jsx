import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import NotFound from "../Pages/NotFound/NotFound";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement:<NotFound/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/signup",
                element:<Signup />
            },
        ]
    },
]);
export default router;