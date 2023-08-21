import express from "express";
import morgan from "morgan";
import io from "socket.io";

import rootRouter from "./routers/rootRouter";

const app = express();
const logger = morgan("dev");
// const path = require("path");

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("src/public/css"));
app.use(express.static("src/public/js"));
app.use(express.static("src/public/images"));

// app.use("/", rootRouter);

app.use("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "home.html")); // index.html 파일 응답
  // console.log(req.query);
  res.render("home", { pageTitle: "Home | Page" });
});

app.use("/test", rootRouter);

export default app;
