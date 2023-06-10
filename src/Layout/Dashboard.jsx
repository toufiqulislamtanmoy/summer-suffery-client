import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import { FaArrowCircleLeft, FaMoon, FaSun } from "react-icons/fa"
import useThemeToggle from "../hooks/useThemeToggle";
const Dashboard = () => {
    const location = useLocation();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [isAnimating, setIsAnimating] = useState(false);
    const { theme, toggleTheme } = useThemeToggle();
    useEffect(() => {
        setIsAnimating(true);
        const timeout = setTimeout(() => {
            setIsAnimating(false);
        }, 300); // Duration of your animation (in milliseconds)

        return () => clearTimeout(timeout);
    }, [location.pathname]);
    let navItems;
    if (isAdmin) {
        navItems = (
            <>

                <li><NavLink className={({ isActive }) => (isActive ? 'text-[#7E90FE]' : '')} to="/dashboard/manageClasses">Manage Classes</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'text-[#7E90FE]' : '')} to="/dashboard/allusers">Manage Users</NavLink></li>
            </>
        );
    } else if (isInstructor) {
        navItems = (
            <>

                <li><NavLink className={({ isActive }) => (isActive ? 'text-[#7E90FE]' : '')} to="/dashboard/addClass">Add Class</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'text-[#7E90FE]' : '')} to="/dashboard/myClass">My Class</NavLink></li>
            </>
        );
    } else {
        navItems = (
            <>
                <li><NavLink className={({ isActive }) => (isActive ? 'text-[#7E90FE]' : '')} to="/dashboard/selectedClasses">Selected Classes</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'text-[#7E90FE]' : '')} to="/dashboard/enrollClasses">Enroll Classes</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? 'text-[#7E90FE]' : '')} to="/dashboard/paymentHistory">Payment History</NavLink></li>
            </>
        );
    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 justify-end lg:justify-start px-2 mx-2 text-2xl ">
                        <Link className="hover:text-info" to="/"><FaArrowCircleLeft /></Link>
                    </div>
                    <div>
                        <button title={theme === 'dark' ? 'Light' : 'Dark'} onClick={toggleTheme}>{theme === 'dark' ? <FaSun className="text-yellow-300 text-xl" /> : <FaMoon />}</button>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                            {
                                navItems
                            }
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <AnimatePresence>
                    <motion.div
                        className="page-content"
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        onAnimationComplete={() => setIsAnimating(false)}
                        style={{ visibility: isAnimating ? "hidden" : "visible" }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200">
                    {/* Sidebar content here */}
                    {
                        navItems
                    }

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;