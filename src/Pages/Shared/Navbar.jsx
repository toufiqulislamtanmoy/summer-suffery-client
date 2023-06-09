import { Link } from "react-router-dom"
import { useContext } from "react"
import logo from "../../assets/Logo/Logo.png"
import { AuthContext } from "../../Provider/AuthProvider";
import useThemeToggle from "../../hooks/useThemeToggle"
import { FaMoon,FaSun} from "react-icons/fa"

const Navbar = () => {
    const { user, userLogOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useThemeToggle();
    console.log(theme);
    const handelLogout = () => {
        userLogOut();
        console.log('Inside Handel Logout')
    }
    const navitem =
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/instractor">Instructors</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            {user?.email && <li><Link to="/dashboard/selectedClasses">Dashboard</Link></li>}
        </>

    return (
        <div className="navbar bg-base-300 p-5 ">
            <div className="navbar-start z-50">
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
            <div className="navbar-end space-x-3">
                {user?.email ? <div className="flex items-center gap-5">
                    <div className="avatar">
                        <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img title={user?.displayName} src={user?.photoURL} />
                        </div>
                    </div>
                    <button onClick={handelLogout}>Logout</button>
                </div>
                    :
                    <Link to="/login">Login</Link>
                }
                <div>
                    <button title={theme === 'dark'? 'Light':'Dark'} onClick={toggleTheme}>{theme === 'dark'?  <FaSun className="text-yellow-300 text-xl"/>: <FaMoon/>}</button>    
                </div>
            </div>
        </div>
    );
};

export default Navbar;