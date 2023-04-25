const postController = require("../controller/post-controller");
const commentController = require("../controller/comment-controller");
const likeController = require("../controller/reaction-controller");
const express = require("express");
const router = express.Router();

router.post("/createpost", postController.postCreate);
router.get("/getpost", postController.postAllGet);
router.put("/postupdate/:id", postController.postUpdate);
router.delete("/postdelete/:id", postController.postDelete);
router.get("/postmostrecent", postController.getMostRecentPost);
router.get("/getpostbytopic/:title", postController.postByTopicGet);

router.post("/comment/:id", commentController.postComment);
router.post("/likedislike/:id", likeController.likeDislike);
router.get("/mostlikepost", likeController.mostLikePost);
module.exports = router;
