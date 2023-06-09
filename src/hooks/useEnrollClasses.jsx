import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useEnrollClasses = () => {
    const {user,loading} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data: enrollClass,refetch} = useQuery({
        queryKey:['enrollClass',user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/enrollClass/${user?.email}`);
            
            return response.data;      
        }
       })
       return [enrollClass,refetch];
};

export default useEnrollClasses;