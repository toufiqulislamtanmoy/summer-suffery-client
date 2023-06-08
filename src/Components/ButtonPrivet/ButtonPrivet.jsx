import { useContext ,useState,useEffect} from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import {useLocation, useNavigate } from "react-router-dom";


const ButtonPrivet = ({ userRole, seats }) => {
  const { user } = useContext(AuthContext);
  const [btnDisable, setBtnDisable] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      console.log("Class is selected");
    }
  };

  // Check if userRole is "admin" or "instructor" and seats is 0
  useEffect(() => {
    if (userRole === "admin" || userRole === "instructor" || seats === 0) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [userRole, seats]);

  return (
    <button
      onClick={handleButtonClick}
      className="btn btn-primary"
      disabled={btnDisable}
    >
      Select Class
    </button>
  );
};

export default ButtonPrivet;

