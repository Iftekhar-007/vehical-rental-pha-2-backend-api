import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/", userControllers.createUser);

router.get("/", userControllers.getAllUser);

const userRoutes = router;

export default userRoutes;
