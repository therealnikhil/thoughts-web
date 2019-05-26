import React, { useState } from "react";
import "../css/LoginScreen.css";

function fetchUser(e) {
  e.preventDefault();
}

export default function LandingScreen() {

  return (
    <div className="bg-wrapper">
      <div className="dim-wrapper">
        <div className="content-wrapper">
          <h1>
            Welcome to <span className="purp-text">Thoughts</span>
          </h1>
        </div>
      </div>
    </div>
  );
}