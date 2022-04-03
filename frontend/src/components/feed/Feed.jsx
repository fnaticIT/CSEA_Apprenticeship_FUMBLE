import {useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
//import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
//mport up_icon from "../../images/up-arrow-icon.png";
import { FaArrowUp } from "react-icons/fa";
import { ChatState } from './../../Context/ChatProvider';
export default function Feed({ username }) 
{
  const [posts, setPosts] = useState([]);
  const [allposts, allsetPosts] = useState([]);
  const [all, allset] = useState(true);
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
  const handle = (e) => {
    //  console.log(all);
    allset(!all);
    if (dis === "Show Only friends Posts") setdis("Show all Posts");
    else setdis("Show Only friends Posts");
    //console.log(all);
  };
  return (
    <div className="feed">
      <div className="feedWrapper">
       
        <div className="">
          {/* <h1 className="" >
            <button className="head q1" onClick={h1}>
              Recent Queries
            </button>{" "}
            |{" "}
            <button className="head q2" onClick={h2} >
              Most Liked
            </button>
          </h1> */}
       
        </div>

        {all
          ? allposts
              //.sort((a,b)=>a.likes.length<b.likes.length?1:-1)
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
              //.sort((a,b)=>a.likes.length<b.likes.length?1:-1)
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
