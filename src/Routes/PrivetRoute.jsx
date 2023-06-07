import { Navigate, useLocation } from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "../Provider/AuthProvider";

const PrivetRoute = ({children}) => {
    const location = useLocation();
    const {user,loading} = useContext(AuthContext);
    if(loading){
      return  <progress className="progress w-56 flex items-center justify-center"></progress>
    }
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivetRoute;