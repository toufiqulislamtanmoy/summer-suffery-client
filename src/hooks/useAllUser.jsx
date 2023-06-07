import { useQuery } from "@tanstack/react-query";

const useAllUser = () => {
    const {data:users = [], isLoading:loading,refetch} = useQuery({
        queryKey:['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            return res.json();
        }
    })
    return [users, loading,refetch];
};

export default useAllUser;