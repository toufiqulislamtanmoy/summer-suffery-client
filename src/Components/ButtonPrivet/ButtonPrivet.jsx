import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const ButtonPrivet = ({ approvedClasses }) => {
  const { user } = useContext(AuthContext);
  const [btnDisable, setBtnDisable] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("")
  const { name, image, price, instructor, _id } = approvedClasses;

  // find the user role here
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user?.email}`).then(res => res.json()).then(data => setUserRole(data.role))
  }, [user])
  console.log(approvedClasses)
  const handleButtonClick = () => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      if (user && user?.email) {
        const selectedClass = {
          classId: _id,
          className: name,
          banner: image,
          price,
          instructor,
          email:user?.email
        }
        console.log(selectedClass);
        fetch('http://localhost:5000/selectedClass',{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(selectedClass)
            }).then(res => res.json()).then(data => {
                if(data.insertedId){
                    Swal.fire({
                        icon: 'success',
                        title: `Successfully selected ${name} course`,
                        showConfirmButton: true,
                      })
                }
            })
      }
    }
  };

  // Check if userRole is "admin" or "instructor" and seats is 0
  useEffect(() => {
    if (userRole === "admin" || userRole === "instructor" || approvedClasses.seats === 0) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [userRole, approvedClasses.seats]);

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

