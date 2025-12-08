import express from "express";
import { bookingsController } from "./booking.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", bookingsController.createBookings);

router.get("/", auth("admin", "customer"), bookingsController.getBookings);

router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingsController.updateBooking
);

const bookingsRoutes = router;

export default bookingsRoutes;
