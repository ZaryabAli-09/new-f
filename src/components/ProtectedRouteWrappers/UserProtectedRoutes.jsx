import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const UserProtectedRoutes = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return user?.user_role === "user" && isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default UserProtectedRoutes;
