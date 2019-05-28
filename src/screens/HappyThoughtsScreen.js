import React, { useState, useEffect } from "react";
import { user, bgCount } from "../utils.js";
import moment from "moment";
import "../css/HappyThoughtsScreen.css";

export default function HappyThoughtsScreen() {
  const [ randomIndex, setRandomIndex ] = useState(-1);
  const [ randomImgIndex, setRandomImgIndex ] = useState(getRandomIndex(0, bgCount));
  const [ happyThoughts, setHappyThoughts ] = useState([]);

  function getRandomIndex(current, max) {
    return Number(function() {
      let ret = current;
      while (ret === current) {
        ret = Math.floor(Math.random() * max);
      }
      return ret;
    }());
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetch(
      "https://happy-thoughts-api.herokuapp.com/thoughts/" + user + "?mood=7", {
        mode: "cors",
        signal: abortController.signal
      })
      .then(resp => resp.json())
      .then(data => {
        setHappyThoughts(data);
        if (data.toString() !== happyThoughts.toString()) {
          setRandomIndex(getRandomIndex(randomIndex, data.length));
        }
        if (data.length === 0) {
          setRandomIndex(NaN);
        }
      })
      .catch(error => {
        if (error.name !== "AbortError") {
          console.error(error.message);
        }
      });

    return function cleanup() {
      abortController.abort();
    }
  });

  function shuffle() {
    setRandomIndex(getRandomIndex(randomIndex, happyThoughts.length));
    setRandomImgIndex(getRandomIndex(randomImgIndex, bgCount));
  }

  return (
    <div className="filter-bg">
      <img
        className="image-bg"
        alt="naturesque wallpaper"
        src={require(`../assets/bg-${randomImgIndex}.jpg`)}
        style={{
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        }}
      />
      {
        randomIndex !== -1 && happyThoughts.length > 0 &&
        <div style={{ maxWidth: 970 }}>
          <p className="bg-title">
            {happyThoughts[randomIndex].title}
          </p>
          <p className="bg-text">
            ~ {moment(happyThoughts[randomIndex].time).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
          <div className="shuffle" onClick={shuffle} />
        </div>
      }
      <div className="gear" />
      {
        isNaN(randomIndex) && happyThoughts.length === 0 &&
        <p className="bg-title">Start logging happy thoughts in your journal to see them and reminisce here.</p>
      }
    </div>
  );
}