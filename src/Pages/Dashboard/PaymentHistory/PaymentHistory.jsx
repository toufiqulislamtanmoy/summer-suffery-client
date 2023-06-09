import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import usePaymentHistory from "../../../hooks/usePaymentHistory";


const PaymentHistory = () => {
    const [paymentHistory] = usePaymentHistory();
    return (
        <div className="my-20">
            <SectionTitle title="Your Payment History"/>
            <div className="overflow-x-auto">
                <table className="table table-zebra max-w-7xl mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Class Name</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            paymentHistory && paymentHistory.map((history,index) => (
                                <tr key={history._id}>
                                    <th>{index+1}</th>
                                    <td>{history.className}</td>
                                    <td>{history.date}</td>
                                    <td>{history.price}Tk</td>
                                    <td>{history.transactionId}</td>
                                    <td className="badge badge-success">Paid</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;