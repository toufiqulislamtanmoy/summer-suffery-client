import useAllClasses from "../../hooks/useAllClasses";
import ClassesCard from "./ClassesCard/ClassesCard";

const Classes = () => {
    const [classes] = useAllClasses();
    const approvedClasses = classes.filter(apClass => apClass.status === "approve");
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-5 space-y-10 bg-base-100 my-14 max-w-7xl mx-auto px-10">
            {
                approvedClasses.map(appClass => <ClassesCard key={appClass._id} approvedClasses={appClass} />)
            }
        </div>
    );
};

export default Classes;