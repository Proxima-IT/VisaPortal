import React, { useContext, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { handleLogin, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await handleLogin(data.email, data.password);
      const user = result.user;
      setUser(user);

      toast.success("Account login successful!");
      reset();

      setTimeout(() => navigate("/apply-form"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.");
    }
  };
  return (
    <div>
      <div className="lg:p-10 p-3 bg-amber-50 dark:bg-gray-700">
        <div className="flex items-center justify-center min-h-screen  lg:px-4">
          <div className="lg:w-5/12 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-amber-800  dark:text-amber-200">
                Login
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Welcome back! Please login to continue.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
              {/* Email */}
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-left text-lg font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full px-4 py-3 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D336B] focus:outline-none"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="text-lg font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <NavLink
                    to="/forgot-password"
                    className="text-sm text-[#2D336B] dark:text-white hover:underline"
                  >
                    Forgot password?
                  </NavLink>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-3 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D336B] focus:outline-none"
                />
                <span
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className=" absolute right-5 top-[52px]"
                >
                  {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </span>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  {...register("remember")}
                  className="w-4 h-4 text-[#2D336B] border-gray-300 rounded focus:ring-[#2D336B]"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Remember me
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-2 text-lg font-semibold rounded-xl bg-amber-700 text-white shadow-md hover:opacity-90 transition"
              >
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-full bg-gray-300 dark:bg-gray-600"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  OR
                </span>
                <div className="h-px w-full bg-gray-300 dark:bg-gray-600"></div>
              </div>

              {/* Register link */}
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                Don’t have an account?{" "}
                <NavLink
                  to="/register"
                  className="underline text-[#2D336B] dark:text-white"
                >
                  Register here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Login;
