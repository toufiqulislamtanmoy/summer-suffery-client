import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useSelectedClass from "../../../hooks/useSelectedClass"
import SelectedClassDetails from "./SelectedClassDetails/SelectedClassDetails";
const SelectedClasses = () => {
    const [selectedClasses,refetch] = useSelectedClass();
    return (
        <div className="my-20">
            <SectionTitle title="Selected Classes"/>
            <div className="overflow-x-auto">
               {selectedClasses.length >0 ? <table className="table max-w-7xl mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            
                            <th>Course Details</th>
                            <th>Instructor Name</th>
                            <th>Course Fee</th>
                            <th>Remaining seats</th>
                            <th>Action</th>
                            <th>Payment
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            selectedClasses.map(singleClass => <SelectedClassDetails key={singleClass._id} courseDetails={singleClass} refetch={refetch}/>)
                        }
                    </tbody>

                    

                </table>
            :
            <div className="text-center">Did not select any classes</div>    
            }
            </div>
        </div>
    );
};

export default SelectedClasses;