import React from 'react'

const SideMenu = () => {
  return (
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
                className="nav-item d-none d-lg-block"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-trigger="hover"
                data-bs-container=".sidemenu-navigation"
                title="Profile"
              >
                <a
                  className="nav-link"
                  id="pills-user-tab"
                  data-bs-toggle="pill"
                  href="#pills-user"
                  role="tab"
                >
                  <i className="bx bx-user-circle"></i>
                </a>
              </li>
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
                  <i className="bx bxs-user-detail"></i>
                </a>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-trigger="hover"
                data-bs-container=".sidemenu-navigation"
                title="Calls"
              >
                <a
                  className="nav-link"
                  id="pills-calls-tab"
                  data-bs-toggle="pill"
                  href="#pills-calls"
                  role="tab"
                >
                  <i className="bx bx-phone-call"></i>
                </a>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-trigger="hover"
                data-bs-container=".sidemenu-navigation"
                title="People"
              >
                <a
                  className="nav-link"
                  id="pills-users-tab"
                  data-bs-toggle="pill"
                  href="#pills-users"
                  role="tab"
                >
                  <i className="bx bxs-group"></i>
                </a>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-container=".sidemenu-navigation"
                data-bs-trigger="hover"
                title="Settings"
              >
                <a
                  className="nav-link active"
                  id="pills-setting-tab"
                  data-bs-toggle="pill"
                  href="#pills-setting"
                  role="tab"
                >
                  <i className="bx bx-cog"></i>
                </a>
              </li>
              <li className="nav-item mt-auto">
                <a
                  className="nav-link light-dark"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="right"
                  data-bs-container=".sidemenu-navigation"
                  data-bs-html="true"
                  title="<span className='light-mode'>Light</span> <span className='dark-mode'>Dark</span> Mode"
                >
                  <i className="bx bx-moon"></i>
                </a>
              </li>
              <li className="nav-item dropdown profile-user-dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="assets/images/users/avatar-1.jpg"
                    alt=""
                    className="profile-user rounded-circle user-profile-image"
                  />
                </a>
                <div className="dropdown-menu">
                  <a
                    className="dropdown-item d-flex align-items-center justify-content-between"
                    id="pills-user-tab"
                    data-bs-toggle="pill"
                    href="#pills-user"
                    role="tab"
                  >
                    Profile{" "}
                    <i className="bx bx-user-circle text-muted ms-1"></i>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center justify-content-between"
                    id="pills-setting-tab"
                    data-bs-toggle="pill"
                    href="#pills-setting"
                    role="tab"
                  >
                    Setting <i className="bx bx-cog text-muted ms-1"></i>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center justify-content-between"
                    href="reset-password.html"
                  >
                    Change Password{" "}
                    <i className="bx bx-lock-open text-muted ms-1"></i>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    href="/"
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
      </div>
  )
}

export default SideMenu