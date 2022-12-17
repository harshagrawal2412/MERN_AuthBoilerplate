import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
// import logo from "../../../Images/Logo.svg";
import auth from "../../../auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  useEffect(() => {
    document.title = `${auth[1].Title}`;
  }, []);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/auth/register",
        {
          username,
          email,
          password,
        },
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
    <div className="register-screen">
      {/* {/* <img src={logo} alt="" className="logo" /> */}
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">{auth[2].RegisterHeader}</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type={show.showPassword ? "text" : "password"}
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="visible"
            onClick={() =>
              setShow({ ...show, showPassword: !show.showPassword })
            }
          >
            {!show.showPassword ? <Visibility /> : <VisibilityOff />}
          </span>
        </div>
        <div className="form-group">
          <input
            type={show.showConfirmPassword ? "text" : "password"}
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="visible"
            onClick={() =>
              setShow({
                ...show,
                showConfirmPassword: !show.showConfirmPassword,
              })
            }
          >
            {!show.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
          </span>
        </div>
        <button type="submit" className="btn btn-primary">
          {auth[2].RegisterButton}
        </button>

        <span className="register-screen__subtext">
          {auth[2].AccountConfimation}{" "}
          <Link to="/login">{auth[1].LoginLink}</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
