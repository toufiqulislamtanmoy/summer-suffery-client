import { useQuery } from "@tanstack/react-query";

const useFeedBack = () => {
    const {data:feedbacks = []} = useQuery({
        queryKey:['feedbacks'],
        queryFn: async () => {
            const res = await fetch('https://summer-suffry-server.vercel.app/feedback');
            return res.json();
        }
    })
    return [feedbacks];
};

export default useFeedBack;