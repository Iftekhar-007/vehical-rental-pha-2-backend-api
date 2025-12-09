import { pool } from "../../config/db";

const createBookings = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleAvailable = await pool.query(
    `SELECT daily_rent_price, availability_status FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleAvailable.rows.length === 0) {
    return "vehicle not found";
  }

  const vehicle = vehicleAvailable.rows[0];

  if (vehicle.availability_status === "booked") {
    return "this vehicle already booked";
  }

  const dailyPrice = Number(vehicle.daily_rent_price);

  const start = new Date(payload.rent_start_date as Date);
  const end = new Date(payload.rent_end_date as Date);

  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const total_price = Number(days * dailyPrice);

  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return result.rows[0];
};

const getAllBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);

  return result;
};

const getCustomerBooking = async (customerId: string) => {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1`,
    [customerId]
  );

  for (let booking of result.rows) {
    booking.total_price = Number(booking.total_price);
  }
  return result;
};

const cancelBooking = async (id: string, customer_id: string) => {
  const booking = await pool.query(
    `SELECT * FROM bookings WHERE id=$1 AND customer_id=$2`,
    [id, customer_id]
  );

  if (booking.rows.length === 0) {
    return "Booking not found or unauthorized";
  }

  const start = new Date(booking.rows[0].rent_start_date);
  const today = new Date();

  if (today >= start) {
    return "Booking can't be cancelled after start date";
  }

  await pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [id]);

  await pool.query(
    `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
    [booking.rows[0].vehicle_id]
  );

  return booking.rows[0];
};

const makeReturned = async (id: string) => {
  const booking = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [id]);

  if (booking.rows.length === 0) {
    return "Booking not found";
  }

  await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [id]);

  await pool.query(
    `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
    [booking.rows[0].vehicle_id]
  );

  return booking.rows[0];
};

const autoReturned = async () => {
  const toDay = new Date();

  const result = await pool.query(
    `SELECT * FROM bookings WHERE rent_end_date<$1 AND status='active'`,
    [toDay]
  );

  for (let booking of result.rows) {
    await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [
      booking.id,
    ]);

    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
  }

  return result.rows.length;
};

export const bookingsServices = {
  createBookings,
  getAllBookings,
  getCustomerBooking,
  cancelBooking,
  makeReturned,
  autoReturned,
};
