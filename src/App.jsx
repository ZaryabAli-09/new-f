import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { SectionProvider } from "./context/SectionContext.jsx";
import Admin from "./pages/Admin";
import Main from "./pages/Main";
import { Toaster } from "react-hot-toast";
import UserProtectedRoutes from "./components/ProtectedRouteWrappers/UserProtectedRoutes";
import AdminProtectedRouteWrapper from "./components/ProtectedRouteWrappers/AdminProtectedRouteWrapper";

export default function App() {
  return (
    <BrowserRouter>
      <SectionProvider>
        <Toaster position="bottom-center" />
        {location.pathname === "/" && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* user routes  */}
          <Route element={<UserProtectedRoutes />}>
            <Route path="/main/*" element={<Main />} />
          </Route>
          {/* admin routes  */}
          <Route element={<AdminProtectedRouteWrapper />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>
        </Routes>
      </SectionProvider>
    </BrowserRouter>
  );
}
