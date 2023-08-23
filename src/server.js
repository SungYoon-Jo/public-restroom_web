import express from "express";
import morgan from "morgan";

import rootRouter from "./routers/rootRouter";

const app = express();
const logger = morgan("dev");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("src/public/css"));
app.use(express.static("src/public/js"));
app.use(express.static("src/public/images"));

app.use("/", rootRouter);

app.use("/data", rootRouter);

app.get("*", (req, res) => {
  res.redirect("/");
});

export default app;
