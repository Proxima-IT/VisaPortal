import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);

  const handleSignOut = () => {
    handleLogOut()
      .then(() => {
        toast.success("You've logged out successfully");
      })
      .catch(() => {});
  };
  
  return (
    <div>
      <nav className="bg-emerald-100 w-full shadow-md p-5 flex gap-2 justify-between">
        <Link to="/" className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500">
          Portugal Visa Portal
        </Link>
        {user && (
          <div className="flex gap-3 justify-between items-center">
            <Link
              to="/apply-form"
              className="lg:px-6 px-3 py-2 bg-teal-600 text-white font-semibold rounded-xl shadow-md hover:bg-teal-700 hover:shadow-lg transition duration-300"
            >
              Apply
            </Link>
            <button
              onClick={handleSignOut}
              className="lg:px-6 px-3 py-2 border border-teal-600 text-black font-semibold rounded-xl shadow-md hover:bg-yellow-200 hover:shadow-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
