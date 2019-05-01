import React from "react";
import { Redirect } from "react-router-dom";

import registerValidator from "../../utils/registerValidator";
import "../common/Form.css";
import Input from "../common/Input";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      organisation: '',
      nameOfUser: '',
      phoneNumber: '',
      password: ''
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
    if (
      !registerValidator(
        this.state.email,
        this.state.organisation,
        this.state.password,
        this.state.repeatPassword
      )
    ) {
      return;
    }
    this.props.registerUser(this.state);
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <section
        className="form"
        style={{
          backgroundImage: `url("https://am3pap003files.storage.live.com/y4pWc1itk9AtD-baxMeucFyjjsCeNSCSAu2GgMeLlNG4C3NffMR1WFF6iMpnSiYmBfEpu2FsmuUXaIqkTWUNYxcHpME1xVGOPktR0MEIUcN1IUngrn4xFfn92pBWJmRXcPLqMmNIDG2YJYC-4qAcKXr1UI6zEFXpiz9BPvRHlbO6oDnXYC2KfZMjfULnKvqzggL/welcome.png?psid=1&width=484&height=209")`
        }}
      >
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            onChange={this.handleChange}
            label="e-mail"
            name="email"
            id="emailLogin"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            label="Organisation"
            name="organisation"
            id="organisationRegister"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            label="Name"
            name="nameOfUser"
            id="nameRegister"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            label="Phone Number"
            name="phoneNumber"
            id="phoneNumberRegister"
          />
          <Input
            type="password"
            onChange={this.handleChange}
            label="Password"
            name="password"
            id="passwordLogin"
          />
          <Input
            type="password"
            onChange={this.handleChange}
            label="Repeat Password"
            name="repeatPassword"
            id="passwordRegister"
          />
          <input type="submit" value="Register" />
        </form>
      </section>
    );
  }
}

export default RegisterForm;
