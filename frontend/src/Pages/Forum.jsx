import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox/Chatbox";
//import MyChats from "../components/MyChats";
//import SideDrawer from "../components/modal/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import io from "socket.io-client";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/spinner";
import MyForum from "../components/MyForum/MyForum";
import Navbars from "../components/Navbar/Navbar";
var socket;

const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
const Forum = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const [f, setF] = useState(1);
  useEffect(() => {
    socket = io(ENDPOINT);
    if (user != null) {
      socket.emit("joined", user);
    }
    if (user != null) {
      return () => {
        socket.emit("disconnect", user);
      };
    }
  }, [user]);
  return (
    <div style={{ width: "100%" }}>
      {!user ? (
        <Spinner size="xl" />
      ) : (
        <>
          {user && (
            <div className="topx">
              <Navbars />
            </div>
          )}
          <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" mt="50px" flexDirection={{ base: "column", md: "row" }}>
            {user && <MyForum fetchAgain={fetchAgain} />}
            {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} f={f} setF={setF} />}
          </Box>
        </>
      )}
    </div>
  );
};

export default Forum;
