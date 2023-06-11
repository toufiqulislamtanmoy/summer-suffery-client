import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PopularInstructor = () => {
    const [popularInstructor, setPopularInstructor] = useState([]);
    useEffect(() => {
        fetch("https://summer-suffry-server-6jyo24tbl-toufiqulislamtanmoy.vercel.app/popularInstructor").then(res => res.json()).then(data => {
            console.log(data);
            setPopularInstructor(data);
        })
    }, [])
    return (
        <div>
            <SectionTitle title="Most Popular Instructor" />
            <div className="my-20 lg:mx-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-5 lg:px-10 px-5">
                {
                    popularInstructor.slice(0, 6).map((pins, index) =>
                        <div key={pins.instructorDetails._id} className="card w-full bg-base-100 shadow-xl" data-aos="flip-left" >
                            <figure data-aos="fade-up-right"><img className="rounded-xl p-3 lg:h-[220px]" src={pins.instructorDetails?.photo} alt="not found" /></figure>
                            <div className="card-body" data-aos="fade-up-left">
                                <h2 className="card-title">
                                    {pins.instructorDetails.name}
                                    <div className="badge badge-secondary">{index + 1}</div>
                                </h2>
                                <p><span>Total Enrolment :</span>{pins.totalEnrollments}</p>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularInstructor;