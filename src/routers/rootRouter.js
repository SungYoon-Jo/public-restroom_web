import express from "express";

import { getHome, getData, postData } from "../controllers/infoController";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);

rootRouter.route("/data").get(getData).post(postData);

export default rootRouter;
