import express from "express";
import { bookingsController } from "./booking.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", bookingsController.createBookings);

router.get("/", auth("admin", "customer"), bookingsController.getBookings);

const bookingsRoutes = router;

export default bookingsRoutes;
