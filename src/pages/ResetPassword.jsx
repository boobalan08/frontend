import React, { useState } from "react";
import img from "../assets/images/auth-img.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../Api";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrors({ email: "Invalid email format" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/auth/reset-password`, {
        email,
        newPassword,
      });

      if (response.status === 200) {
        toast.success("Password reset successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ email: error.response.data.message });
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-bg">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-xl-3 col-lg-4">
            <div className="p-4 pb-0 p-lg-5 pb-lg-0 auth-logo-section">
              <div className="text-white-50">
                <h3>
                  <a href="/" className="text-white">
                    Chat
                  </a>
                </h3>
                <p className="font-size-16">Chat App</p>
              </div>
              <div className="mt-auto">
                <img src={img} alt="Auth" className="auth-img" />
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="authentication-page-content">
              <div className="d-flex flex-column h-100 px-4 pt-4">
                <div className="row justify-content-center my-auto">
                  <div className="col-sm-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="py-md-5 py-4">
                      <div className="text-center mb-5">
                        <h3>Reset Password</h3>
                        <p className="text-muted">
                          Enter your new password below.
                        </p>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="newPassword" className="form-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            className={`form-control ${
                              errors.newPassword ? "is-invalid" : ""
                            }`}
                            id="newPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                          {errors.newPassword && (
                            <div className="invalid-feedback">
                              {errors.newPassword}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className={`form-control ${
                              errors.confirmPassword ? "is-invalid" : ""
                            }`}
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          {errors.confirmPassword && (
                            <div className="invalid-feedback">
                              {errors.confirmPassword}
                            </div>
                          )}
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Reset Password
                          </button>
                        </div>
                      </form>

                      <div className="mt-5 text-center text-muted">
                        <p>
                          Remember your password?
                          <Link
                            to="/"
                            className="px-2 fw-medium text-decoration-underline"
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
