import ButtonPrivet from "../../../Components/ButtonPrivet/ButtonPrivet";
import useEnrollClasses from "../../../hooks/useEnrollClasses";
import useSelectedClass from "../../../hooks/useSelectedClass";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const ClassesCard = ({ approvedClasses }) => {
    AOS.init();
    const { price, seats, instructor, name, image, _id } = approvedClasses;
    const [selectedClasses, refetch] = useSelectedClass();
    const [enrolClasses] = useEnrollClasses();
    const isAlreadySelected = selectedClasses.map(classObj => classObj.classId === _id).includes(true) || (enrolClasses && enrolClasses.map(classObj => classObj.classId === _id).includes(true));



    return (
        <div className={`card w-full ${seats === 0 ? 'bg-red-500 text-white' : 'bg-base-100'} shadow-xl`} data-aos="flip-left" >
            <figure data-aos="fade-up-right"><img className="rounded-xl p-3 lg:h-[220px]" src={image} alt="not found" /></figure>
            <div className="card-body" data-aos="fade-up-left">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">{
                        seats === 0 ? "Enroll Expire" : "Available"
                    }</div>
                </h2>
                <p><span>Instructor :</span>{instructor}</p>
                <p><span>Remaining seats :</span>{seats}</p>
                <p><span>Price :</span>{price} TK</p>
                {isAlreadySelected ? (
                    <p className="text-green-500">You have already selected this class.</p>
                ) : (
                    <div className="card-actions justify-end">
                        <ButtonPrivet approvedClasses={approvedClasses} refetch={refetch} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassesCard;