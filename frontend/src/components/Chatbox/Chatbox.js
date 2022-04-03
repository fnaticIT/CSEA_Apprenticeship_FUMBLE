import { Box } from "@chakra-ui/layout";
import "../styles.css";
import SingleChat from "../SingleChat/SingleChat";
import { ChatState } from "../../Context/ChatProvider";
import { useEffect } from "react";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  
  return (
    <Box d={{ base: selectedChat ? "flex" : "none", md: selectedChat ? "flex" : "none" }} alignItems="center" flexDir="column" p={3} bg="darkslateblue" w={{ base: "100%", md: "68%" }} borderRadius="lg" borderWidth="1px">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
