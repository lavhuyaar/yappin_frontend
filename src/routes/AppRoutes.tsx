import { Route, Routes } from "react-router";
import { Flip, ToastContainer } from "react-toastify";

import useTheme from "../hooks/useTheme";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chats from "../pages/Chats";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";

const AppRoutes = () => {
  const { theme } = useTheme();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        theme={theme}
        transition={Flip}
        position="top-center"
      />
    </>
  );
};
export default AppRoutes;
