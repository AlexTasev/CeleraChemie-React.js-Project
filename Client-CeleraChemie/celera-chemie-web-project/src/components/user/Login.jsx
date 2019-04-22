import React from "react";
import { Redirect } from "react-router-dom";

import loginValidator from "../../utils/loginValidator";
import "./Form.css";
import Input from "../common/Input";

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (!loginValidator(this.state.email, this.state.password)) {
      return;
    }
    this.props.loginUser(this.state);
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Form">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            onChange={this.handleChange}
            label="e-mail"
            name="email"
            id="emailLogin"
          />
          <Input
            type="password"
            onChange={this.handleChange}
            label="Password"
            name="password"
            id="passwordLogin"
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LogInForm;
