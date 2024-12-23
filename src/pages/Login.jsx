// src/pages/Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import a loading spinner icon
import { loginUser } from "../store/authSlice";
import { toast } from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please fill out all required fields");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    const formData = {
      email,
      password,
    };

    const result = await dispatch(loginUser(formData)).unwrap(); // Unwrap to ge
    if (result) {
      console.log(userAuthState.user.user_role);
      if (userAuthState.user.user_role === "admin") {
        console.log("hit1");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        console.log("hit2");
        setTimeout(() => {
          navigate("/main/dashboard");
        }, 2000);
      }
    }

    // await dispatch(login({ email, password })).unwrap(); // Use unwrap to handle fulfilled/rejected
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-background">
      <div
        className="flex flex-col items-center bg-card-background rounded-lg p-10 md:p-12 border border-custom-border shadow-xl transition-all duration-300 
                      hover:shadow-bright w-full max-w-md"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-text-emphasizing mb-4">
          Welcome Back!
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-text-normal font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border border-custom-border bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-text-normal font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-4 border border-custom-border bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="disabled:hover:cursor-not-allowed w-full p-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={userAuthState && userAuthState.loading}
          >
            {userAuthState && userAuthState.loading ? (
              <AiOutlineLoading3Quarters className="text-xl animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-text-normal text-sm md:text-base">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              Register
            </Link>
          </p>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-purple-600 hover:underline hover:text-purple-700 text-sm md:text-base"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
