const Dislike = require("../model/model_post_dislike");
const Post = require("../model/model_post");
const Like = require("../model/model_post_like");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

async function postDisike(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(",")[0];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const id = req.params.id;
    const post = await Post.findById(id);
    const like = await Like.findOne({ post: post._id, user: userId });

    if (like) {
      await Like.findOneAndDelete(like)
      await Post.findByIdAndUpdate(post._id, { $inc: { likes: -1 } });
    }

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newDislike = new Dislike({
      post: post._id,
      user: userId,
    });
    await newDislike.save();

    await Post.findByIdAndUpdate(post._id, { $inc: { dislikes: 1 } });

    res.status(201).json({
      status: "success",
      msg: "DisLike successfully added",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  postDisike,
};
