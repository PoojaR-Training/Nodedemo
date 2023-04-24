const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Topic = mongoose.model("topic", schema);

module.exports = Topic;
