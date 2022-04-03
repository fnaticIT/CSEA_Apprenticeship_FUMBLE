import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";

import { useHistory } from "react-router";

import { FaArrowUp } from "react-icons/fa";
import { ChatState } from "../../Context/ChatProvider";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [allposts, allsetPosts] = useState([]);
  const [all, allset] = useState(false);
  const [dis, setdis] = useState("Show Only friends Posts");
  const { user } = ChatState();
  const history = useHistory();
 

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/posts/all");
      allsetPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  const h1 = (e) => {
    history.push("/social");
  };
  const h2 = (e) => {
    history.push("/home2");
  };
 
  return (
    <div className="feed">
      <div className="feedWrapper">
        {!all
          ? allposts
              .sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1))
              .map((p) =>
                !p.isEvent ? (
                  <div>
                    <Post key={p._id} post={p} />
                  </div>
                ) : (
                  <div></div>
                )
              )
          : posts
              .sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1))
              .map((p) =>
                !p.isEvent ? (
                  <div>
                    <Post key={p._id} post={p} />
                  </div>
                ) : (
                  <div></div>
                )
              )}
      </div>
      <div class="gototop" className="up_arrow_box" id="scrollUp">
        <a href="#" id="gotoTop" title="Go to top">
          <FaArrowUp className="up_arrow_icon" size={36} style={{ color: "white" }} />
        </a>
      </div>
    </div>
  );
}
