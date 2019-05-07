import React, { Component } from "react"
import moment from "moment"
import { MOODS } from "./constants"
import Navbar from "./Navbar"
import "./css/ThoughtScreen.css"
import Bg0 from "./assets/bg-0.jpg"
import Bg1 from "./assets/bg-1.jpg"
import Bg2 from "./assets/bg-2.jpg"
import Bg3 from "./assets/bg-3.jpg"

const NUM_IMAGES = 4

class ThoughtScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      thoughts: [],
      happyThoughts: [],
      newThoughtTitle: "",
      newThoughtMood: -1,
      isHome: true,
      randomIndex: -1
    }
    this.onChange = this.onChange.bind(this)
    this.setMood = this.setMood.bind(this)
    this.createThought = this.createThought.bind(this)
    this.goToHappyThoughts = this.goToHappyThoughts.bind(this)
    this.goToHome = this.goToHome.bind(this)
    this.getRandomIndex = this.getRandomIndex.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    if (this.state.isHome) {
      fetch("https://happy-thoughts-api.herokuapp.com/thoughts/" + localStorage.getItem("uid"), { mode: "cors" })
        .then(resp => resp.json())
        .then(data => {
          this.setState({ thoughts: data })
        })
    } else {
      fetch("https://happy-thoughts-api.herokuapp.com/thoughts/" + localStorage.getItem("uid") + "?mood=7", { mode: "cors" })
        .then(resp => resp.json())
        .then(data => {
          this.setState({ happyThoughts: data }, () => {
            this.getRandomIndex()
          })
        })
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  setMood(mood) {
    this.setState({ newThoughtMood: mood })
  }
  createThought() {
    fetch("https://happy-thoughts-api.herokuapp.com/thoughts/" + localStorage.getItem("uid"), {
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
  goToHappyThoughts() {
    this.setState({
      isHome: false
    }, () => {
      this.fetchData()
    })
  }
  goToHome() {
    this.setState({
      isHome: true
    }, () => {
      this.fetchData()
    })
  }
  getRandomIndex() {
    let ind = 0
    do {
      ind = Math.floor(Math.random() * this.state.happyThoughts.length)
    } while (ind === this.state.randomIndex)
    console.log(ind)
    this.setState({
      randomIndex: ind
    })
  }
  render() {
    const { thoughts, happyThoughts, newThoughtTitle, newThoughtMood, isHome, randomIndex } = this.state
    const images = [Bg0, Bg1, Bg2, Bg3]
    return (
      <div>
        <Navbar homeHandler={this.goToHome} happyThoughtsHandler={this.goToHappyThoughts} />
        {isHome ?
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
          </div> :
          <div className="image-bg" style={{ backgroundImage: `url(${images[randomIndex % NUM_IMAGES]})` }}>
            <div className="filter-bg">
              {randomIndex !== -1 && happyThoughts.length > 0 ?
                <div style={{ maxWidth: 970 }}>
                  <p className="bg-title">{happyThoughts[randomIndex].title}</p>
                  <p className="bg-text">~ {moment(happyThoughts[randomIndex].time).format("MMMM Do YYYY, h:mm:ss a")}</p>
                  <div className="shuffle" onClick={this.getRandomIndex} />
                </div> :
                <p className="bg-title">Start logging happy thoughts to see them and reminisce here.</p>
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ThoughtScreen
