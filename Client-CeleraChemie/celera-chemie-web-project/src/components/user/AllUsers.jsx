import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../../utils/auth";
import "./AllUsers.css";

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isUserDeleted: false
    };

    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/users/all", {
      method: "GET",
      headers: {
        Authorization: "bearer " + Auth.getToken()
      }
    })
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteUser(e) {
    const userId = e.target.id;
    if (this.props.isAdmin) {
      fetch(`http://localhost:5000/users/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + Auth.getToken()
        }
      }).then(res => {
        this.setState({
          isUserDeleted: true
        });
        toast.success("User deleted successfuly");
      });
    }
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to="/login" />;
    }

    if (this.state.isUserDeleted) {
        return <Redirect to="/" />;
    }

    let allUsers = this.state.users;

    return (
      <section className="users-section">
        {allUsers.map(user => (
          <div className="single-user" key={user._id} >
            <div>
              <span>Organisation: </span>
              {user.organisation}
            </div>
            <div>
              <span>Name: </span>
              {user.nameOfUser}
            </div>
            <div>
              <span>Phone number: </span>
              {user.phoneNumber}
            </div>
            <div>
              <span>E-mail: </span>
              {user.email}
            </div>
            <button
              onClick={this.deleteUser}
              className="button-user"
              id={user._id}
            >
              Delete User
            </button>
          </div>
        ))}
      </section>
    );
  }
}

export default AllUsers;
