import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const imageHostingToken = import.meta.env.VITE_IMGBB_KEY;

const AddClass = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const navigate =useNavigate();
    const imagHostingUrl = `https://api.imgbb.com/1/upload?&key=${imageHostingToken}`;


    const onSubmit = data => {
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.image[0]);
        fetch(imagHostingUrl, {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(imgRes => {
            console.log(imgRes);
            if (imgRes.success){
                const imgurl = imgRes.data.display_url;
                const { price, className, availableSeats } = data;
                const classDetails = {
                    name:className,
                    instructorEmail:user?.email,
                    instructor:user?.displayName,
                    image: imgurl,
                    seats: parseInt(availableSeats),
                    price: parseInt(price),
                    status: "pending",
                    enrollStudent: 0

                }
                console.log(classDetails);
                axiosSecure.post('/classes',classDetails).then(res => {
                    console.log(res.data)
                    if(res.data.insertedId){
                        Swal.fire({
                            icon: 'success',
                            title: 'Class Added Successfully',
                            showConfirmButton: true,
                          })
                          navigate('/dashboard/myClass');
                    }
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... IMGBB Server Did Not Responce Try Some Time Later',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
            }
        })

    }
    return (
        <div className="hero min-h-screen ">
            <div className="my-36 lg:my-0 hero-content flex-col lg:flex-row-reverse border border-red-600 rounded-2xl glass-bg lg:w-1/3">

                <div className="card-body w-full rounded-3xl ">
                    <div className="divider text-2xl font-bold">Add Class</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* INstructor name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Instructor Name</span>
                            </label>
                            <input type="text"
                                placeholder="Instructor Name" className="input input-bordered"
                                disabled
                                defaultValue={user?.displayName}
                            />

                        </div>
                        {/* Instructor Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                placeholder="email" className="input input-bordered"
                                disabled
                                defaultValue={user?.email}
                            />
                        </div>
                        {/* Class Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input type="text" {...register("className", { required: true })} placeholder="Class Name"
                                className="input input-bordered" />
                            {errors.className?.type === 'required' && <span className="text-red-500">Class Name can not be empty</span>}
                        </div>
                        {/* class banner */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Banner</span>
                            </label>
                            <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                                {...register("image", { required: true })}  />

                            {errors.image?.type === 'required' && <span className="text-red-500">Class Banner can not be empty</span>}
                        </div>
                        {/* Available seats */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available seats</span>
                            </label>
                            <input type="text" {...register("availableSeats", { required: true })} placeholder="Available seats"
                                className="input input-bordered" />
                            {errors.availableSeats?.type === 'required' && <span className="text-red-500">Available seats can not be
                                empty</span>}
                        </div>
                        {/* Price*/}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Fee</span>
                            </label>
                            <input type="text" {...register("price", { required: true })} placeholder="Class Fee"
                                className="input input-bordered" />
                            {errors.price?.type === 'required' && <span className="text-red-500">Class Fee can not be empty</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Class</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClass;