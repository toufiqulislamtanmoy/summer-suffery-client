import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePaymentHistory = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: paymentHistory, refetch } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/paymentHistory/${user?.email}`);

            return response.data;
        }
    })
    return [paymentHistory, refetch];
};

export default usePaymentHistory;