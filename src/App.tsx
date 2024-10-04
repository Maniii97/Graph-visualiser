/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import GraphInput from "./components/GraphInput";
import GraphVisualization from "./components/GraphVisualization";
import { IoIosSunny } from "react-icons/io";
import { IoCloudyNight } from "react-icons/io5";

import "./App.css";

const App: React.FC = () => {
  const [graphData, setGraphData] = useState<any | null>(null);
  const [inputType, setInpType] = useState<string>("adjMatrix");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const resetGraph = () => {
    setGraphData(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const graphOptions = isDarkMode ? "dark" : "light";

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="app-header">
        <h1>Graph Visualizer</h1>
        <button className="darkButton" onClick={toggleDarkMode}>
          {isDarkMode ? <IoIosSunny /> : <IoCloudyNight/>}
        </button>
      </header>

      <div className="main-content">
        <div className="input-section">
          <h2>Graph Input</h2>
          <GraphInput setGraphData={setGraphData} setInpType={setInpType} resetGraph={resetGraph}/>
        </div>
        <div className="graph-section">
          <h2>Graph Visualization</h2>
          <GraphVisualization graphData={graphData} inputType={inputType} graphOptions = {graphOptions}/>
        </div>
      </div>

      <footer className="app-footer">
      Made with ❤️ and ☕ by <a style={{textDecoration : "underline"}} href="https://www.github.com/Maniii97/"> Mani</a>
      </footer>
    </div>
  );
};

export default App;
