import express from "express";

import { Home, Test } from "../controllers/infoController";

const rootRouter = express.Router();
const path = require("path");

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./index.html")); // index.html 파일 응답
// });

rootRouter.route("/").get(Home);

rootRouter.route("/test").get(Test);

export default rootRouter;
