const Like = require("../model/model_post_like");
const DisLike = require("../model/model_post_dislike");
const Post = require("../model/model_post");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const likeDislike = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(",")[0];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const id = req.params.id;
    const action = req.query.action;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const existinglike = await Like.findOne({
      post: post._id,
      user: userId,
    });

    const existingdislike = await DisLike.findOne({
      post: post._id,
      user: userId,
    });
  
    if (action === "like") {
      if (existinglike) {
        return res.status(404).json({ error: "Already like this post " });
      }
      await DisLike.findOneAndDelete({
        post: post._id,
        user: userId,
      });
     
      await Like.create({
        post: post._id,
        user: userId,
      });
      res.status(200).json({
        status: true,
        message: "Successfully like",
      });
    } else if (action === "dislike") {
      if (existingdislike) {
        return res.status(404).json({ error: "Already dislike this post " });
      }
      await Like.findOneAndDelete({
        post: post._id,
        user: userId,
      });
      await DisLike.create({
        post: post._id,
        user: userId,
      });
      res.status(200).json({
        status: true,
        message: "Successfully disliked",
      });
    } else {
      return res.status(404).json({ error: "Invalid action" });
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Failed to perform like or dislike action ",
    });
  }
};
const mostLikePost = async (req, res) => {
  try {
    const posts = await Post.find();
    let mostLikedPost = null;
    let mostLikes = 0;
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const likes = await Like.find({ post: post._id }).countDocuments();
      if (likes > mostLikes) {
        mostLikes = likes;
        mostLikedPost = post;
      }
    }
    if (!mostLikedPost) {
      return res.status(404).json({ error: "No posts found" });
    }
    res.status(200).json({
      status: true,
      message: "Most liked post found",
      post: mostLikedPost,
      likes: mostLikes,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Failed to find most liked post",
    });
  }
};

module.exports = {
  likeDislike,
  mostLikePost,
};
