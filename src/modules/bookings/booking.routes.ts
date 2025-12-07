import express from "express";
import { bookingsController } from "./booking.controller";

const router = express.Router();

router.post("/", bookingsController.createBookings);

const bookingsRoutes = router;

export default bookingsRoutes;
