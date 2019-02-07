import React, { Component } from "react"
import moment from "moment"
import { MOODS } from "./constants"
import "./css/ThoughtScreen.css"

class ThoughtScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      thoughts: [],
      newThoughtTitle: "",
      newThoughtMood: -1
    }
    this.onChange = this.onChange.bind(this)
    this.setMood = this.setMood.bind(this)
    this.createThought = this.createThought.bind(this)
  }
  componentDidMount() {
    fetch("http://localhost:4000/thoughts", { mode: "cors" })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ thoughts: data })
      })
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  setMood(mood) {
    this.setState({ newThoughtMood: mood })
  }
  createThought() {
    fetch("http://localhost:4000/thoughts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "Access-Control-Request-Headers": "Content-Type",
        "Access-Control-Request-Method": "POST"
      },
      body: JSON.stringify({
        title: this.state.newThoughtTitle,
        mood: this.state.newThoughtMood,
        time: new Date().getTime()
      })
    }).then(result => console.log(result))

    this.setState({
      thoughts: [
        {
          id: this.state.thoughts.length + 1,
          title: this.state.newThoughtTitle,
          mood: this.state.newThoughtMood,
          time: new Date().getTime()
        },
        ...this.state.thoughts
      ],
      newThoughtTitle: "",
      newThoughtMood: -1
    })
  }
  render() {
    const { thoughts, newThoughtTitle, newThoughtMood } = this.state
    return (
      <div>
        <div className="create-thought-bg">
          <div className="create-thought-box">
            <h2 className="create-thought-heading">Add Thought</h2>
            <div className="create-thought-wrapper">
              <textarea
                name="newThoughtTitle"
                value={newThoughtTitle}
                onChange={this.onChange}
                placeholder="Thought"
                className="thought-input"
              />
            </div>
            <h3 className="create-thought-heading padded">Mood</h3>
            <div className="moods">
              {Object.keys(MOODS).map((key, index) => {
                return (
                  <div
                    className={
                      newThoughtMood === key
                        ? "mood-wrapper clicked"
                        : "mood-wrapper"
                    }
                    onClick={() => this.setMood(key)}
                    key={index}
                  >
                    <div className={"mood-" + key + "-img"} />
                    <p>{MOODS[key]}</p>
                  </div>
                )
              })}
            </div>
            <div className="create-btn" onClick={this.createThought}>
              Create
            </div>
          </div>
        </div>
        <h1 className="thoughts-heading">My Thoughts</h1>
        {thoughts.map(thought => {
          return (
            <div className={"thought-box-" + thought.mood} key={thought._id}>
              <h2 className="thought-title">{thought.title}</h2>
              <div className="thought-details">
                <span>
                  {moment(thought.time).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
                <span>{MOODS[thought.mood]}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ThoughtScreen
