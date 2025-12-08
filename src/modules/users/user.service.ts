import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};

const updateUser = async (
  name: string,
  email: string,
  phone: string,
  role: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, id]
  );

  return result;
};

const deleteUser = async (userId: string) => {
  const active = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1 AND status='active'`,
    [userId]
  );

  if (active.rows.length > 0) {
    return "user can't be deleted. Active bookings exists";
  }

  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    userId,
  ]);

  return result;
};

export const userServices = {
  getAllUser,
  updateUser,
  deleteUser,
};
