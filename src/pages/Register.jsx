import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import a loading spinner icon

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuthState = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password don't match");
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
      name,
      email,
      password,
      confirmPassword,
    };

    const result = await dispatch(registerUser(formData)).unwrap();

    setTimeout(() => {
      navigate("/login");
    }, 2000);

    // Dispatch the thunk and use unwrap to get the result
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-background">
      <div
        className="flex flex-col items-center bg-card-background rounded-lg p-10 md:p-12 border border-custom-border shadow-xl transition-all duration-300 
                      hover:shadow-bright w-full max-w-md"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-text-emphasizing mb-4">
          Create an Account
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-text-normal font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-4 border border-custom-border bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-8">
            <label
              className="block text-text-normal font-semibold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-4 border border-custom-border bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="disabled:opacity-50 disabled:hover:cursor-not-allowed w-full p-4  bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={userAuthState && userAuthState.loading}
          >
            {userAuthState && userAuthState.loading ? (
              <AiOutlineLoading3Quarters className="text-xl animate-spin mx-auto" />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-text-normal text-sm md:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
