const Comment = require("../model/model_post_comment");
const Post = require("../model/model_post");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const ObjectId = require("mongoose").Types.ObjectId;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    const objectId = new ObjectId(id);
    return objectId.equals(id);
  }
  return false;
}
async function postComment(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(",")[0];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const id = req.params.id;
    let post;
    if (isValidObjectId(id)) {
      post = await Post.findById(id);
    } else {
      return next(console.error());
    }

    if (!post) return next(console.error());
    const addComment = new Comment({
      comment: req.body.comment,
      post: post._id,
      user: userId,
    });
    const createComment = await addComment.save();
    if (createComment) {
      res.status(201).json({
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
