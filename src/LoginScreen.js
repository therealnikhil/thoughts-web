import React, { Component } from "react"
import "./css/LoginScreen.css"

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      email: "",
      password: "",
      password2: "",
      errorMsg: ""
    }
    this.fetchUser = this.fetchUser.bind(this)
    this.navToCreateAccount = this.navToCreateAccount.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validEmail = this.validEmail.bind(this)
  }
  fetchUser(e) {
    e.preventDefault()
    if (this.state.isLogin) {
      fetch("http://localhost:4000/users?email=" + this.state.email + "&password=" + this.state.password, {
        mode: "cors"
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data._id)
          localStorage.setItem("uid", data._id)
          window.location.reload()
        })
    } else {
      let error = ""
      if (this.state.password !== this.state.password2) {
        error = "Password fields don't match"
      } else if (!this.validEmail(this.state.email)) {
        error = "Invalid Email"
      } else {
        fetch("http://localhost:4000/users", {
          method: "POST",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Headers": "Content-Type",
            "Access-Control-Request-Method": "POST"
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
            localStorage.setItem("uid", data.createdUser.id)
            window.location.reload()
          })
      }
      this.setState({
        errorMsg: error
      })
    }
  }
  validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  navToCreateAccount() {
    this.setState({
      isLogin: !this.state.isLogin,
      email: "",
      password: "",
      password2: ""
    })
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { isLogin, email, password, password2, errorMsg } = this.state
    return (
      <div className="bg-wrapper">
        <div className="dim-wrapper">
          <div className="content-wrapper">
            <h1>
              Welcome to <span className="purp-text">Thoughts</span>
            </h1>
            {errorMsg && <p>{errorMsg}</p>}
            <form className="login-form" onSubmit={this.fetchUser}>
              <input
                className="email-field"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.onChange}
              />
              <input
                className="pwd-field"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={this.onChange}
              />
              {!isLogin && (
                <input
                  className="pwd-field"
                  name="password2"
                  placeholder="Confirm Password"
                  type="password"
                  value={password2}
                  onChange={this.onChange}
                />
              )}
              <button className="login-btn" type="submit">
                {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
              </button>
            </form>
            <p className="anchor-p" onClick={this.navToCreateAccount}>
              {isLogin ? "Create an Account" : "Login"}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginScreen
