"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsController = void 0;
const booking_service_1 = require("./booking.service");
const createBookings = async (req, res) => {
    try {
        const result = await booking_service_1.bookingsServices.createBookings(req.body);
        res.status(201).json({
            success: true,
            message: "booking created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
const getBookings = async (req, res) => {
    try {
        const user = req.user;
        let result;
        if (user.role === "admin") {
            result = await booking_service_1.bookingsServices.getAllBookings();
        }
        if (user.role === "customer") {
            result = await booking_service_1.bookingsServices.getCustomerBooking(user.id);
        }
        res.status(201).json({
            success: true,
            message: "Booking here",
            data: result?.rows,
        });
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
const updateBooking = async (req, res) => {
    try {
        let result;
        if (req.user?.role === "customer") {
            result = await booking_service_1.bookingsServices.cancelBooking(req.params.bookingId, req.user?.id);
        }
        else if (req.user?.role === "admin") {
            result = await booking_service_1.bookingsServices.makeReturned(req.params.bookingId);
        }
        res.status(201).json({
            success: true,
            message: "Booking here",
            data: result,
        });
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
exports.bookingsController = {
    createBookings,
    getBookings,
    updateBooking,
};
