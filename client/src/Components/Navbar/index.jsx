import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar_row">
          <div className="navbar_left">
            <Link to="/">
              <img className="nav_logo" src="/Images/Logo.svg" alt="logo" />
            </Link>
          </div>

          <div className="navbar_right">
            <ul className="nav_links">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
