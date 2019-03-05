import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import toastr from "toastr";

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
          toastr.error(body.error);
        } else {
          localStorage.setItem("username", body.username);
          localStorage.setItem("userId", body.userId);
          this.setState({
            user: body.username
          });
          toastr.success("User successfuly registered!");
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
          toastr.error(res.errors.email)
        } else {
          localStorage.setItem("username", res.username);
          localStorage.setItem("userId", res.userId);
          this.setState({
            user: res.username
          });
          toastr.success("Login successful!");
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
          toastr.error(body.error);
        } else {
          toastr.success("Product creted!");
          // Redirect
        }
      });
  }

  // if (Auth.isUserAuthenticated()) {
  //   this.setState({
  //     loggedIn: true
  //   });
  // }

  // if (nextProps.loginSuccess) {
  //   this.setState({
  //     loggedIn: true
  //   });
  // }

  render() {
    const isAdmin = Auth.isUserAdmin();

    return (
      <Fragment>
        <nav>
          <Navbar
            loggedIn={this.state.loggedIn}
            isAdmin={isAdmin}
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

export default App;
