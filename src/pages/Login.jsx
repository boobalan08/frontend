import React, { useState } from "react";
import img from "../assets/images/auth-img.png";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../Api";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const response = await axios.post(`${baseUrl}/auth/signin`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("username", response.data.user.username);
        toast.success("Sign-in successful");
        navigate("/home");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setErrors({ message: err.response.data.message }); // Store validation error
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occurred during sign-in");
        }
      } else {
        console.error(err);
        toast.error("Network error");
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
                        <h3>Welcome Back !</h3>
                        <p className="text-muted">Sign in to continue...</p>
                      </div>
                      <form className="login_form" onSubmit={handleSignIn}>
                        <div className="mb-3">
                          <label htmlFor="useremail" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className={`form-control ${
                              errors.message && errors.message.includes("Email")
                                ? "is-invalid"
                                : ""
                            }`}
                            id="useremail"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          {errors.message &&
                            errors.message.includes("Email") && (
                              <div className="invalid-feedback">
                                {errors.message}
                              </div>
                            )}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to={"/resetpassword"} className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <label htmlFor="userpassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            className={`form-control ${
                              errors.message &&
                              errors.message.includes("Password")
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter Password"
                            id="password-input"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          {errors.message &&
                            errors.message.includes("Password") && (
                              <div className="invalid-feedback">
                                {errors.message}
                              </div>
                            )}
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </form>

                      <div className="mt-5 text-center text-muted">
                        <p>
                          Don't have an account ?
                          <Link
                            to="/signup"
                            className="px-2 fw-medium text-decoration-underline"
                          >
                            Register
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

export default Login;
