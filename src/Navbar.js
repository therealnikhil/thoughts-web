import React, { Component } from "react"
import "./css/Navbar.css"

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    localStorage.setItem("uid", "")
    window.location.reload()
  }
  render() {
    return (
      <div className="top-container">
        <span onClick={this.props.homeHandler}>Home</span>
        <span onClick={this.props.happyThoughtsHandler}>Happy Thoughts</span>
        <span onClick={this.logout}>Logout</span>
      </div>
    )
  }
}

export default Navbar