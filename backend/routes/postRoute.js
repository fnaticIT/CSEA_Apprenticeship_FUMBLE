const router = require("express").Router();
const Post = require("../models/postModel");
const User = require("../models/userModel");
//create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//

//
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post.userId);
    //console.log(req.body.userId);
    //if (post.userId === req.body.userId) {
    await post.deleteOne();
    res.status(200).json("the post has been deleted");
    //} else {
    // res.status(403).json("you can delete only your post");
    //}
  } catch (err) {
    res.status(500).json(err);
  }
});

//

//
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/comments/:id/:cmt", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    // const newComment = req.body.desc;
    const newComment = req.params.cmt;
    console.log(newComment);
    await post.updateOne({ $push: { comments: newComment } });
    res.status(200).json("comment posted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = [];
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/all", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/queue/all", async (req, res) => {
  try {
    const posts = await Queue.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/a", async (req, res) => {
  try {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);
    const posts = await Post.find({ createdAt: { $gte: start, $lt: end }, createdtype: "club" });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/e", async (req, res) => {
  try {
    console.log("hello");
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);
    const posts = await Post.find({ createdAt: { $gte: start, $lt: end }, isEvent: true });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/comments/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newComment = req.body;
    await post.updateOne({ $push: { comments: newComment } });
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
