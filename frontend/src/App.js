import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import Match from "./Pages/Match";
import Mainpage from "./Pages/Mainpage";
import Intro from "./Pages/Intro";
import Forum from "./Pages/Forum";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ChatState } from "./Context/ChatProvider";
import Face from "./components/FaceRecog/Face";
import Chatbox from "./components/Chatbox/Chatbox";
import { useState } from "react";
import Stats from "./Pages/Stats";
function App() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="App">
      <Route path="/" component={Intro} exact />
      <Route exact path="/main">
        {user ? <Mainpage /> : <Homepage />}
      </Route>
      <Route path="/chats" component={Chatpage} exact />
      <Route path="/match" component={Match} exact />
      <Route path="/forums" component={Forum} exact />
      <Route path="/face" component={Face} exact />
      <Route path="/stat" component={Stats} />
      <Route path="/chatbox" exact>
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Route>
    </div>
  );
}

export default App;
