import { useState,useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";


const Signup = () => {
    const { userSignUp, updateUserInFo, userLogOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // use from hook here
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    // show and hide password state here
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(false);
    const password = watch("password");

    const onSubmit = data => {
        // console.log(data)
        const { name, email, photoUrl,password } = data;
        console.log(name,email,password,photoUrl)
        userSignUp(email,password) .then((logedUser) => {

            const newlyCreatedUser = logedUser.user;
            console.log(newlyCreatedUser);
            updateUserInFo(name,photoUrl).then(() => {
                const userDetails = {
                    name,
                    email,
                    photoUrl,
                    role:"user"
                }

                /********Insert user details in the database********/

                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userDetails)
                }).then(res => res.json())
                    .then(data => {
                        reset();
                        userLogOut();
                        console.log(data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Account create successfully',
                        })
                        navigate("/login", { replace: true });
                    });
              
              }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... Did Not update user profile',
                    text: `${error}`,
                })
              });

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${errorMessage} - ${errorCode}`,
            })
          });
    };
    return (
        <div className="hero min-h-screen ">
            <div className="my-36 lg:my-0 hero-content flex-col lg:flex-row-reverse border border-red-600 rounded-2xl glass-bg lg:w-1/3">
                
                <div className="card-body w-full rounded-3xl ">
                    <div className="divider text-2xl font-bold">Sign Up</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input type="text" {...register("photoUrl", { required: true })} className="input input-bordered " />
                            {errors.photoUrl && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="flex g-2">
                                <input type={showPassword ? "text" : "password"} {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).+$/
                                })} placeholder="password" className="input input-bordered w-full" />


                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>


                            {errors.password?.type === 'minLength' && <p className="text-red-500">Password Must be 6 Charecter Long</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have one uppercase lowercase symbol and number</p>}
                            {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>


                            <div className="flex gap-2">
                                <input type={showCnfPassword ? "text" : "password"} {...register("confirmPassword", {
                                    required: true,
                                    validate: value => value === password || "Passwords do not match"
                                })} placeholder="Confirm password" className="input input-bordered w-full" />


                                <button type="button" onClick={() => setShowCnfPassword(!showCnfPassword)}>
                                    {showCnfPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>

                            </div>


                            {errors.confirmPassword?.type === 'required' && <span className="text-red-500">This field is required</span>}
                            {errors.confirmPassword?.type === 'validate' && (
                                <span className="text-red-500">{errors.confirmPassword.message}</span>
                            )}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>

                        <p className="mt-3 space-x-2">Already Have an account? <Link className="text-blue-600 underline" to="/login">Login</Link></p>
                        <SocialLogin />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;