import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import {post} from "./data/crud"

import Navbar from "./components/common/Navigation/Navbar";
import HomePage from "./components/homePage/Home";
import RegisterForm from "./components/user/Register";
import LogInForm from "./components/user/Login";
import Footer from "./components/common/Footer/Footer";
import About from "./components/about/About";
import Contacts from "./components/contacts/Contacts";
import CreatePage from "./components/products/create/CreatePage";
import Products from "./components/products/read/Products";
import Language from "./components/common/Language/Language";
import LocaleContext from "./locales/LocaleContext";
import EditProduct from "./components/products/update/EditProduct";
import AllUsers from "./components/user/AllUsers";
import UserProfile from "./components/user/UserProfile";
import Certificates from "./components/certificates/CertificatesPage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      isAdmin: false,
      preferredLocale: "en"
    };

    this.logout = this.logout.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  async registerUser(user) {
    await post("auth/signup", user)
      .then(res => {
        if (!res.success) {
          toast.error(res.message);
        } else {
          toast.success("User successfuly registered!");
          this.setState({
            loggedIn: true
          });
        }
      })
      .catch(err => {
        toast.error("Invalid credentials");
      });
  }

  async loginUser(user) {
    await post("auth/login", user)
      .then(res => {
        if (!res.success) {
          toast.error(res.message);
        } else {
          localStorage.setItem("userId", res.user.userId);
          localStorage.setItem("authToken", res.token);
          if (res.user.roles && res.user.roles.length > 0) {
            this.setState({
              isAdmin: true
            });
            localStorage.setItem("roles", res.user.roles);
          }

          this.setState({
            user: res.username,
            loggedIn: true
          });
          toast.success(res.message);
        }
      })
      .catch(err => {
        toast.error("Invalid credentials");
      });
  }

  logout(event) {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("roles");
    this.setState({
      loggedIn: false,
      user: null
    });
  }

  changeLanguage = ({ currentTarget: { id } }) => {
    this.setState({
      preferredLocale: id
    });
  };

  componentDidMount() {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("roles");
    this.setState({
      user: null
    });
  }

  render() {
    return (
      <Fragment>
        <ToastContainer />
        <LocaleContext.Provider value={this.state.preferredLocale}>
          <Navbar
            {...this.props}
            loggedIn={this.state.loggedIn}
            isAdmin={this.state.isAdmin}
            logout={this.logout}
          />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/login"
              render={() => (
                <LogInForm
                  loginUser={this.loginUser}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />
            <Route
              path="/register"
              render={() => (
                <RegisterForm
                  registerUser={this.registerUser}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />
            <Route
              path="/user/profile/:userId"
              render={props => (
                <UserProfile
                  {...props}
                  loggedIn={this.state.loggedIn}
                  logout={this.logout}
                />
              )}
            />
            <Route
              path="/contacts"
              render={props => (
                <Contacts preferredLocale={this.state.preferredLocale} />
              )}
            />
            <Route path="/about" component={About} />
            <Route
              path="/certificates"
              render={props => (
                <Certificates
                  preferredLocale={this.state.preferredLocale}
                />
              )}
            />
            <Route
              path="/product/create"
              render={() => (
                <CreatePage
                  isAdmin={this.state.isAdmin}
                  preferredLocale={this.state.preferredLocale}
                />
              )}
            />
            <Route
              path="/products"
              render={() => (
                <Products
                  isAdmin={this.state.isAdmin}
                  loggedIn={this.state.loggedIn}
                  preferredLocale={this.state.preferredLocale}
                />
              )}
            />
            <Route
              path="/product/edit/:id"
              render={props => (
                <EditProduct {...props} isAdmin={this.state.isAdmin} />
              )}
            />
            <Route
              path="/users"
              render={() => <AllUsers isAdmin={this.state.isAdmin} />}
            />
          </Switch>
          <Language changeLanguage={this.changeLanguage} />
          <Footer />
        </LocaleContext.Provider>
      </Fragment>
    );
  }
}

export default withRouter(App);
