const http = require("http");
const express = require("express");
const userController = require("./controller/user-controller");
const postController = require("./controller/post-controller");
const topicController = require("./controller/topic-controller");
const commentController = require("./controller/comment-controller");
const authToken = require("./middleware/auth");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const port = process.env.PORT || 8000;

const connectDB = require("./database/connection");
connectDB();
app.use(express.json());

app.post("/userregister", userController.userRegister);
app.post("/userlogin", userController.userLogin);

app.post("/topic", authToken.checkToken, topicController.topicCreate);
app.get("/gettopic", authToken.checkToken, topicController.topicAllGet);

app.post("/post", authToken.checkToken, postController.postCreate);
app.get("/getpost", authToken.checkToken, postController.postAllGet);
app.put("/postupdate/:id", authToken.checkToken, postController.postUpdate);
app.delete("/postdelete/:id", authToken.checkToken, postController.postDelete);
app.get("/postmostrecent", authToken.checkToken, postController.getMostRecentPost);
app.get(
  "/getpostbytopic/:title",
  authToken.checkToken,
  postController.postByTopicGet
);

app.post("/comment/:id", authToken.checkToken, commentController.postComment);

const server = http.createServer(app);
server.listen(port);
console.log("My node.js web server is live");
