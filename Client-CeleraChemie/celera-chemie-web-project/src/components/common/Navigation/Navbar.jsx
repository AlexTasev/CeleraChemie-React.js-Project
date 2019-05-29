import React from "react";
import logo from "../../../Resources/images/Celera-logo.png";
import { NavLink } from "react-router-dom";
import Translate from "../../../locales/Translate";
import "../Navigation/Navbar.css";

const Navbar = props => {
  const { loggedIn, isAdmin, logout, } = props;
  const userId = localStorage.getItem("userId");

  return (
    <header className="web-site-header">
      <nav>
        <NavLink className="nav-link-left" to="/">
          <img src={logo} className="logo" alt="Celera-Chemie" />
        </NavLink>
        <div className="navigation-buttons">
          {loggedIn && (
            <NavLink className="nav-link-right" to="/products">
              <Translate string={"nav.products"} />
            </NavLink>
          )}
          {loggedIn && userId && !isAdmin && (
            <NavLink className="nav-link-right" to={`/user/profile/${userId}`}>
              <Translate string={"nav.profile"} />
            </NavLink>
          )}
          <NavLink className="nav-link-right" to="/contacts">
            <Translate string={"nav.contacts"} />
          </NavLink>
          <NavLink className="nav-link-right" to="/about">
            <Translate string={"nav.about"} />
          </NavLink>
          <NavLink className="nav-link-right" to="/certificates">
            <Translate string={"nav.certificates"} />
          </NavLink>
          {isAdmin && (
            <NavLink className="nav-link-right" to="/product/create">
              <Translate string={"nav.newProduct"} />
            </NavLink>
          )}
          {isAdmin && (
            <NavLink className="nav-link-right" to="/users">
              <Translate string={"nav.allUsers"} />
            </NavLink>
          )}
          {!loggedIn && (
            <NavLink className="nav-link-right" to="/login">
              <Translate string={"nav.login"} />
            </NavLink>
          )}
          {!loggedIn && (
            <NavLink className="nav-link-right" to="/register">
              <Translate string={"nav.register"} />
            </NavLink>
          )}
          {loggedIn && (
            <a href="/" className="nav-link-right" onClick={logout}>
              <Translate string={"nav.logout"} />
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
