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

  const total_price = days * dailyPrice;

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

export const bookingsServices = {
  createBookings,
};
