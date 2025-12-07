import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post("/signup", authControllers.createUser);

router.post("/login", authControllers.userLogIn);

const authRoutes = router;

export default authRoutes;
