import React from "react";
import loginValidator from "../../utils/loginValidator";
import "./Login.css";

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (!loginValidator(this.state.email, this.state.password)) {
      return;
    } 
    this.props.loginUser(this.state)
  }

  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <label>e-mail</label>
          <input
            type="text"
            onChange={this.handleChange}
            name="email"
            id="emailLogin"
          />
          <label>Password</label>
          <input
            type="password"
            onChange={this.handleChange}
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
