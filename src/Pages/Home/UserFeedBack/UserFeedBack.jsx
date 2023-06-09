import Marquee from "react-fast-marquee";
import useFeedBack from "../../../hooks/useFeedBack";
import Rating from "react-rating";
import { FaStarHalf, FaStar } from "react-icons/fa"
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
const UserFeedBack = () => {
    const [feedbacks] = useFeedBack();
    console.log(feedbacks)

    return (
        <div>
            <SectionTitle title="User Feedbacks"/>
            <Marquee>

                <div className="flex gap-9">

                    {feedbacks &&
                        feedbacks.map(feedback =>
                            <div key={feedback._id} className="card w-96 bg-base-100 shadow-xl my-10">
                                <figure><img className="rounded-xl p-3 h-[220px]" src={feedback.photo} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{feedback.user}</h2>
                                    <p>{feedback.message}</p>
                                    <div className="text-center text-yellow-500">
                                        <Rating
                                            placeholderRating={feedback.rating}
                                            emptySymbol={<FaStarHalf />}
                                            placeholderSymbol={<FaStar />}
                                            fullSymbol={<FaStar />}
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        )

                    }
                </div>
            </Marquee>
        </div>
    );
};

export default UserFeedBack;