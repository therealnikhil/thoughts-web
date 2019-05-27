import React, { useState } from "react";
import "../css/LoginScreen.css";

export default function LoginScreen() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ password2, setPassword2 ] = useState("");
  const [ isLogin, setIsLogin ] = useState(true);
  const [ errMsg, setErrMsg ] = useState("");

  function validEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function fetchUser(e) {
    setErrMsg("");
    e.preventDefault();
    if (!isLogin && password !== password2) {
      setErrMsg("Error: password fields don't match")
    } else if (!validEmail(email)) {
      setErrMsg("Error: Please provide a valid email");
    } else if (isLogin) {
      fetch("https://happy-thoughts-api.herokuapp.com/users?email=" + email + "&password=" + password, {
        mode: "cors"
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.error) {
            setErrMsg("Error: " + data.error);
          } else {
            localStorage.setItem("uid", data._id);
            window.location.reload();
          }
        })
        .catch(error => console.error(error));
    } else {
      fetch("https://happy-thoughts-api.herokuapp.com/users", {
        method: "POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "Content-Type",
          "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          setErrMsg("Error: " + data.error);
        } else {
          localStorage.setItem("uid", data.createdUser.id)
          window.location.reload()
        }
      })
      .catch(error => console.error(error));
    }
  }

  return (
    <div className="bg-wrapper">
      <img
        className="bg"
        src={require("../assets/bg-0.jpg")}
        style={{
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        }}
        alt="background nature wallpaper"
      />
      <div className="content-wrapper">
        <h1 id="welcome-heading">
          <span style={{ color: "#000" }}>Welcome to </span>
          Happy<span className="purp-text">Thoughts</span>
        </h1>
        {
          errMsg && <p style={{
            color: "var(--angry-color)",
            textAlign: "center",
            maxWidth: document.getElementById("welcome-heading").clientWidth
          }}>{errMsg}</p>
        }
        <form className="login-form" onSubmit={ e => fetchUser(e) }>
          <input
            className="email-field"
            name="email"
            placeholder="Email"
            autoComplete="username"
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />
          <input
            className="pwd-field"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={ e => setPassword(e.target.value) }
          />
          {!isLogin && (
            <input
              className="pwd-field"
              name="password2"
              placeholder="Confirm Password"
              autoComplete="new-password"
              type="password"
              value={password2}
              onChange={ e => setPassword2(e.target.value) }
            />
          )}
          <button className="login-btn" type="submit">
            {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
          </button>
        </form>
        <p className="anchor-p" onClick={() => { setIsLogin(!isLogin) }}>
          {isLogin ? "Create an Account" : "Login"}
        </p>
      </div>
    </div>
  );
}