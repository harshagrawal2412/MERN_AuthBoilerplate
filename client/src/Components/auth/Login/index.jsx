import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
import auth from "../../../auth";

// import logo from "../../../Images/Logo.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = `${auth[1].Title}`;
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      {/* {/* <img src={logo} alt="" className="logo" /> */}
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">{auth[1].LoginHeader}</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
          <span
            className="visible"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <Visibility /> : <VisibilityOff />}
          </span>
        </div>
        <Link to="/forgotpassword" className="login-screen__forgotpassword">
          {auth[1].ForgotPassword}
        </Link>
        <button type="submit" className="btn__login btn__primary">
          {auth[1].LoginButton}
        </button>

        <span className="login-screen__subtext">
          {auth[1].AccountConfimation}
          <Link to="/register">{auth[1].RegisterLink}</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
