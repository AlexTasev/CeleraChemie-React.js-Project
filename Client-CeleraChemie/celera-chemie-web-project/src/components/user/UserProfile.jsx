import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Input from "../common/Input";
import { get, put, remove } from "../../data/crud"
import "../common/Form.css";
import editValidator from "../../utils/editValidator";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      organisation: "",
      nameOfUser: "",
      phoneNumber: "",
      isUserChanged: false,
      isUserDeleted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async componentDidMount() {
    const userId = localStorage.getItem("userId");
    await get(`users/${userId}`)
      .then(user =>
        this.setState({
          email: user.email,
          organisation: user.organisation,
          nameOfUser: user.nameOfUser,
          phoneNumber: user.phoneNumber
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

  async onSubmit(event) {
    event.preventDefault();
    if (!editValidator(this.state.email, this.state.organisation)) {
      return;
    }
    let userId = localStorage.getItem("userId");
    await put(`users/${userId}`, this.state)
      .then(body => {
        if (!body.success) {
          toast.error(body.message);
        } else {
          toast.success("User info successfuly updated!");
          this.setState({
            isUserChanged: true
          });
        }
      })
      .catch(err => {
        toast.error("Invalid credentials");
      });
  }

  deleteConfirmation = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to permanently delete your profile?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteUser()
        },
        {
          label: "No",
          onClick: () => { }
        }
      ]
    });
  };

  async deleteUser() {
    let userId = localStorage.getItem("userId");
    await remove(`users/${userId}`)
      .then(res => {
        this.props.logout();
        this.setState({
          isUserDeleted: true
        });
        toast.success("User deleted successfuly");
        this.props.logout();
      });
  }

  render() {
    if (this.state.isUserChanged) {
      return <Redirect to="/" />;
    }

    if (this.state.isUserDeleted) {
      return <Redirect to="/" />;
    }

    return (
      <section className="form">
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
          <input type="submit" value="Edit Profile" />
          <button className="deleteBtn" onClick={this.deleteConfirmation}>
            Delete User
          </button>
        </form>
      </section>
    );
  }
}

export default UserProfile;
