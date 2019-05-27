import React from "react";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import { user, updateLoginStatus } from "./utils.js";
import "./App.css";

function App() {
  updateLoginStatus();
  if (user) {
    return <HomeScreen />;
  }
  return <LoginScreen />;
}

export default App;
