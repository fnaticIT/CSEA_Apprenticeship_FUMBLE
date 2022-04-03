import React, { useState } from "react";
import { loadModels } from "./helpers/faceApi";
import { createFaLibrary } from "./helpers/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "react-switch";
import Camera from "./components/Camera/Camera";
import Navbars from "../../components/Navbar/Navbar";
import "./Face.css";
createFaLibrary();
loadModels();
function Face() {
  const [mode, setMode] = useState(false); //true = photo mode; false = video mode

  return (
    <div className="Appx">
      <div className="topx">
        <Navbars />
      </div>    
      <header style={{marginTop:"100px"}}>
        <div className="Appx__header">
          <div className="Appx__switcher" style={{border:4,borderWidth:10}}>
            <FontAwesomeIcon icon="camera" color={mode ? "#007c6c" : "#cccccc"} style={{marginRight:"40px"}}/>
            <Switch onChange={() => setMode(!mode)} uncheckedIcon={false} checkedIcon={false} checked={!mode} className="Appx__switcher-switch" />
            <FontAwesomeIcon icon="video" color={!mode ? "#007c6c" : "#cccccc"} />
          </div>
        </div>
      </header>
      <Camera photoMode={mode} />
    </div>
  );
}

export default Face;
