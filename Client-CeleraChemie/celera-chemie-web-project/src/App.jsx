import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Navbar from "./components/common/Navigation/Navbar";
import Auth from "./utils/auth";
import "./App.css";
import HomePage from "./components/homePage/Home";
import LogInForm from "./components/user/Login";
import Footer from "./components/common/Footer/Footer";

const host = "http://localhost:5000/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.logout = this.logout.bind(this);
    this.loginUser = this.loginUser.bind(this);
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
          toast.error("Incalid credentials");
        } else {
          localStorage.setItem("username", body.username);
          localStorage.setItem("userId", body.userId);
          this.setState({
            user: body.username
          });
          toast.success("User successfuly registered!");
        }
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
          toast.error("Login failed");
        } else {
          localStorage.setItem("username", res.username);
          localStorage.setItem("userId", res.userId);
          localStorage.setItem("authToken", res.token);
          if (res.user.roles && res.user.roles.length > 0) {
            this.setState({
              isAdmin: true
            });
          }
          console.log(res.user.roles);
          
          this.setState({
            user: res.username,
            loggedIn: true
          });
          toast.success("Login successful!");
        }
      });
  }

  logout(event) {
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    this.setState({
      user: null
    });
  }

  componentWillMount() {
    const localUserName = localStorage.getItem("username");
    if (localUserName) {
      this.setState({
        user: localUserName
      });
    }
  }

  createProduct(data) {
    fetch(host + "product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(responce => responce.json())
      .then(body => {
        if (body.error) {
          toast.error(body.error);
        } else {
          toast.success("Product creted!");
          // Redirect
        }
      });
  }

  render() {
    return (
      <Fragment>
        <ToastContainer />
        <nav>
          <Navbar
            loggedIn={this.state.loggedIn}
            isAdmin={this.state.isAdmin}
            logout={this.logout}
          />
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/login"
              render={() => <LogInForm loginUser={this.loginUser} />}
            />
          </Switch>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);
