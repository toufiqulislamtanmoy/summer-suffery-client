import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const SendFeedback = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    const onSubmit = data => {
        console.log(data)
        const feedback = data.feedback;
        axiosSecure.patch(`/classes/feedback/${id}`,{feedback}).then(data => {
            if (data.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Send Feedback',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    };
    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="my-20 flex items-center justify-center h-[30vh] w-full lg:w-[60vw] mx-auto rounded-lg shadow-2xl">
                <form className="w-2/3" onSubmit={handleSubmit(onSubmit)}>
                    <textarea {...register("feedback", { required: true })}  className=" w-full h-20 p-2 border rounded" placeholder="Type your feedback here" />
                    {errors.feedback && <p className="text-red-500">You Can not send empty feedback</p>}
                    <button className="btn btn-xs btn-warning">Send Feedback</button>
                </form>
            </div>
        </div>
    );
};

export default SendFeedback;