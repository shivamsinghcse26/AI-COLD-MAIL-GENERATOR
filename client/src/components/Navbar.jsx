import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { logoutUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">

      <div className="text-lg font-medium text-gray-800 hidden md:block">
        Welcome back, {user?.name || "User"}
      </div>

      {/* Mobile Title */}
      <div className="text-lg font-bold text-primary-600 md:hidden">
        ColdMail AI
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-1" />

          <span className="text-sm font-medium">
            Logout
          </span>
        </button>
      </div>

    </header>
  );
};

export default Navbar;