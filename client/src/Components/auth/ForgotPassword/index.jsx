import { useState } from "react";
import axios from "axios";
import "./style.css";
import auth from "../../../auth";
// import Image from "../../../Images/forgot_password.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);
      setEmail("");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className=" forgotpassword">
      {/* <img className="forgotpassword__image" src={Image} alt="" /> */}
      <form onSubmit={forgotPasswordHandler} className="forgotpassword__form">
        {error && <span className="error__message">{error}</span>}
        {success && <span className="success__message">{success}</span>}
        <div className="forgotpasswordForm form-group">
          <h3 className="forgotpassword__title">
            {auth[0].ForgotPasswordHeader}
          </h3>
          <p className="forgotpassword__subtext">
            {auth[0].ForgotPasswordPara}
          </p>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn__forgot btn__primary">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
