import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import Dashboard from "../components/Admin/Dashboard";
import UserManagement from "../components/Admin/UserManagement";

const adminRoutes = [
  { path: "dashboard", Component: Dashboard },
  { path: "user-management", Component: UserManagement },
];

const Admin = () => {
  return (
    <div className="flex h-screen bg-custom-background">
      <AdminSidebar />
      <div className="flex flex-col w-[calc(100%-250px)]">
        <div className="flex-1 overflow-auto">
          <Routes>
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.Component />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
