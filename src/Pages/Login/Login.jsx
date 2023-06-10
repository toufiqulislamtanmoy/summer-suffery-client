import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState } from "react";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const location = useLocation();
    const destination = location.state?.from?.pathname || "/"
    const navigate = useNavigate();

    // react from hook here
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    // show and hide password state here
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = data => {
        console.log(data)
        userLogin(data?.email, data?.password).then((loggedInUser) => {
            // Signed in 
            const user = loggedInUser.user;
            console.log(user);
            navigate(destination, { replace: true })
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
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
                    text: `${errorMessage} -- ${errorCode}`,
                })
            });
    };
    return (
        <div className="hero min-h-screen ">
            <div className="my-36 lg:my-0 hero-content flex-col lg:flex-row-reverse border border-red-600 rounded-2xl glass-bg lg:w-1/3">

                <div className="card-body w-full rounded-3xl ">
                    <div className="divider text-2xl font-bold">Login</div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })}
                                placeholder="email" className="input input-bordered" />

                            {errors.email && <span className="text-red-500">Email can not be empty</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="flex gap-2">
                                <input type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: true,
                                    })} placeholder="password" className="input input-bordered w-full" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password?.type === 'required' && <span className="text-red-500">Password can not be empty</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>

                        <p className="mt-3 space-x-2">Already Have an account? <Link className="text-blue-600 underline" to="/signup">Sign Up</Link></p>

                        <SocialLogin />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;