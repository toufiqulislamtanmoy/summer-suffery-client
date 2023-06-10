import Swal from "sweetalert2";
import useAllClasses from "../../../hooks/useAllClasses";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const ManageClass = () => {
    
    const [classes, , refetch] = useAllClasses();
    const [axiosSecure] = useAxiosSecure();


    const handelApprove = id => {
        axiosSecure.patch(`/classes/approve/${id}`).then(data => {
            if (data.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Class Is Approved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    const handelDeny = id => {
        axiosSecure.patch(`/classes/deny/${id}`).then(data => {
            if (data.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Class Denied',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

   


    return (
        <div className="my-20">
            <SectionTitle title="Manage All Classes" />
            <div className="overflow-x-auto">

                {
                    classes.length > 0 ? <table className="table max-w-7xl mx-auto text-center bg-base-300 shadow-lg">
                        {/* head */}
                        <thead>
                            <tr >

                                <th>No</th>
                                <th>Class Banner</th>
                                <th>Class Name</th>
                                <th>Instructor Name</th>
                                <th>Instructor Email</th>
                                <th>Available seats</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((single, index) => (
                                <tr key={single._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask w-12 h-12">
                                                <img src={single.image} alt="Not Found" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{single.name}</td>
                                    <td>{single.instructor}</td>
                                    <td>{single.instructorEmail}</td>
                                    <td>{single.seats}</td>
                                    <td>{single.price}</td>
                                    <td>
                                        {single.status === 'deny' && (
                                            <span className="text-red-500">{single.status}</span>
                                        )}
                                        {single.status === 'approve' && (
                                            <span className="text-green-500">{single.status}</span>
                                        )}
                                        {single.status !== 'deny' && single.status !== 'approve' && (
                                            <span>{single.status}</span>
                                        )}
                                    </td>

                                    <td className="space-x-3 space-y-3">
                                        <button onClick={() => handelApprove(single._id)} className="btn btn-xs btn-success" disabled={single.status === 'approve' || single.status === "deny"} >Approved</button>

                                        <button onClick={() => handelDeny(single._id)} disabled={single.status === 'approve' || single.status === "deny"} className="btn btn-xs btn-error">Deny</button>


                                        <Link to={`/dashboard/feedback?id=${single._id}`} disabled={single?.feedback} className="btn btn-xs">Feedback</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        :
                        <p className="text-center">There have no classes added by the Instructor</p>
                }

            </div>
        </div>
    );
};

export default ManageClass;