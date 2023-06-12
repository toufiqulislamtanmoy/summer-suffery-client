import { useQuery } from "@tanstack/react-query";

const useIAllInstructor = () => {
    const {data:instructors = [], isLoading:loading,refetch} = useQuery({
        queryKey:['users'],
        queryFn: async () => {
            const res = await fetch('https://summer-suffry-server.vercel.app/instructor');
            return res.json();
        }
    })
    return [instructors,refetch,loading];
};

export default useIAllInstructor;