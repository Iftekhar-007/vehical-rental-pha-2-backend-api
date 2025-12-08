import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("admin"), userControllers.getAllUser);

router.put("/:userId", auth("admin", "customer"), userControllers.updateUser);

router.delete("/:userId", auth("admin"), userControllers.deleteUser);

const userRoutes = router;

export default userRoutes;
