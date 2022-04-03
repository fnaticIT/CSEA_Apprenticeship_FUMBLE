import { Box, Stack, Text } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatLoading from "../ChatLoading/ChatLoading";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { Image, Badge, Flex, Spacer } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import img from "./group_img.png"
import io from "socket.io-client";
var socket;
const MyForum = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [count, setCount] = useState(0);
  const toast = useToast();
  const [t, sett] = useState(0);

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("count", ({ cnt }) => {
      setCount(cnt);
      console.log(cnt);
    });
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    if (t < 5) {
      console.log(t);
      sett(t + 1);
    }
  }, [t]);

  const fetchChats = async () => {
    console.log(user);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat/all", config);
      setChats(data);
    } catch (error) {}
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const add = async (chat, chatId, userId) => {
    const user = {
      chatId: chatId,
      userId: userId,
    };
    console.log(user);
    try {
      await axios.put("/api/chat/groupadd/" + chatId + "/" + userId);
      document.getElementById("c").click();
      window.scrollTo(0, 0);
      toast({
        title: "Success!",
        description: "Group Joined",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-center",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {chats ? (
        <div style={{ display: "flex", flexWrap: "wrap", margin: "auto" }}>
          {chats.map(
            (chat) =>
              chat.isGroupChat && (
                <Box w="250px" maxHeight="450px" m="40px" rounded="20px" overflow="hidden" mt={10} cursor="pointer" bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"} key={chat._id}>
                  <Box id="c" w="250px" maxHeight="450px" rounded="20px" overflow="hidden" onClick={() => setSelectedChat(chat)} cursor="pointer" bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"} color={selectedChat === chat ? "white" : "black"} key={chat._id}>
                    <Image p="20px" m="auto" src={img} alt="Card Image" w="180px" h="180px"></Image>
                    <Box p={4}>
                      <Stack align="center">
                        <Badge variant="solid" colorScheme="green" rounded="full" px={2}>
                          {chat.chatName}
                        </Badge>
                      </Stack>
                      <Stack align="center">
                        <Text as="h2" fontWeight="normal" my={2}>
                          Forum for loren ipsum
                        </Text>
                        <Text fontWeight="light">A platform for students to study CSE concepts.</Text>
                      </Stack>
                    </Box>
                  </Box>
                  <Flex m={3}>
                    <Spacer />
                    {!chat.users.includes(user._id) && (
                      <Button
                        variant="solid"
                        colorScheme="purple"
                        size="sm"
                        mr={2}
                        onClick={() => {
                          add(chat, user._id, chat._id);
                        }}
                      >
                        Join
                      </Button>
                    )}
                    {
                      chat.users.includes(user._id) && (
                      <Button
                        variant="solid"
                        colorScheme="yellow"
                        size="sm"
                        mr={25}
                        onClick={() => {
                          add(chat, user._id, chat._id);
                        }}
                      >
                        Joined
                      </Button>)
                    }
                    <Button variant="solid" colorScheme="green" size="sm">
                      {chat.users.length}
                    </Button>
                  </Flex>
                </Box>
              )
          )}
        </div>
      ) : (
        <ChatLoading />
      )}
    </>
  );
};

export default MyForum;
