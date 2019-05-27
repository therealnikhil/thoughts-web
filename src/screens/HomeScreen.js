import React, { useState } from "react";
import { modules } from "../utils.js";
import Navbar from "../components/NavBar.js";
import ThoughtListScreen from "./ThoughtListScreen.js";
import HappyThoughtsScreen from "./HappyThoughtsScreen.js";
import HabitsScreen from "./HabitsScreen.js";

export default function HomeScreen() {
  const [ mod, setMod ] = useState(modules.HAPPYTHOUGHTS);
  const getCurrentPage = () => {
    switch (mod) {
      case modules.THOUGHTLIST:
        return "journal";
      case modules.HAPPYTHOUGHTS:
        return "happy";
      case modules.HABITS:
        return "habits";
      default:
        return "logout";
    }
  };

  return (
    <div>
      <Navbar
        homeHandler={ () => setMod(modules.THOUGHTLIST) }
        happyThoughtsHandler={ () => setMod(modules.HAPPYTHOUGHTS) }
        habitsHandler={ () => setMod(modules.HABITS) }
        purple={ mod !== modules.HAPPYTHOUGHTS }
        active={ getCurrentPage() }
      />
      { (mod === modules.THOUGHTLIST) && <ThoughtListScreen /> }
      { (mod === modules.HAPPYTHOUGHTS) && <HappyThoughtsScreen /> }
      { (mod === modules.HABITS) && <HabitsScreen /> }
    </div>
  );
}