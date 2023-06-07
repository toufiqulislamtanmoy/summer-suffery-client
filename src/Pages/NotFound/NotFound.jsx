import { Link } from "react-router-dom";
import notfound from "../../assets/animation/notfound.gif"
const NotFound = () => {
    return (
        <div className="bg-black flex flex-col h-[100vh] items-center justify-center">
            <div>
                <img src={notfound} alt="" />
            </div>
            <h2 className="text-5xl hover:text-green-400"><Link to="/">Go to Home</Link></h2>
        </div>
    );
};

export default NotFound;