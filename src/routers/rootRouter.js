import express from "express";

import { Home, Test } from "../controllers/infoController";

const rootRouter = express.Router();

rootRouter.route("/").get(Home);

rootRouter.route("/test").get(Test);

export default rootRouter;
