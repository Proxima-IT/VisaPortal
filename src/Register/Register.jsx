import React, {  useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { handleRegister, handleUpdateProfile, setUser } =  useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    if (!profileImage) {
      toast.error("You must upload a profile image!");
      return;
    }

    const { name, email, password } = data;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one lowercase letter.");
      return;
    }

    try {
      const result = await handleRegister(email, password);
      const user = result.user;

      await handleUpdateProfile({
        displayName: name,
        photoURL: profileImage,
      });

      setUser({ ...user, displayName: name, photoURL: profileImage });

      toast.success("Account created successfully!");
      reset();
      setProfileImage("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handlePhotoUpload = async (e) => {
    const image = e.target.files?.[0];
    if (!image) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_key_api
      }`;

      const res = await axios.post(imageUploadUrl, formData);
      setProfileImage(res.data.data.url);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed, try again.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <div className="hero p-3 lg:p-10 bg-amber-50 dark:bg-gray-700">
        <div className="flex items-center justify-center min-h-screen  lg:px-4">
          <div className="lg:w-5/12 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-200">
                Register
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Create an account to continue.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 text-left"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block  text-lg font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D336B] focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-3 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D336B] focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Upload Photo */}
              <div>
                <label
                  htmlFor="photo"
                  className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D336B] focus:outline-none"
                />
                {uploading && (
                  <p className="text-sm text-blue-600 mt-1">Uploading...</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className=" w-full px-4 py-3 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#2D336B] focus:outline-none"
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-2 text-lg font-semibold rounded-xl bg-amber-700 text-white shadow-md hover:opacity-90 transition disabled:opacity-50"
              >
                {uploading ? "Please wait..." : "Register"}
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-full bg-gray-300 dark:bg-gray-600"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  OR
                </span>
                <div className="h-px w-full bg-gray-300 dark:bg-gray-600"></div>
              </div>

              {/* Login link */}
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="underline text-[#925c23] dark:text-white"
                >
                  Login here
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

export default Register;
