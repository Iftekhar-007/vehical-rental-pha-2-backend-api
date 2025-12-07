import { pool } from "../../config/db";

const createBookings = async (payload: Record<string, unknown>) => {
  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date) VALUES($1,$2,$3,$4)`,
    [
      payload.customer_id,
      payload.vehicle_id,
      payload.rent_start_date,
      payload.rent_end_date,
    ]
  );

  return result;
};

export const bookingsServices = {
  createBookings,
};
