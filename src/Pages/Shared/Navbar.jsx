import {Link} from "react-router-dom"
import logo from "../../assets/Logo/Logo.png"
const Navbar = () => {
    const navitem =
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Instructors</Link></li>
            <li><Link to="/">Classes</Link></li>
            <li><Link to="/">Dashboard</Link></li>
        </>
        const user = null;
    return (
        <div className="navbar bg-black p-5 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navitem
                        }
                    </ul>
                </div>
                <Link to="/" className="hidden lg:block btn btn-ghost normal-case text-xl">
                    <img className="w-36" src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navitem
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {user ? <div className="flex items-center gap-5">
                    <div className="avatar">
                        <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user && "https://cdn-icons-png.flaticon.com/512/149/149071.png" } />
                        </div>
                    </div>
                    <button>Logout</button>
                </div>
                    :
                    <Link to="/login">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;