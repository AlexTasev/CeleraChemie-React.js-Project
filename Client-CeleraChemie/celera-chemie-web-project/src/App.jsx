import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import toastr from "toastr";

import Navbar from "./components/common/Navigation/Navbar";
import Auth from "./utils/auth";
import "./App.css";
import HomePage from "./components/homePage/Hpme";

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
        <Navbar
          loggedIn={this.state.loggedIn}
          isAdmin={isAdmin}
          logout={this.logout}
        />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
