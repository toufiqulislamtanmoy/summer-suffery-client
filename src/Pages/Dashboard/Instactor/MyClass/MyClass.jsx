import { useEffect } from "react";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useState } from "react";



const MyClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [classesHistory, setCLassesHistory] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/classes/instructor/${user?.email}`).then(data => {
            setCLassesHistory(data.data);
        });
    }, [user?.email, axiosSecure])

    console.log(classesHistory);
    return (
        <div className="my-20">
            <SectionTitle title="Your Added Class History" />
            <div className="overflow-x-auto">
                <table className="table table-zebra max-w-7xl mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Class Name</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Seats</th>
                            <th>Enroll Student</th>
                            <th>Status</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classesHistory.map((history, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{history.name}</td>
                                <td>{history.instructorEmail}</td>
                                <td>{history.price}</td>
                                <td>{history.seats}</td>
                                <td>{history.enrollStudent}</td>
                                <td className={`badge ${history.status === 'approve' ? 'badge-success' : history.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                                    {history.status}
                                </td>

                                <td>{history?.feedback ? history.feedback : "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyClass;