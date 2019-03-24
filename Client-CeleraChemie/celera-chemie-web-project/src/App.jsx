import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

import Navbar from "./components/common/Navigation/Navbar";
import Auth from "./utils/auth";
import HomePage from "./components/homePage/Home";
import LogInForm from "./components/user/Login";
import Footer from "./components/common/Footer/Footer";
import About from "./components/about/About";
import CreatePage from "./components/products/CreatePage";
import Products from "./components/products/Products";
import Language from "./components/common/Language/Language";

const host = "http://localhost:5000/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.logout = this.logout.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.createProduct = this.createProduct.bind(this);
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
      })
      .catch(err => {
        console.log(err);
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
            window.localStorage.setItem("roles", res.user.roles);
          }

          this.setState({
            user: res.username,
            loggedIn: true
          });
          toast.success(res.message);
        }
      })
      .catch(err => {
        console.log(err);
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

  createProduct(data) {
    console.log(data);
    fetch(host + "product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth.getToken()
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Product creted!");
          return <Redirect to="/" />;
        }
      });
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
          <Route path="/about" component={About} />
          <Route
            path="/product/create"
            render={() => <CreatePage createProduct={this.createProduct} />}
          />
          <Route path="/products" component={Products} />
          )} />
        </Switch>
        <Language/>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);
