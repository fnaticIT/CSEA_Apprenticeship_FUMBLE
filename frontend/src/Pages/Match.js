import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, Container } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
//import { Menu, MenuButton } from "@chakra-ui/menu";
import { Spinner } from "@chakra-ui/spinner";
import { useHistory } from "react-router-dom";
import { Button, Box, Fade, ScaleFade, Slide, SlideFade, useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Navbars from "./../components/Navbar/Navbar";
import { Select } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/layout";
import ChatLoading from "../components/ChatLoading/ChatLoading";
//import ChatLoading from "../ChatLoading/ChatLoading";
//import { Button } from "@chakra-ui/react";
function Match() {
  const { isOpen, onToggle } = useDisclosure();
  const { setSelectedChat, user, chats, setChats, selectedChat } = ChatState();
  const [userlist, setUserlist] = React.useState([]);
  const [userid, setUserid] = React.useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    
    if (chats) {
      console.log(count);
      chats.map((chat) => (Math.floor((time - new Date(chat.createdAt)) / (1000 * 60)) < 19 ? true : false) && setCount(1));
    }
  }, [time]);
  useEffect(async () => {
    const data = await axios.get("/api/user/all", user);
    setUserlist(data.data);
    setUserid(
      data.data.map((u) => {
        if (true) {
          return u._id;
        }
      })
    );
  }, [setUserlist, setUserid]);
  const accessChat = async () => {
    var str;
    console.log("CLICK");
    const userId = userid[Math.floor(Math.random() * userid.length)];
    console.log(userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const data1 = await axios.post(`/api/chat`, { userId }, config);
      setSelectedChat(data1.data);
      console.log(data1);

      str = data1.data.users[1].name;
      console.log(selectedChat);
      console.log(str);

      if (!chats.find((c) => c._id === data1.data._id)) {
        setChats([data1, ...chats]);
      }

      console.log(selectedChat);
      console.log(str);
    } catch (error) {}

    setTimeout(() => {
      toast({
        title: "You are matched with " + str,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      history.push("/chats");
    }, 5000);
  };

  return (
    <div>
      <Navbars />
      <Container
        display="flex"
        flexDirection="row"
        bg="blackAlpha.900"
        position="absolute"
        justifyContent={["space-between", "space-between", "space-between", "space-between"]}
        top="10%"
        margin="auto"
        left="0"
        right="0"
        minH={40}
        maxW="100%"
        p="14"
        width={[
          "100%", // 0-30em
          "100%", // 30em-48em
          "100%", // 48em-62em
          "100%", // 62em+
        ]}
      >
        <Box maxW="40%" mr={20}>
          <Text mr={20} fontSize="3xl">
            SELECT CATEGORY
          </Text>
        </Box>
        <Select placeholder="Select category" maxW="40%" mr={20}>
          <option value="option1">Pshyciatricts</option>
          <option value="option2">Clinical Physiologists</option>
          <option value="option3">Counsellors</option>
        </Select>
      </Container>
      <div className="cent" style={{ marginTop: "5%" }}>
        {!count ? <p>Find an expert for you !!</p> : null}
        <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
          {!count ? (
            <Button
              margin={5}
              color="white"
              padding="2"
              _hover={{
                cursor: "pointer",
                background: "white",
                color: "teal.500",
              }}
              onClick={() => {
                accessChat();
              }}
            >
              Find an expert
            </Button>
          ) : (
            <p>You have an ongoing session with an expert, cant find an expert now</p>
          )}

          {/* <Button
            margin={5}
            onClick={onToggle}
            _hover={{
              cursor: "pointer",
              background: "white",
              color: "teal.500",
            }}
          >
            Experts List
          </Button>
          <Fade in={isOpen}>
            <div>{userlist.length == 0 ? <Spinner size="xl" /> : userlist.map((us) => (us.name !== user.name ? <div key={us._id}>{us.name}</div> : null))}</div>
          </Fade> */}
        </div>
      </div>
    </div>
  );
}

export default Match;
