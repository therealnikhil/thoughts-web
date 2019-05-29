import React, { useState } from "react";
import { modules } from "../utils.js";
import Navbar from "../components/NavBar.js";
import ThoughtListScreen from "./ThoughtListScreen.js";
import HappyThoughtsScreen from "./HappyThoughtsScreen.js";
import HabitsScreen from "./HabitsScreen.js";
import InsightsScreen from "./InsightsScreen.js";
import ResourcesScreen from "./ResourcesScreen.js";

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
      case modules.INSIGHTS:
        return "insights";
      case modules.RESOURCES:
        return "resources";
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
        insightsHandler={ () => setMod(modules.INSIGHTS) }
        resourcesHandler={ () => setMod(modules.RESOURCES) }
        purple={ mod !== modules.HAPPYTHOUGHTS }
        active={ getCurrentPage() }
      />
      { (mod === modules.THOUGHTLIST) && <ThoughtListScreen /> }
      { (mod === modules.HAPPYTHOUGHTS) && <HappyThoughtsScreen /> }
      { (mod === modules.HABITS) && <HabitsScreen /> }
      { (mod === modules.INSIGHTS) && <InsightsScreen /> }
      { (mod === modules.RESOURCES) && <ResourcesScreen /> }
    </div>
  );
}