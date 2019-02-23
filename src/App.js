import React, { Component } from "react"
import ThoughtScreen from "./ThoughtScreen"
import LoginScreen from "./LoginScreen"
import "./App.css"

class App extends Component {
  render() {
    let user = localStorage.getItem("uid")
    return (
      <div className="App">
        {user ? <ThoughtScreen /> : <LoginScreen />}
      </div>
    )
  }
}

export default App
