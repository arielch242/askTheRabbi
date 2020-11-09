import { Component } from "react";
import userService from "../services/userService";

class Logout extends Component {
  componentDidMount() {
    userService.logout();   // same function for user and author
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
