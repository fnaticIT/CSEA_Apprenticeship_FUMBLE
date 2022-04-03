import React, { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
const Stats = () => {
  const { user, chats, setChats } = ChatState();
  useEffect(() => {
    fetchChats();
    setTimeout(() => {
      console.log(chats);
    }, 10000);
  }, []);

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
  return <div>Stats {chats.length}</div>;
};

export default Stats;
