import { Router, Response } from "express";
import usersRouter from "./users";
import validateToken from "../middlewares/auth";

const router = Router();

router.use("/users", validateToken, usersRouter);

router.get("/", async (req, res): Promise<Response> => {
    return res.status(200).json({
        code: 200,
        message: "Api working"
    });
});

export default router;