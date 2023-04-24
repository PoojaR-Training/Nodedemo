const topicController = require("../controller/topic-controller");
const express = require("express");
const router = express.Router();

router.post("/createtopic", topicController.topicCreate);
router.get("/gettopic", topicController.topicAllGet);

module.exports = router;
