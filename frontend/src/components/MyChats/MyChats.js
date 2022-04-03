// import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../../config/ChatLogics";
import ChatLoading from "../ChatLoading/ChatLoading";
// import GroupChatModal from "./modal/GroupChatModal";
// import { Button } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import io from "socket.io-client";
var socket;
const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [count, setCount] = useState(0);
  //const [t, sett] = useState(0);
  const toast = useToast();
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("count", ({ cnt }) => {
      setCount(cnt);
      console.log(cnt);
    });
    //sett(t);
  }, []);
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const handle = async (chat) => {
    console.log(chat._id);

    const con = chat._id;
    try {
      await axios.delete("/api/chat/del/" + con);
    } catch (error) {
      console.log(error);
    }
    fetchChats();
  };

  return (
    <Box d={{ base: selectedChat ? "none" : "flex", md: "flex" }} flexDir="column" alignItems="center" p={3} bg="darkslateblue" w={{ base: "100%", md: "31%" }} borderRadius="lg" borderWidth="1px">
      <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" d="flex" w="100%" justifyContent="space-between" alignItems="center">
        Ongoing Sessions
        {/* <GroupChatModal>
          <Button d="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }} rightIcon={<AddIcon />}>
            New Group Chat
          </Button>
        </GroupChatModal> */}
      </Box>
      <Box d="flex" flexDir="column" p={3} bg="black" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map(
              (chat) =>
                (Math.floor((time - new Date(chat.createdAt)) / (1000 * 60)) < 19 ? true : false) && (
                  <Box onClick={() => setSelectedChat(chat)} cursor="pointer" bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"} color={selectedChat === chat ? "white" : "black"} px={3} py={2} borderRadius="lg" key={chat._id}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}</Text>
                      {/* <Text>{!chat.isGroupChat ? null : chat.users.length}</Text>
                      <Text>{count}</Text> */}
                    </div>
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        <b>{chat.latestMessage.sender.name} : </b>
                        {chat.latestMessage.content.length > 50 ? chat.latestMessage.content.substring(0, 51) + "..." : chat.latestMessage.content}
                      </Text>
                    )}
                  </Box>
                )
            )}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
      <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" d="flex" w="100%" justifyContent="space-between" alignItems="center">
        Past Sessions
      </Box>
      <Box d="flex" flexDir="column" p={3} bg="black" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
        {chats ? (
          <div style={{ overflowY: "scroll" }}>
            <Stack overflowY="scroll">
              {chats.map(
                (chat) =>
                (Math.floor((time - new Date(chat.createdAt)) / (1000 * 60)) > 19 ? true : false) && (
                    <Box onClick={() => setSelectedChat(chat)} cursor="pointer" bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"} color={selectedChat === chat ? "white" : "black"} px={3} py={2} borderRadius="lg" key={chat._id}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}</Text>
                        {/* <Text>{!chat.isGroupChat ? null : chat.users.length}</Text>
                      <Text>{count}</Text> */}
                        <Button
                          color="gray.400"
                          onClick={() => {
                            handle(chat);
                          }}
                        >
                          {" "}
                          Delete
                        </Button>
                      </div>
                     
                    </Box>
                  )
              )}
            </Stack>
          </div>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
