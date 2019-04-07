import React from "react";
import logo from "../../../Resources/images/Celera-logo.png";
import { NavLink } from "react-router-dom";
import "../Navigation/Navbar.css";

const Navbar = props => {
  const { loggedIn, isAdmin, logout } = props;

  return (
    <header className="web-site-header">
      <nav>
        <NavLink className="nav-link-left" to="/">
          <img src={logo} className="logo" alt="Celera-Chemie" />
        </NavLink>
        {loggedIn && (
          <NavLink className="nav-link-right" to="/products">
            Products
          </NavLink>
        )}
        <NavLink className="nav-link-right" to="/contacts">
          Contacts
        </NavLink>
        <NavLink className="nav-link-right" to="/about">
          About Us
        </NavLink>
        <NavLink className="nav-link-right" to="/certificates">
          Certificates
        </NavLink>
        {isAdmin && (
          <NavLink className="nav-link-right" to="/product/create">
            New Product
          </NavLink>
        )}
        {isAdmin && (
          <NavLink className="nav-link-right" to="/users">
            All Users
          </NavLink>
        )}
        {!loggedIn && (
          <NavLink className="nav-link-right" to="/login">
            Login
          </NavLink>
        )}
        {!loggedIn && (
          <NavLink className="nav-link-right" to="/register">
            Register
          </NavLink>
        )}
        {loggedIn && (
          <a href="/" className="nav-link-right" onClick={logout}>
            Logout
          </a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
