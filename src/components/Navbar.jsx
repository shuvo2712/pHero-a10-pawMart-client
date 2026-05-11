import { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/pets-and-supplies">Pets & Supplies</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-listing">Add Listing</NavLink></li>
          <li><NavLink to="/my-listings">My Listings</NavLink></li>
          <li><NavLink to="/my-orders">My Orders</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 sticky top-0 z-[100]">
      {/* Left: Logo + Website Name */}
      <div className="navbar-start">
        <div className="dropdown">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden"
            data-tooltip-id="mobile-menu-tip"
            data-tooltip-content="Open Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <Tooltip id="mobile-menu-tip" place="bottom" />
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
            {navLinks}
          </ul>
        </div>
        <Link 
          to="/" 
          className="btn btn-ghost text-2xl font-bold text-primary flex gap-2 items-center"
          data-tooltip-id="logo-tip"
          data-tooltip-content="Go to Home"
        >
          🐾 PawMart
        </Link>
        <Tooltip id="logo-tip" place="bottom" />
      </div>

      {/* Middle: Navigation Links (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium space-x-2">
          {navLinks}
        </ul>
      </div>

      {/* Right: Authentication / Profile */}
      <div className="navbar-end gap-2 md:gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <FaMoon className="text-gray-600" /> : <FaSun className="text-yellow-400" />}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <div
              className="avatar"
              data-tooltip-id="user-avatar-tip"
              data-tooltip-content={user?.displayName || user?.email}
            >
              <div className="w-10 rounded-full border border-primary">
                <img alt="User Avatar" src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} />
              </div>
            </div>
            <Tooltip id="user-avatar-tip" place="bottom" />
            <button onClick={logout} className="btn btn-outline btn-error btn-sm">Logout</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-primary btn-sm md:btn-md">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm md:btn-md hidden sm:flex">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
