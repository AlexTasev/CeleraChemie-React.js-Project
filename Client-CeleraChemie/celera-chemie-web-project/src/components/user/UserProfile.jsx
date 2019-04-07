import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import registerValidator from "../../utils/registerValidator";
import Input from "../common/Input";
import Auth from "../../utils/auth";
import "./Form.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      organisation: null,
      nameOfUser: null,
      phoneNumber: null,
      password: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:5000/users/edit/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
      .then(rawData => rawData.json())
      .then(user =>
        this.setState({
          email: user.email,
          organisation: user.organisation,
          nameOfUser: user.nameOfUser,
          phoneNumber: user.phoneNumber,
          password: user.password
        })
      );
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
    let userId = localStorage.getItem("userId");
    fetch(`http://localhost:5000/users/edit/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth.getToken()
      },
      body: JSON.stringify(this.state)
    })
      .then(responce => responce.json())
      .then(body => {
        if (!body.success) {
          toast.error(body.message);
        } else {
          toast.success("User info successfuly updated!");
        }
      })
      .catch(err => {
        toast.error("Invalid credentials");
      });
  }

  render() {
    return (
      <div className="Form">
        <h1>Edit Profile Info</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            onChange={this.handleChange}
            label="e-mail"
            name="email"
            value={this.state.email}
            id="emailLogin"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            label="Organisation"
            name="organisation"
            value={this.state.organisation}
            id="organisationRegister"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            label="Name"
            name="nameOfUser"
            value={this.state.nameOfUser}
            id="nameRegister"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            label="Phone Number"
            name="phoneNumber"
            value={this.state.phoneNumber}
            id="phoneNumberRegister"
          />
          <Input
            type="password"
            onChange={this.handleChange}
            label="Change Password"
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
          <input type="submit" value="Edit Profile" />
        </form>
      </div>
    );
  }
}

export default UserProfile;
