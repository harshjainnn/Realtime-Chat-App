import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, LogOut, User } from "lucide-react";

const Navbar = () => {
  const { isLoggingOut, logout, authUser } = useAuthStore();
  return (
    <div className="navbar bg-base-50 shadow-lg flex flex-row">
      <div className="flex-none ms-4 me-2">
        <MessageSquare className="items-center justify-center size-6 text-primary" />
      </div>
      <div className="flex-1">
        <Link to={"/"} className={`btn btn-ghost text-xl`}>
          Slack
        </Link>
      </div>
      <div className="flex-none me-4">
        {authUser && (
          <Link to={"/profile"} className="btn btn-ghost btn-square w-24">
            <User className="size-5" />
            Profile
          </Link>
        )}
      </div>
      <div className="flex-none me-4">
        {authUser && (
          <button onClick={logout} className="btn btn-square btn-ghost w-24">
            <LogOut className="size-5" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;