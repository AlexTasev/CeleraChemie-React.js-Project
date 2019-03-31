import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

import Navbar from "./components/common/Navigation/Navbar";
import HomePage from "./components/homePage/Home";
import RegisterForm from "./components/user/Register";
import LogInForm from "./components/user/Login";
import Footer from "./components/common/Footer/Footer";
import About from "./components/about/About";
import CertificatesPage from "./components/certificates/CertificatesPage";
import Contacts from "./components/contacts/Contacts";
import CreatePage from "./components/products/create/CreatePage";
import Products from "./components/products/read/Products";
import Language from "./components/common/Language/Language";

const host = "http://localhost:5000/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      isAdmin: false
    };

    this.logout = this.logout.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(user) {
    fetch(host + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(responce => responce.json())
      .then(body => {
        if (body.errors) {
          toast.error("Invalid credentials");
        } else {
          this.setState({
            loggedIn: true
          });
          localStorage.setItem("username", body.username);
          localStorage.setItem("userId", body.userId);
          localStorage.setItem("authToken", body.token);
          toast.success("User successfuly registered!");
        }
      })
      .catch(err => {
        toast.error("Invalid credentials");
      });
  }

  loginUser(user) {
    fetch(host + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(responce => responce.json())
      .then(res => {
        if (res.errors) {
          toast.error(res.message);
        } else {
          localStorage.setItem("username", res.username);
          localStorage.setItem("userId", res.userId);
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
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    this.setState({
      user: null
    });
  }

  componentDidMount() {
    const localUserName = localStorage.getItem("username");
    if (localUserName) {
      this.setState({
        user: localUserName
      });
    }
  }

  render() {
    return (
      <Fragment>
        <ToastContainer />
        <Navbar
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
          <Route path="/contacts" component={Contacts} />
          <Route path="/about" component={About} />
          <Route path="/certificates" component={CertificatesPage} />
          <Route
            path="/product/create"
            render={() => <CreatePage isAdmin={this.state.isAdmin} />}
          />
          <Route
            path="/products"
            render={() => <Products isAdmin={this.state.isAdmin} />}
          />
        </Switch>
        <Language />
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);
