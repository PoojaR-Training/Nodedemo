const Topic = require("../model/model_topic");

//Topic create
async function topicCreate(req, res) {
  try {
    const existingTopic = await Topic.findOne({ title: req.body.title });
    if (existingTopic) {
      return res.status(409).json({ message: "Topic already exists" });
    }
    const topic = await Topic.create(req.body);
    res.status(200).json(topic);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
//Topic Get
async function topicAllGet(req, res) {
  try {
    const topic = await Topic.find({});
    res.status(200).json(topic);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  topicCreate,
  topicAllGet,
};
