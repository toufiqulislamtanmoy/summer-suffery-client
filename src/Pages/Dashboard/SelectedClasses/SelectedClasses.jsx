import useSelectedClass from "../../../hooks/useSelectedClass"
import SelectedClassDetails from "./SelectedClassDetails/SelectedClassDetails";
const SelectedClasses = () => {
    const [selectedClasses,refetch] = useSelectedClass();
    return (
        <div className=" h-[100vh] flex items-center justify-center ">
            <div className="overflow-x-auto w-[1380px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            
                            <th>Course Details</th>
                            <th>Instructor Name</th>
                            <th>Course Fee</th>
                            <th>Remaining seats</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            selectedClasses.map(singleClass => <SelectedClassDetails key={singleClass._id} courseDetails={singleClass} refetch={refetch}/>)
                        }
                    </tbody>

                    

                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;