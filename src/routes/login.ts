import Router from "express";
import { loginUser } from "../controllers/users";

const router = Router();

router.get("/", loginUser);

export default router;