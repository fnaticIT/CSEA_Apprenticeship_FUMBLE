import "./share.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { ChatState } from "./../../Context/ChatProvider";

function Share() {
  const { user } = ChatState();
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      createdby: user.name,
      createdtype: user.type,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          {/*<img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />*/}
          <Avatar style={{ height: "35px", width: "35px" ,marginRight:"25px",marginLeft:"20px"}} src={""} className="postProfileImg"></Avatar>
          <textarea placeholder={true ? "Post Your Queries " + user.name + "?" : "Post about events and announcements"} className="shareInput" ref={desc} style={{ color: "darkslateblue",marginTop:"20px"}} row="15"/>
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>
          <div>
            <button className="b" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Share;
