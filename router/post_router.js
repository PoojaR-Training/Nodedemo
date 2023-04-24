const postController = require("../controller/post-controller");
const commentController = require("../controller/comment-controller");
const likesController = require("../controller/like-controller");
const dislikesController = require("../controller/dislike-controller");
const express = require("express");
const router = express.Router();

router.post("/createpost", postController.postCreate);
router.get("/getpost", postController.postAllGet);
router.put("/postupdate/:id", postController.postUpdate);
router.delete("/postdelete/:id", postController.postDelete);
router.get("/postmostrecent", postController.getMostRecentPost);
router.get("/getpostbytopic/:title", postController.postByTopicGet);

router.post("/comment/:id", commentController.postComment);
router.post("/likes/:id", likesController.postLike);
router.post("/dislikes/:id", dislikesController.postDisike);
router.get("/mostlikePost", likesController.getMostLikePost);
module.exports = router;
