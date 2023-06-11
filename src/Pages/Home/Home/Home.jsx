import TopSlider from "./TopSlider/TopSlider";
import UserFeedBack from "../UserFeedBack/UserFeedBack"
import TopClasses from "../TopCLasses/TopClasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
const Home = () => {
    return (
        <div>
            <TopSlider/>
            <TopClasses/>
            <PopularInstructor/>
            <UserFeedBack/>
        </div>
    );
};

export default Home;