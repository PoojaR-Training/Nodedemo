const Like = require("../model/model_post_like");
const DisLike = require("../model/model_post_dislike");
const Post = require("../model/model_post");
const User = require("../model/model_user");
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
    const username = await User.findById(userId).select("username");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const existinglike = await Like.findOne({
      post: post._id,
      user: username,
    });

    const existingdislike = await DisLike.findOne({
      post: post._id,
      user: username,
    });

    if (action === "like") {
      if (existinglike) {
        return res.status(400).json({ error: "Already like this post " });
      }
      await DisLike.findOneAndDelete({
        post: post._id,
        user: username,
      });

      const addLike = new Like({
        post: post._id,
        user: username,
      });
      const createLike = await addLike.save();

      if (createLike) {
        res.status(200).json({
          status: true,
          message: "Successfully like",
          like: createLike,
        });
      }
    } else if (action === "dislike") {
      if (existingdislike) {
        return res.status(400).json({ error: "Already dislike this post " });
      }
      await Like.findOneAndDelete({
        post: post._id,
        user: username,
      });
      const addDislike = new DisLike({
        post: post._id,
        user: username,
      });
      const createDislike = await addDislike.save();
      if (createDislike) {
        res.status(200).json({
          status: true,
          message: "Successfully disliked",
          dislike: createDislike,
        });
      }
    } else {
      return res.status(404).json({ error: "Invalid action" });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to perform like or dislike action ",
    });
  }
};
const mostLikePost = async (req, res) => {
  try {
    const mostLikedPosts = await Like.aggregate([
      { $group: { _id: "$post", likes: { $sum: 1 } } },
      { $sort: { likes: -1 } },
      {
        $group: {
          _id: "$likes",
          posts: {
            $push: "$_id",
          },
        },
      },
    ]);

    if (mostLikedPosts.length === 0) {
      return res.status(400).json({ error: "No posts has been liked yet" });
    }
    
    const mostLikedPostsIds = mostLikedPosts[0].posts;

    const posts = await Post.find({
      _id: { $in: mostLikedPostsIds },
    });

    res.status(200).json({
      status: true,
      posts: posts,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to find most liked post",
    });
  }
};

module.exports = {
  likeDislike,
  mostLikePost,
};
