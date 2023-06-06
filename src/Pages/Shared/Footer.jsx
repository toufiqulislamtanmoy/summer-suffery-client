import { Link } from "react-router-dom"
import logo from "../../assets/Logo/Logo.png"
import {
    FaFacebook,
    FaTwitter,
    FaInstagramSquare
} from 'react-icons/fa';
const Footer = () => {
    return (
        <div className=" bg-black p-10">
            <footer className="footer  text-base-content">
                <div className="space-y-5 text-center">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div>
                    <span className="footer-title">Summer Suffery</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Classes</a>
                </div>
                <div>
                    <span className="footer-title">Social Contact</span>
                    <div className="grid grid-flow-col gap-4 text-2xl">
                        <Link className="hover:text-info" to=""><FaFacebook /></Link>
                        <Link className="hover:text-info" to=""><FaTwitter /></Link>
                        <Link className="hover:text-info" to=""><FaInstagramSquare /></Link>
                    </div>
                </div>
                <div>
                    <span className="footer-title">Newsletter</span>
                    <div className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="lg:relative space-y-3 lg:space-y-0">
                            <input type="text" placeholder="username@site.com" className="input input-bordered  lg:pr-16 px-5" />
                            <button className="btn btn-primary lg:absolute top-0 right-0 rounded-l-none">Subscribe</button>
                        </div>
                    </div>
                </div>

            </footer>
            <div className="text-center my-8">
                <p>Copyright © 2023 - All right reserved by Summer Suffery</p>
            </div>
        </div>
    );
};

export default Footer;