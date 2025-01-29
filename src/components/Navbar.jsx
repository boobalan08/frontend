import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const Navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage and redirect to signin
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    Navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between px-4">
      <span className="navbar-brand h3 text-white font-weight-bold">
        CodeTez
      </span>
      <div className="d-flex align-items-center">
        <span className="h5 text-white mb-0 me-4">
          Welcome, {username === "" ? "Guest" : username}
        </span>
        <button
          className="btn btn-outline-light text-white"
          onClick={handleLogout}
        >
          <IoIosLogOut className="me-2" size={20} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
