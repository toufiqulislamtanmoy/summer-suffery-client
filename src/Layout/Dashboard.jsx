import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
const Dashboard = () => {
    const location = useLocation();
    const userRole = "admin";
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const timeout = setTimeout(() => {
            setIsAnimating(false);
        }, 300); // Duration of your animation (in milliseconds)
        
        return () => clearTimeout(timeout);
    }, [location.pathname]);
    let navItems;
    if (userRole === "admin") {
        navItems = (
            <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard/manageClasses">Manage Classes</Link></li>
                <li><Link to="/dashboard/allusers">Manage Users</Link></li>
            </>
        );
    } else if (userRole === "instructor") {
        navItems = (
            <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard/courses">Courses</Link></li>
                <li><Link to="/dashboard/students">Students</Link></li>
                <li><Link to="/dashboard/grades">Grades</Link></li>
            </>
        );
    } else if (userRole === "user") {
        navItems = (
            <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard/selectedClasses">Selected Classes</Link></li>
                <li><Link to="/dashboard/enrollClasses">Enroll Classes</Link></li>
                <li><Link to="/dashboard/paymentHistory">Payment History</Link></li>
            </>
        );
    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">Navbar Title</div>
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