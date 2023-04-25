const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
    user:{
      type: mongoose.Schema.ObjectId,
      ref: "user",
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", Schema);
module.exports = Comment;
