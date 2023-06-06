import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    return (
        <div>
        <div className="divider">OR</div>
        <div className="text-center ">
            <button className="btn btn-outline btn-circle hover:bg-gray-400">
                <FaGoogle/>
            </button>
        </div>
    </div>
    );
};

export default SocialLogin;