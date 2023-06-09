import { useQuery } from '@tanstack/react-query'
import { useContext } from "react";
import { AuthContext } from '../Provider/AuthProvider';

const useSelectedClass = () => {
    const { user, loading } = useContext(AuthContext);
    const { data: selectedClasses = [], refetch } = useQuery({
        queryKey: ['selectedClasses', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selectedClass?email=${user?.email}`);
            return res.json();
        }
    })
    // console.log(selectedClasses)
    return [selectedClasses, refetch];

};

export default useSelectedClass;