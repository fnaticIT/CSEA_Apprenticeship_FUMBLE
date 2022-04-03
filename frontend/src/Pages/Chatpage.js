import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox/Chatbox";
import MyChats from "../components/MyChats/MyChats";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import io from "socket.io-client";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/spinner";
var socket;

const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
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
          {user && <SideDrawer />}
          <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
          </Box>
        </>
      )}
    </div>
  );
};

export default Chatpage;
