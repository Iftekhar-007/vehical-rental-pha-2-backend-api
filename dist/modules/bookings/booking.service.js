"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsServices = void 0;
const db_1 = require("../../config/db");
const createBookings = async (payload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const vehicleAvailable = await db_1.pool.query(`SELECT daily_rent_price, availability_status FROM vehicles WHERE id=$1`, [vehicle_id]);
    if (vehicleAvailable.rows.length === 0) {
        return "vehicle not found";
    }
    const vehicle = vehicleAvailable.rows[0];
    if (vehicle.availability_status === "booked") {
        return "this vehicle already booked";
    }
    const dailyPrice = Number(vehicle.daily_rent_price);
    const start = new Date(payload.rent_start_date);
    const end = new Date(payload.rent_end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const total_price = Number(days * dailyPrice);
    const result = await db_1.pool.query(`INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        "active",
    ]);
    await db_1.pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id]);
    return result.rows[0];
};
const getAllBookings = async () => {
    const result = await db_1.pool.query(`SELECT * FROM bookings`);
    return result;
};
const getCustomerBooking = async (customerId) => {
    const result = await db_1.pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [customerId]);
    return result;
};
const cancelBooking = async (id, customer_id) => {
    const booking = await db_1.pool.query(`SELECT * FROM bookings WHERE id=$1 AND customer_id=$2`, [id, customer_id]);
    if (booking.rows.length === 0) {
        return "Booking not found or unauthorized";
    }
    const start = new Date(booking.rows[0].rent_start_date);
    const today = new Date();
    if (today >= start) {
        return "Booking can't be cancelled after start date";
    }
    await db_1.pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [id]);
    await db_1.pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [booking.rows[0].vehicle_id]);
    return booking.rows[0];
};
const makeReturned = async (id) => {
    const booking = await db_1.pool.query(`SELECT * FROM bookings WHERE id=$1`, [id]);
    if (booking.rows.length === 0) {
        return "Booking not found";
    }
    await db_1.pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [id]);
    await db_1.pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [booking.rows[0].vehicle_id]);
    return booking.rows[0];
};
const autoReturned = async () => {
    const toDay = new Date();
    const result = await db_1.pool.query(`SELECT * FROM bookings WHERE rent_end_date<$1 AND status='active'`, [toDay]);
    for (let booking of result.rows) {
        await db_1.pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [
            booking.id,
        ]);
        await db_1.pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [booking.vehicle_id]);
    }
    return result.rows.length;
};
exports.bookingsServices = {
    createBookings,
    getAllBookings,
    getCustomerBooking,
    cancelBooking,
    makeReturned,
    autoReturned,
};
