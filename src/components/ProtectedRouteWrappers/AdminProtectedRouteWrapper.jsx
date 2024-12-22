import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRouteWrapper = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return user?.user_role === "admin" && isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default AdminProtectedRouteWrapper;
