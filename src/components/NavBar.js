import React, { useState } from "react";
import MediaQuery from "react-responsive";
import { updateLoginStatus } from "../utils.js";
import "../css/Navbar.css";

function logout() {
  localStorage.setItem("uid", "");
  updateLoginStatus();
  window.location.reload();
}

export default function NavBar({
  homeHandler,
  happyThoughtsHandler,
  habitsHandler,
  insightsHandler,
  resourcesHandler,
  purple,
  active
}) {
  const [ showMenuMobile, setShowMenuMobile ] = useState(false);

  return (
    <div className="top-container" style={purple ? {} : { background: "none" }}>
      <MediaQuery query="(min-width: 768px)">
        <span
          className={ "nav-item " + (active === "journal" ? "active" : "inactive") }
          onClick={homeHandler}
        >
          Journal
        </span>
        <span
          className={ "nav-item " + (active === "happy" ? "active" : "inactive") }
          onClick={happyThoughtsHandler}
        >
          Happy Thoughts
        </span>
        <span
          className={ "nav-item " + (active === "habits" ? "active" : "inactive") }
          onClick={habitsHandler}
        >
          Habits
        </span>
        <span
          className={ "nav-item " + (active === "insights" ? "active" : "inactive") }
          onClick={insightsHandler}
        >
          Insights
        </span>
        <span
          className={ "nav-item " + (active === "resources" ? "active" : "inactive") }
          onClick={resourcesHandler}
        >
          Resources
        </span>
        <span
          className="nav-item"
          onClick={logout}
        >
          Logout
        </span>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <img
          className="menu-icon"
          src={require("../assets/hamburger.png")}
          alt="menu button"
          onClick={() => setShowMenuMobile(!showMenuMobile)}
        />
        <span className="website-name">
          <span style={{ color: "var(--main-green-color)" }}>HappyThoughts</span>.app
        </span>
      </MediaQuery>
    </div>
  )
}