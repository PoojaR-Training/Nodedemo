const Like = require("../model/model_post_like");
const Post = require("../model/model_post");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

async function postLike(req, res) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(",")[0];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newLike = new Like({
      post: post._id,
      user: userId,
    });

    await newLike.save();

    await Post.findByIdAndUpdate(post._id, { $inc: { likes: 1 } });

    res.status(201).json({
      status: "success",
      msg: "Like successfully added",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  postLike,
};
