import { useQuery } from "@tanstack/react-query";

const useFeedBack = () => {
    const {data:feedbacks = []} = useQuery({
        queryKey:['feedbacks'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/feedback');
            return res.json();
        }
    })
    return [feedbacks];
};

export default useFeedBack;