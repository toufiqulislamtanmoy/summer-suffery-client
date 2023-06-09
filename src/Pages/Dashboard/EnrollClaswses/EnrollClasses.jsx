import useEnrollClasses from "../../../hooks/useEnrollClasses";
import moment from 'moment';

const EnrollClasses = () => {
    const [enrollClass] = useEnrollClasses();
    
    return (
        <div className="text-white my-10">

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 lg:px-10 px-5">
                {enrollClass &&
                    enrollClass.map((enclass) => (
                        <div className="card bg-base-100 shadow-xl" key={enclass._id}>
                            <figure>
                                <img className="rounded-xl p-3 lg:h-[320px]" src={enclass.banner} alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{enclass.className}</h2>
                                <h2 className="card-title"><span>Instructor:</span> {enclass.instructorName}</h2>
                                <p><span>Enroll Date:</span> {moment(enclass.date).format('YYYY-MM-DD')}</p> 
                                <p><span>Amount:</span> {enclass.price} TK</p>
                                
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default EnrollClasses;