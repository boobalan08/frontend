import React, { useState } from "react";
import img from "../assets/images/auth-img.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Api";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // Store validation errors

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Clear field error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submitting

    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data.errors;
        if (Array.isArray(errorData)) {
          const newErrors = {};
          errorData.forEach((err) => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An error occurred while signing up.");
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
                <img src={img} alt="" className="auth-img" />
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
                        <h3>Register Account</h3>
                        <p className="text-muted">
                          Get your free account now...
                        </p>
                      </div>
                      <form className="login_form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.username ? "is-invalid" : ""
                            }`}
                            id="username"
                            placeholder="Enter Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                          {errors.username && (
                            <div className="invalid-feedback">
                              {errors.username}
                            </div>
                          )}
                        </div>
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
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type="password"
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              id="password"
                              placeholder="Enter Password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>

                      <div className="mt-5 text-center text-muted">
                        <p>
                          Already have an account ?
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

export default Signup;
