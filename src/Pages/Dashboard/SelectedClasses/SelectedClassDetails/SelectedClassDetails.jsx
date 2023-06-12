import { FaTrash, FaWallet } from "react-icons/fa"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const SelectedClassDetails = ({ courseDetails, refetch }) => {
    console.log(courseDetails);
    const { _id, banner, seats, className, instructor, price } = courseDetails;
    const handelDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://summer-suffry-server.vercel.app/selectedClass/${id}`, {
                    method: "DELETE"
                }).then(res => res.json()).then(data => {
                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })

            }
        })
    }
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask  w-12 h-12">
                            <img src={banner} alt="Not Found" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{className}</div>
                    </div>
                </div>
            </td>
            <td>
                {instructor}
            </td>
            <td>{price}Tk</td>
            <th>
                <button className="btn btn-ghost btn-xs">{seats}</button>
            </th>
            <th>
                <button onClick={() => handelDelete(_id)} className="btn btn-ghost btn-xs"><FaTrash className="text-red-500 text-xl" /></button>
            </th>
            <th>
                {/* <Link to={`/dashboard/payment/${_id}`} className="btn btn-ghost btn-xs"><FaWallet className="text-green-500 text-xl" />Pay Now</Link> */}
                <Link to={{ pathname: '/dashboard/payment', search: `?id=${_id}` }} className="btn btn-ghost btn-xs">
                    <FaWallet className="text-green-500 text-xl" />Pay Now
                </Link>

            </th>
        </tr>
    );
};

export default SelectedClassDetails;