import React from "react";
import img1 from "../images/img3.jpg";
import img2 from "../images/img4.jpg";
import "./Intro.css";
import { useHistory } from "react-router";
import { ChatState } from "../Context/ChatProvider";
import  Typewriter  from "typewriter-effect";

function Intro() {
  const [img, setImg] = React.useState(img1);
  const images = [img1, img2];
  const history = useHistory();
  const { user } = ChatState();
  React.useEffect(() => {
    let cnt = 0;
    const interval = setInterval(() => {
      console.log("hello");
      if (cnt == 2) {
        cnt = 0;
      }
      setImg(images[cnt]);
      cnt++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <img src={img} style={{ height: "100%", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></img>
      <div className="centered">
        <Typewriter
          onInit={(typewriter) => {
            typewriter

              .typeString("Welcome to Fumble")

              .pauseFor(1000)
              .deleteAll()
              .typeString("A place to value your mental health !")
              .start();
          }}
        />
      </div>

      <button
        onClick={() => {
          history.replace("/main");
        }}
        className="centerb"
        style={{ padding: "10px", position: "absolute", height: "80px", width: "250px", color: "purple", borderWidth: 2, fontSize: "25px", color: "white" }}
      >
        Enter community
      </button>
    </div>
  );
}

export default Intro;
