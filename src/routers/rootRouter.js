import express from "express";

import {
  getHome,
  getData,
  postData,
  getMobile,
} from "../controllers/infoController";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);

rootRouter.route("/moblie").get(getMobile);

rootRouter.route("/data").get(getData).post(postData);

export default rootRouter;
