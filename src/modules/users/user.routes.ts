import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/", userControllers.getAllUser);

// router.get("/:id", userControllers.getSingleUser);

const userRoutes = router;

export default userRoutes;
