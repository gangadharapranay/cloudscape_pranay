import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import image1 from "../../assets/css/authentication/image1.jpg";
import "../../assets/css/authentication/signin.css";
import api from "../env/BaseApi";

// import {baseURL,accessToken} from './api.js'
const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api
        .post(api.defaults.baseURL + "/login_user", {
          username: name,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.access_token);
          if (localStorage.getItem("token") !== undefined &&  localStorage.getItem("token")!==null) {
            localStorage.setItem("isLoggedIn", true);
            navigate("/dashboard")
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.detail);
        });

      // console.log(response)
      // console.log(response.status)

      // console.log(response.data)
      // setData(response.data);
    } catch (error) {
      // setError(error);
      // console.log(error)
      // alert(error)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="d-flex  align-items-center mt-3 ml-5"
      style={{
        backgroundImage: `url(${image1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="gap card p-5 " style={{ width: "25rem" }}>
        <h2 className="card-title mb-4">Login</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              id="username"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
          Login
        </button>
        <p>
          <Link to="/reset-password">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
