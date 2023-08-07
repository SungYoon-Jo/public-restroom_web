import express from "express";

import { Home } from "../controllers/infoController";

const rootRouter = express.Router();

rootRouter.route("/").get(Home);

export default rootRouter;
