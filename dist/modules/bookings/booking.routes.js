"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", booking_controller_1.bookingsController.createBookings);
router.get("/", (0, auth_1.default)("admin", "customer"), booking_controller_1.bookingsController.getBookings);
router.put("/:bookingId", (0, auth_1.default)("admin", "customer"), booking_controller_1.bookingsController.updateBooking);
const bookingsRoutes = router;
exports.default = bookingsRoutes;
