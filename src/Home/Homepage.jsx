import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Homepage = () => {
 
  return (
    <div>      
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-500 via-indigo-300 to-amber-700 p-6">
        <div className="bg-white shadow-2xl rounded-3xl p-12 max-w-3xl w-full text-center">
          {/* Header */}

          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Welcome to the official visa application portal. Please login or
            register to start your application. Ensure you have your passport
            and travel details ready before applying.
          </p>

          {/* Buttons */}
          <div className="flex gap-5 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl shadow-md hover:bg-indigo-50 hover:shadow-lg transition duration-300"
            >
              Register
            </Link>
          </div>

          {/* Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 text-sm">
            <div className="p-6 bg-indigo-50 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-indigo-700 text-lg mb-2">
                ✔️ Secure
              </h3>
              <p>Your data is encrypted and safe throughout the process.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-indigo-700 text-lg mb-2">
                🌍 Global Access
              </h3>
              <p>Apply from anywhere in the world, anytime.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-indigo-700 text-lg mb-2">
                📄 Easy Application
              </h3>
              <p>
                Follow simple steps to complete your visa application quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
