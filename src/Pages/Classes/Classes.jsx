import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAllClasses from "../../hooks/useAllClasses";
import ClassesCard from "./ClassesCard/ClassesCard";

const Classes = () => {
    const [classes] = useAllClasses();
    const approvedClasses = classes.filter(apClass => apClass.status === "approve");
    return (
        <div>
            <SectionTitle title="Select Your Perfect Match"/>
            <div className="my-20 lg:mx-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-5 lg:px-10 px-5">
                {
                    approvedClasses.map(appClass => <ClassesCard key={appClass._id} approvedClasses={appClass} />)
                }
            </div>
        </div>
    );
};

export default Classes;