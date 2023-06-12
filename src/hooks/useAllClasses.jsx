import { useQuery } from "@tanstack/react-query";

const useAllClasses = () => {
    const {data:classes = [], isLoading:loading,refetch} = useQuery({
        queryKey:['classes'],
        queryFn: async () => {
            const res = await fetch('https://summer-suffry-server.vercel.app/classes');
            return res.json();
        }
    })
    return [classes, loading,refetch];
};

export default useAllClasses;