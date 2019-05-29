import React, { useState, useEffect } from "react";
import { moods, user } from "../utils.js";
import moment from "moment";
import "../css/ThoughtListScreen.css";

export default function ThoughtListScreen() {
  const [ newThoughtTitle, setNewThoughtTitle ] = useState("");
  const [ newThoughtMood, setNewThoughtMood ] = useState(-1);
  const [ thoughts, setThoughts ] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(
      "https://happy-thoughts-api.herokuapp.com/thoughts/" + user, {
        mode: "cors",
        signal: abortController.signal
      })
      .then(resp => resp.json())
      .then(data => setThoughts(data))
      .catch(error => {
        if (error.name !== "AbortError") {
          console.error(error.message);
        }
      });

    return function cleanup() {
      abortController.abort();
    };
  });

  function updateDb(obj) {
    fetch("https://happy-thoughts-api.herokuapp.com/thoughts/" + user, {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Origin": window.location.href,
        "Access-Control-Request-Headers": "Content-Type",
        "Access-Control-Request-Method": "POST"
      },
      body: JSON.stringify(obj)
    }).then(result => console.log(result));
  }

  function createThought() {
    if (newThoughtMood === -1) {
      alert("Please enter a mood for your thought.");
    } else if (newThoughtTitle === "") {
      alert("Cannot log an empty thought. Please enter some text for your thought");
    } else {
      const newThoughtObj = {
        title: newThoughtTitle,
        mood: newThoughtMood,
        time: moment().valueOf()
      };
      updateDb(newThoughtObj);
      setNewThoughtTitle("");
      setNewThoughtMood(-1);
    }
  }

  function getLabelJSX(text) {
    return (
      <p className="date-label-wrapper">
        <span className="date-label">{text}</span>
      </p>
    );
  }

  function getLabels() {
    let currentThought = null;
    let currentScope = "day";
    let labels = [];
    labels = thoughts.map((thought, i) => {
      let labelText = "";
      if (!currentThought || !moment(currentThought.time).isSame(thought.time, currentScope)) {
        currentThought = thought;
        if (moment(thought.time).isSame(moment(), "day")) {
          labelText = "TODAY";
        } else if (moment(thought.time).isSame(moment().subtract(1, "day"), "day")) {
          labelText = "YESTERDAY";
        } else if (moment(thought.time).isSame(moment(), "month")) {
          labelText = "THIS MONTH";
          currentScope = "month";
        } else {
          labelText = moment(thought.time).format("MMMM YYYY").toUpperCase();
          currentScope = "month";
        }
      }
      return labelText;
    });
    return labels;
  };

  let labels = getLabels();

  return (
    <div>
      <div className="create-thought-bg">
        <h1 style={{ color: "var(--light-green-color)" }}>
          Log Thought
        </h1>
        <div className="create-thought-box container">
          <div className="create-thought-wrapper">
            <textarea
              name="newThoughtTitle"
              value={newThoughtTitle}
              onChange={(e) => setNewThoughtTitle(e.target.value)}
              placeholder="Enter your thought here..."
              className="thought-input"
            />
          </div>
          <h3 className="create-thought-subheading padded">Mood</h3>
          <div className="moods">
            {Object.keys(moods).map((key, index) => {
              return (
                <div
                  className={
                    newThoughtMood === key
                      ? "mood-wrapper clicked"
                      : "mood-wrapper"
                  }
                  onClick={() => setNewThoughtMood(key)}
                  key={index}
                >
                  <div className={"mood-" + key + "-img"} />
                  <p className="middle-text">{moods[key]}</p>
                </div>
              )
            })}
          </div>
          <div className="create-btn middle-text" onClick={createThought}>
            Log Thought
          </div>
        </div>
      </div>
      <h1>My Thoughts</h1>
      {thoughts.map((thought, i) => {
        return (
          <div key={i}>
            { labels[i] && getLabelJSX(labels[i]) }
            <div className="container">
              <div className={"thought-box-" + thought.mood} key={thought._id}>
                <h2 className="thought-title">{thought.title}</h2>
                <div className="thought-details">
                  <span>
                    {moment(thought.time).format("MMMM Do YYYY, h:mm:ss a")}
                  </span>
                  <span>{moods[thought.mood]}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}