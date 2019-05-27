import React from "react";
import { updateLoginStatus } from "../utils.js";
import "../css/Navbar.css";

function logout() {
  localStorage.setItem("uid", "");
  updateLoginStatus();
  window.location.reload();
}

export default function NavBar({ homeHandler, happyThoughtsHandler, habitsHandler, purple, active }) {
  return (
    <div className="top-container" style={purple ? {} : { background: "none" }}>
      <span
        className={ active === "journal" ? "active" : "inactive" }
        onClick={homeHandler}
      >
        Journal
      </span>
      <span
        className={ active === "happy" ? "active" : "inactive" }
        onClick={happyThoughtsHandler}
      >
        Happy Thoughts
      </span>
      <span
        className={ active === "habits" ? "active" : "inactive" }
        onClick={habitsHandler}
      >
        Habits
      </span>
      <span
        onClick={logout}
      >
        Logout
      </span>
    </div>
  )
}