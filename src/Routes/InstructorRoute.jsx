import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useInstructor from "../hooks/useInstructor";
import { Navigate, useLocation } from "react-router-dom";


const InstructorRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, instructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || instructorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default InstructorRoute;