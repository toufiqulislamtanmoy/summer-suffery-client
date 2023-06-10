import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import NotFound from "../Pages/NotFound/NotFound";
import Instractors from "../Pages/Instractors/Instractors"
import Classes from "../Pages/Classes/Classes";
import Dashboard from "../Layout/Dashboard";
import PrivetRoute from "../Routes/PrivetRoute"
import SelectedClasses from "../Pages/Dashboard/SelectedClasses/SelectedClasses";
import EnrollClasses from "../Pages/Dashboard/EnrollClaswses/EnrollClasses";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ManageClass from "../Pages/Dashboard/ManageClasses/ManageClass";
import AdminRoute from "./AdminRoute";
import Payment from "../Pages/Dashboard/Payment/Payment";
import InstructorRoute from "./InstructorRoute";
import AddClass from "../Pages/Dashboard/Instactor/AddClass";
import MyClass from "../Pages/Dashboard/Instactor/MyClass/MyClass";
import SendFeedback from "../Pages/Dashboard/SendFeedBack/SendFeedback";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        // errorElement:<NotFound/>,
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
            {
                path:"/instractor",
                element:<Instractors />
            },
            {
                path:"/classes",
                element:<Classes />
            },
        ]
    },
    {
        path:"/dashboard",
        element:<PrivetRoute><Dashboard/></PrivetRoute>,
        children:[
          {
            path:"selectedClasses",
            element:<SelectedClasses/>
          },
          {
            path:"enrollClasses",
            element:<EnrollClasses/>
          },
          {
            path:"paymentHistory",
            element:<PaymentHistory/>
          },
          {
            path:"payment",
            element:<Payment/>,
            
            
          },
          {
            path:"allusers",
            element:<AdminRoute><AllUsers/></AdminRoute>
          },
          {
            path:"manageClasses",
            element:<AdminRoute><ManageClass/></AdminRoute>
          },
          {
            path:"addClass",
            element:<InstructorRoute><AddClass/></InstructorRoute>
          },
          {
            path:"myClass",
            element:<InstructorRoute><MyClass/></InstructorRoute>
          },
         
          {
            path:"feedback",
            element:<SendFeedback/>
          }
         
        ]
      }
]);
export default router;