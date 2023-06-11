import Swal from "sweetalert2";
import useAllUser from "../../../hooks/useAllUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const AllUsers = () => {
    const [users, refetch] = useAllUser();
    const [axiosSecure] = useAxiosSecure();

    const handelMakeAdmin = user => {
        
        axiosSecure.patch(`/users/admin/${user._id}`).then(res => {

            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${user.name} is admin now`,
                    showConfirmButton: true,

                })
            }
        })
    }

    const handelMakeInstructor = user => {

        axiosSecure.patch(`/users/instructor/${user._id}`).then(res => {

            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${user.name} is Instructor now`,
                    showConfirmButton: true,

                })
            }
        })
    }

    return (
        <div className="my-20">
            <div className="overflow-x-auto">
                {users.length > 0 ? 
                <table className="table max-w-7xl mx-auto text-center bg-base-300 shadow-lg">
                    {/* head */}
                    <thead>
                        <tr >

                            <th>Photo</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>email</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map(single => {
                                return (
                                    <tr key={single._id}>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask  w-12 h-12">
                                                    <img src={single.photo} alt="Not Found" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{single.name}</td>
                                        <td>{single.role}</td>
                                        <td>{single.email}</td>

                                        <th>
                                            <button onClick={() => handelMakeAdmin(single)} disabled={single.role === 'admin'} className="btn btn-ghost btn-xs">Make Admin</button>
                                            <button onClick={() => handelMakeInstructor(single)}  disabled={single.role === 'admin' || single.role === "instructor"} className="btn btn-ghost btn-xs">Make Instructor</button>
                                        </th>
                                    </tr>
                                );
                            })
                        }

                    </tbody>



                </table>
                    :
                    <div className="text-center">No user found</div>
                }
            </div>
        </div>
    );
};

export default AllUsers;