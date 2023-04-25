const Post = require("../model/model_post");
const Topic = require("../model/model_topic");

//Post Create
async function postCreate(req, res) {
  try {
    const topic = await Topic.findOne({ title: req.body.title });
    if (topic) {
      console.log(topic.title);
      const post = await Post.create(req.body);

      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Topic doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong ",
    });
  }
}

//Post update
async function postUpdate(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);

    if (!post) {
      return res
        .status(404)
        .json({ message: `cannot find any post with ID ${id}` });
    }
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong ",
    });
  }
}
//post delete
async function postDelete(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: `cannot find any post with ID ${id}` });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong ",
    });
  }
}

//Post get
async function postAllGet(req, res) {
  try {
    const post = await Post.find({});
    if (!post) {
      return res.status(404).json({ message: `cannot find any post` });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong ",
    });
  }
}

//Get Post by topic
async function postByTopicGet(req, res) {
  try {
    const { title } = req.params;
    const post = await Post.find({ title: title });
    if (!post) {
      return res
        .status(400)
        .json({ message: `cannot find any post with given topic` });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong ",
    });
  }
}
async function getMostRecentPost(req, res, next) {
  try {
    const recentPost = await Post.find({}).sort({ createdAt: -1 }).limit(1);
    res.status(200).json({
      status: "success",
      recentPost,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong ",
    });
  }
}

module.exports = {
  postCreate,
  postUpdate,
  postDelete,
  postAllGet,
  postByTopicGet,
  getMostRecentPost,
};
