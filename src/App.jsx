import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ApplicationViews } from "./ApplicationViews";
import { useParams } from "react-router-dom";

function App() {
  return (
    <div className="app-div">
      <div className="app-main">
        <ApplicationViews />
      </div>
    </div>
  );
}

export default App;
