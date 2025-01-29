import React from "react";
import user from "../assets/images/users/avatar-1.jpg";
import { useNavigate } from "react-router-dom";
import Upload from "../components/Upload";
import Chat from "../components/Chat";

const Homepage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <>
      <div className="layout-wrapper d-lg-flex">
        <div className="side-menu flex-lg-column">
          <div className="navbar-brand-box">
            <a href="#" className="logo logo-dark">
              <span className="logo-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.5,18l3.5,4l3.5-4H19c1.103,0,2-0.897,2-2V4c0-1.103-0.897-2-2-2H5C3.897,2,3,2.897,3,4v12c0,1.103,0.897,2,2,2H8.5z M7,7h10v2H7V7z M7,11h7v2H7V11z" />
                </svg>
              </span>
            </a>

            <a href="#" className="logo logo-light">
              <span className="logo-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.5,18l3.5,4l3.5-4H19c1.103,0,2-0.897,2-2V4c0-1.103-0.897-2-2-2H5C3.897,2,3,2.897,3,4v12c0,1.103,0.897,2,2,2H8.5z M7,7h10v2H7V7z M7,11h7v2H7V11z" />
                </svg>
              </span>
            </a>
          </div>
          <div className="flex-lg-column my-0 sidemenu-navigation">
            <ul className="nav nav-pills side-menu-nav" role="tablist">
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-trigger="hover"
                data-bs-container=".sidemenu-navigation"
                title="Chats"
              >
                <a
                  className="nav-link"
                  id="pills-chat-tab"
                  data-bs-toggle="pill"
                  href="#pills-chat"
                  role="tab"
                >
                  <i className="bx bx-conversation"></i>
                </a>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-trigger="hover"
                data-bs-container=".sidemenu-navigation"
                title="Contacts"
              >
                <a
                  className="nav-link"
                  id="pills-contacts-tab"
                  data-bs-toggle="pill"
                  href="#pills-contacts"
                  role="tab"
                >
                  <i className="bx bx-cloud-upload"></i>
                </a>
              </li>

              <li className="nav-item mt-auto dropdown profile-user-dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href=""
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={user}
                    alt="user"
                    className="profile-user rounded-circle user-profile-image"
                  />
                </a>
                <div className="dropdown-menu">
                  <div className="dropdown-divider"></div>
                  <a
                    href=""
                    onClick={handleLogout}
                    className="dropdown-item d-flex align-items-center justify-content-between logout_btn"
                  >
                    Log out
                    <i className="bx bx-log-out-circle text-muted ms-1"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="chat-leftsidebar">
          <div className="tab-content">
            <div
              className="tab-pane"
              id="pills-chat"
              role="tabpanel"
              aria-labelledby="pills-chat-tab"
            >
              <Chat />
            </div>
          </div>
          {/* <Upload /> */}
        </div>
        <div className="user-chat w-100 overflow-hidden">
          <div className="user-chat-overlay"></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
