import React from "react";
import logo from "../../../Resources/images/Celera-logo.png";
import { NavLink, Link } from "react-router-dom";
import "../Navigation/Navbar.css";

const Navbar = props => {
  const { loggedIn, isAdmin, logout, users, products } = props;

  return (
    <header className="web-site-header">
      <img src={logo} className="logo" alt="Celera-Chemie"/>
      <nav>
        <NavLink className="nav-link" to="/about">
          About Us
        </NavLink>
        <NavLink className="nav-link" to="/contacts">
          Contacts
        </NavLink>
        <NavLink className="nav-link" to="/products">
          Products
        </NavLink>
        <NavLink className="nav-link" to="/certificates">
          Certificates
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
