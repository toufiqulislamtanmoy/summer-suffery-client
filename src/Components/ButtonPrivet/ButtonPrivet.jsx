

import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import {useLocation, useNavigate } from "react-router-dom";

const ButtonPrivet = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate("/login", { state: { from: location }, replace: true });
    }else{
      console.log("Class is selected")
    } 
  };

  return (
    <button onClick={handleButtonClick} className="btn btn-primary">
      Select Class
    </button>
  );
};

export default ButtonPrivet;
