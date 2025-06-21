import { Router } from "express";
const rootRouter = Router();
rootRouter.get("/", (_, res) => {
    res.send("Welcome to node + ts");
});
export default rootRouter;
