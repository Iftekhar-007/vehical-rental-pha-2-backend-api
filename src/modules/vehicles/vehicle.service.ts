import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      payload.vehicle_name,
      payload.type,
      payload.registration_number,
      payload.daily_rent_price,
      payload.availability_status,
    ]
  );
  const vehicle = result.rows[0];
  return {
    id: vehicle.id,
    vehicle_name: vehicle.vehicle_name,
    type: vehicle.type,
    registration_number: vehicle.registration_number,
    daily_rent_price: Number(vehicle.daily_rent_price),
    availability_status: vehicle.availability_status,
  };
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  return result;
};

const getSingleVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);

  return result;
};

const updateVehicle = async (id: string, payload: Record<string, unknown>) => {
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3,daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *`,
    [
      payload.vehicle_name,
      payload.type,
      payload.registration_number,
      payload.daily_rent_price,
      payload.availability_status,
      id,
    ]
  );

  return result;
};

const deleteVehicle = async (vehicleId: string) => {
  const active = await pool.query(
    `SELECT * FROM bookings WHERE id=$1 AND status='active'`,
    [vehicleId]
  );

  if (active.rows.length > 0) {
    return "Vehicle can't be deleted. Active booking exists";
  }

  const result = await pool.query(
    `DELETE FROM vehicles WHERE id=$1 RETURNING *`,
    [vehicleId]
  );

  return result;
};

export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
