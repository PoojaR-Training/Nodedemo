const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "post",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", Schema);
module.exports = Like;
