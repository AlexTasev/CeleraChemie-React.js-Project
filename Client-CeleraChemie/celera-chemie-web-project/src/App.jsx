import React, { Component } from "react";
import toastr from "toastr";

import Auth from "./utils/auth";
import "./App.css";

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
      <div className="App">
        <h1>Hello world!</h1>
      </div>
    );
  }
}

export default App;
