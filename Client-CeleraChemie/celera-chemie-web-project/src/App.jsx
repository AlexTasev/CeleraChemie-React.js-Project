import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import toastr from "toastr";

import Navbar from "./components/common/Navigation/Navbar";
import Auth from "./utils/auth";
import "./App.css";
import HomePage from "./components/homePage/Home";
import LogInForm from "./components/user/Login";
import Footer from "./components/common/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (Auth.isUserAuthenticated()) {
      this.setState({
        loggedIn: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginSuccess) {
      this.setState({
        loggedIn: true
      });
    }
  }

  logout() {
    this.setState({
      loggedIn: false
    });
    this.props.logout();
    toastr.success("Logout successful");
    this.props.history.push("/login");
  }

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
            <Route path="/login" component={LogInForm} />
        </Switch>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
