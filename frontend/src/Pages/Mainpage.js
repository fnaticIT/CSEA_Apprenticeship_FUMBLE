import React from "react";
import { Tab, TabList, TabPanel, Tabs, TabPanels, Text, Box, MenuList, MenuItem, Menu } from "@chakra-ui/react";

import { ChatState } from "../Context/ChatProvider";
import Navbars from "../components/Navbar/Navbar";
import { useHistory } from "react-router";
import Share from "../components/share/Share.jsx";
import Feed from "../components/feed/Feed.jsx";
import Feed2 from "../components/feed/Feed2.jsx";
import { getSender } from "../config/ChatLogics";
import "./Mainpage.css";
import ChatLoading from "../components/ChatLoading/ChatLoading";
import { useGetNewsQuery } from "./newApi";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Mainpage() {
  const { user, chats, setChats } = ChatState();
  const history = useHistory();
  const { data } = useGetNewsQuery();
  useEffect(() => {
    fetchChats();
    console.log(data);
  }, []);
  function handle1() {
    history.push("/chats");
  }
  function handle2() {
    history.push("/match");
  }
  function handle3() {
    history.push("/forums");
  }
  function handle4() {
    history.push("/face");
  }
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
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="topx">{user && <Navbars />}</div>

      {/* {user && <Topbar user={user} />} */}
      {/* {user && <SideDrawer />} */}
      <div style={{ marginTop: "50px" }}>
        <div style={{ color: "white", display: "flex", margin: 10, height: "90vh" }}>
          <Box style={{ flex: "1", margin: 5, padding: 20 }}>
            <hr style={{ marginTop: "20px" }}></hr>
            <Box shadow="dark-lg" p="2" mt="4" borderRadius="15">
              <ul style={{ margin: "20px", color: "white", fontSize: "25px", marginTop: "60px" }}>
                <li onClick={handle2} className="side_list" style={{ margin: "20px" }}>
                  Find an expert
                </li>
                <li onClick={handle3} className="side_list" style={{ margin: "20px" }}>
                  Forums
                </li>
                <li onClick={handle4} className="side_list" style={{ margin: "20px" }}>
                  Mood Detector
                </li>
                <li onClick={handle1} className="side_list" style={{ margin: "20px" }}>
                  Session History
                </li>
                <li onClick={handle1} className="side_list" style={{ margin: "20px" }}>
                  Review Sessions
                </li>
              </ul>
            </Box>
          </Box>
          <Box style={{ flex: "3", margin: 5, padding: "20px" }}>
            {/* <div style={{ width: "90%", height: "25%", border: "solid", background: "white", borderWidth: "3px", borderColor: "purple", margin: "0 auto" }}></div> */}
            <hr style={{ marginTop: "20px" }}></hr>
            <Tabs isFitted variant="enclosed" colorScheme="green" mt={5}>
              <TabList mb="1em">
                <hr style={{ marginTop: "10px" }}></hr>
                <Tab>
                  <Text fontSize={23}>Create</Text>
                </Tab>
                <Tab>
                  <Text fontSize={23}>Explore</Text>
                </Tab>
                <Tab>
                  <Text fontSize={23}>Top</Text>
                </Tab>
                <Tab>
                  <Text fontSize={23}>Trending</Text>
                </Tab>
              </TabList>
              {/* <hr style={{ marginTop: "20px" }}></hr> */}
              <TabPanels>
                <TabPanel>
                  <Box h={10} p={10}>
                    <Share />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Feed />
                </TabPanel>
                <TabPanel>
                  <Feed2 />
                </TabPanel>
                <TabPanel>
                  <ul>
                    {data?.map((d) => (
                      <>
                        <a href={d.url}>
                          <li>{d.title}</li>
                        </a>
                      </>
                    ))}
                  </ul>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Box style={{ flex: "1", margin: 5, padding: 20 }} className="side3">
            <hr style={{ marginTop: "20px" }}></hr>
            <Text m={2} fontSize="3xl" marginTop={10}>
              Announcements
            </Text>
            {/* <Menu>
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu> */}
            <ul style={{ margin: "20px" }}>
              <li></li>
              <li></li>
            </ul>
            <hr style={{ marginTop: "20px" }}></hr>
            <Text m={2} fontSize="3xl" marginTop={10}>
              My Forums
            </Text>
            {chats ? <ul style={{ margin: "20px" }}>{chats.map((chat) => chat.isGroupChat && chat.users.includes(user._id) && <li>{chat.chatName}</li>)}</ul> : <ChatLoading />}{" "}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
