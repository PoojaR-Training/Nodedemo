const http = require("http");
const express = require("express");
const userRouter = require("./router/user_router")
const topicRouter = require("./router/topic_router")
const postRouter = require("./router/post_router")
const authToken = require("./middleware/auth");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const port = process.env.PORT || 8000;

const connectDB = require("./database/connection");
connectDB();
app.use(express.json());

app.post("/users", userRouter);

app.post("/topic", authToken.checkToken, topicRouter);

app.post("/post", authToken.checkToken, postRouter);

const server = http.createServer(app);
server.listen(port);
console.log("My node.js web server is live");
