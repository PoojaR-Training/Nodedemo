const postController = require('../controller/post-controller');
const express = require('express');
const router = express.Router();



router.post("/createpost", postController.postCreate);
router.get("/getpost",postController.postAllGet);
router.put("/postupdate/:id",postController.postUpdate);
router.delete("/postdelete/:id",postController.postDelete);
router.get("/postmostrecent",postController.getMostRecentPost);
router.get(
  "/getpostbytopic/:title",
  authToken.checkToken,
  postController.postByTopicGet
);
module.exports = router;