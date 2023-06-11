import {useContext} from "react"
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const SocialLogin = () => {
    const { LoginWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const destination = location.state?.from?.pathname || "/"
    const navigate = useNavigate();

    const handelGoogleLogin = () => {
        LoginWithGoogle().then((loggedInUser) => {
            // Signed in 
            const user = loggedInUser.user;
            console.log(user);

            const saveUser = { name: user.displayName, photo:user.photoURL, email: user.email,role:'user' }
            fetch("https://summer-suffry-server-6jyo24tbl-toufiqulislamtanmoy.vercel.app/users", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(saveUser)
            }).then(res => res.json()).then(data => {
                console.log(data);
                if (data.insertedId || data.message) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Account created successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(destination, { replace: true })
                }
            })
            // ...
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error Message: ", errorMessage, "Error Code: ", errorCode);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            });
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center ">
                <button type="button" onClick={handelGoogleLogin} className="btn btn-outline btn-circle hover:bg-gray-400">
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;