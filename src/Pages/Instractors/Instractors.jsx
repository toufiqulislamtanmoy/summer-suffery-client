

import useAllUser from "../../hooks/useAllUser";
import InstractorRow from "./InstractorsRow/InstractorRow";

const Instractors = () => {

    const [users] = useAllUser();
    // console.log(users);
    const instractors = users.filter(instractor => instractor.role ==="instructor");
    console.log(instractors);
    return (
        <div className="overflow-x-auto">
            <table className="table text-center max-w-7xl mx-auto px-5 lg:px-0">
                {/* head */}
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        instractors.map(instractor => <InstractorRow key={instractor._id} instractor={instractor}/>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Instractors;