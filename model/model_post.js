const mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", schema);

module.exports = Post;
