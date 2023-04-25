const Comment = require("../model/model_post_comment");
const Post = require("../model/model_post");
const User = require("../model/model_user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

async function postComment(req, res,) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(",")[0];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const id = req.params.id;
    const username = await User.findById(userId).select("username");
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const addComment = new Comment({
      comment: req.body.comment,
      post: post._id,
      user: username,
    });
    const createComment = await addComment.save();
    if (createComment) {
      res.status(200).json({
        status: "success",
        msg: "comment successfully added",
        comment: createComment,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "something went wrong while creating comment",
    });
  }
}

module.exports = {
  postComment,
};
